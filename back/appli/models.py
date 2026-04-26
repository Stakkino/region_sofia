from django.db import models


#--------------------------
# --- BLOC GÉOGRAPHIQUE ---
#--------------------------

class Region(models.Model):
    nom = models.CharField(max_length=30, default="SOFIA")
    chef_lieu = models.CharField(max_length=30, default="Antsohihy (407)")
    nb_district = models.PositiveIntegerField(default=1)
    # L'IA pourra remplir ceci avec les données météo globales
    meteo_actuelle = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return self.nom
    
class District(models.Model):
    region = models.ForeignKey(Region, on_delete=models.PROTECT, related_name='districts')
    nom = models.CharField(max_length=50)
    code_postal = models.CharField(max_length=5, blank=True, null=True)
    superficie = models.FloatField(help_text="Surface en km²", null=True, blank=True)
    nb_commune = models.PositiveIntegerField(default=1)
    distance_vers_antsohihy = models.FloatField(help_text="Distance en km")
    # Champ météo spécifique mis à jour par l'IA toutes les 6h
    description_climat = models.TextField(blank=True)
    meteo_info = models.JSONField(default=dict, blank=True)

    def __str__(self):
        return self.nom

class Commune(models.Model):
    choix = [
        ('URBAINE', 'Urbaine'),
        ('RURALE', 'Rurale'),
    ]

    district = models.ForeignKey(District, on_delete=models.PROTECT, related_name='communes')
    nom = models.CharField(max_length=50)
    type_commune = models.CharField(max_length=10, choices=choix)
    population = models.PositiveIntegerField(default=0)
    surface = models.FloatField(help_text="Surface en km²", null=True, blank=True)
    latitude = models.FloatField(null=True, blank=True) 
    longitude = models.FloatField(null=True, blank=True) 

    def __str__(self):
        return f"{self.nom} ({self.district.nom})"

class Quartier(models.Model):
    commune = models.ForeignKey(Commune, on_delete=models.CASCADE, related_name='quartiers')
    nom = models.CharField(max_length=100)

    def __str__(self):
        return self.nom


  


#----------------------------------------
# --- BLOC INFRASTRUCTURES (Héritage) ---
#----------------------------------------

class Infrastructure(models.Model):
    commune = models.ForeignKey(Commune, on_delete=models.PROTECT)
    nom = models.CharField(max_length=150)
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)
    historique = models.TextField(blank=True)
    position_geo_url = models.URLField(max_length=500, blank=True, help_text="Lien Google Maps")

    class Meta:
        abstract = True # Ce modèle ne crée pas de table seul

class Ecole(Infrastructure):
    niveau_etudes = models.CharField(max_length=255, help_text="Ex: Jardin d'enfant à Terminale")
    nb_eleves = models.PositiveIntegerField(default=0)
    resultat_examen = models.FloatField(help_text="Taux de réussite en %", default=0)

class Eglise(Infrastructure):
    religion = models.CharField(max_length=100, default="Chrétienne")
    est_legale = models.BooleanField(default=True)

class Usine(Infrastructure):
    produits = models.CharField(max_length=200)
    nb_employes = models.PositiveIntegerField(default=0)
    statut_legal = models.CharField(max_length=100)





#--------------------------------
# --- BLOC COMMERCIAL & LIEUX ---
#--------------------------------

class Etablissement(models.Model):
    cat_choix = [
        ('HOTEL', 'Hôtel'),
        ('RESTO', 'Restaurant'),
        ('LOISIR', 'Centre de loisir'),
        ('BOUTIQUE', 'Boutique'),
    ]

    commune = models.ForeignKey(Commune, on_delete=models.PROTECT)
    nom = models.CharField(max_length=150)
    categorie = models.CharField(max_length=20, choices=cat_choix)
    etoile = models.PositiveIntegerField(default=0)
    contact = models.CharField(max_length=150, blank=True)
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)





#--------------------------
# --- BLOC IA & CULTURE ---
#--------------------------

class SiteCulturel(models.Model):
    commune = models.ForeignKey(Commune, on_delete=models.CASCADE)
    nom = models.CharField(max_length=150) # Ex: Magala
    proprietaire = models.CharField(max_length=150, blank=True) # Ex: ECAR
    # Champs remplis par l'IA
    description_ia = models.TextField(help_text="Description générée par l'IA")
    activites_possibles = models.TextField(help_text="Culte, événements, commerce de fruits...")
    fady_associe = models.TextField(blank=True)
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)
    derniere_verification_ia = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.nom} - {self.commune.nom}"

class ContenuDynamiqueIA(models.Model):
    district = models.ForeignKey(District, on_delete=models.CASCADE, null=True, blank=True)
    commune = models.ForeignKey(Commune, on_delete=models.CASCADE, null=True, blank=True)
    type_contenu = models.CharField(max_length=100) # Fady, Analyse Sociale, Histoire
    texte = models.TextField()
    derniere_maj = models.DateTimeField(auto_now=True)

class StatistiqueHistorique(models.Model):
    district = models.ForeignKey(District, on_delete=models.CASCADE)
    annee = models.IntegerField()
    # Données que l'IA va chercher pour montrer l'évolution de la civilisation
    evolution_population = models.IntegerField()
    nb_infrastructures_total = models.IntegerField()
    commentaire_ia = models.TextField()

class Photo(models.Model):
    district = models.ForeignKey(District, on_delete=models.CASCADE, null=True, blank=True)
    commune = models.ForeignKey(Commune, on_delete=models.CASCADE, null=True, blank=True)
    etablissement = models.ForeignKey(Etablissement, on_delete=models.CASCADE, null=True, blank=True)
    image = models.ImageField(upload_to='sofia_photos/')
    legende = models.CharField(max_length=200)