from rest_framework import serializers
from .models import (
    Region, District, Commune, Quartier, 
    Ecole, Eglise, Usine, Etablissement, 
    SiteCulturel, ContenuDynamiqueIA, StatistiqueHistorique, Photo
)





#-------------------------------------------
# --- 1. SÉRIALISEURS DE BASE (Feuilles) ---
#-------------------------------------------

class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = ['id', 'image', 'legende']

class QuartierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quartier
        fields = ['id', 'nom']

class StatistiqueHistoriqueSerializer(serializers.ModelSerializer):
    class Meta:
        model = StatistiqueHistorique
        fields = ['annee', 'evolution_population', 'nb_infrastructures_total', 'commentaire_ia']

class EtablissementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Etablissement
        fields = ['id', 'nom', 'categorie', 'etoile', 'contact', 'latitude', 'longitude']





#---------------------------------------------------------------------
# --- 2. SÉRIALISEURS D'INFRASTRUCTURES (Nécessaires pour Commune) ---
#---------------------------------------------------------------------

class EcoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ecole
        fields = '__all__'

class EgliseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Eglise
        fields = '__all__'

class UsineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usine
        fields = '__all__'





#-----------------------------
# --- 3. BLOC IA & CULTURE ---
#-----------------------------

class ContenuIASerializer(serializers.ModelSerializer):
    class Meta:
        model = ContenuDynamiqueIA
        fields = ['type_contenu', 'texte', 'derniere_maj']

class SiteCulturelSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteCulturel
        fields = '__all__'




#---------------------------------------------------------------
# --- 4. BLOC GÉOGRAPHIQUE IMBRIQUÉ (Hiérarchie descendante) ---
#---------------------------------------------------------------

class CommuneSerializer(serializers.ModelSerializer):
    # Imbrication des quartiers, sites, établissements et infrastructures
    quartiers = QuartierSerializer(many=True, read_only=True)
    sites_culturels = SiteCulturelSerializer(many=True, read_only=True, source='siteculturel_set')
    etablissements = EtablissementSerializer(many=True, read_only=True, source='etablissement_set')
    
    ecoles = EcoleSerializer(many=True, read_only=True, source='ecole_set')
    eglises = EgliseSerializer(many=True, read_only=True, source='eglise_set')
    usines = UsineSerializer(many=True, read_only=True, source='usine_set')

    class Meta:
        model = Commune
        fields = [
            'id', 'nom', 'type_commune', 'population', 'surface', 
            'latitude', 'longitude', 'quartiers', 'sites_culturels', 
            'etablissements', 'ecoles', 'eglises', 'usines'
        ]

class DistrictSerializer(serializers.ModelSerializer):
    communes = CommuneSerializer(many=True, read_only=True)
    contenus_ia = ContenuIASerializer(many=True, read_only=True, source='contenudynamiqueia_set')
    statistiques = StatistiqueHistoriqueSerializer(many=True, read_only=True, source='statistiquehistorique_set')
    photos = PhotoSerializer(many=True, read_only=True, source='photo_set')
    
    class Meta:
        model = District
        fields = [
            'id', 'nom', 'superficie', 'nb_commune', 
            'distance_vers_antsohihy', 'description_climat', 
            'meteo_info', 'communes', 'contenus_ia', 'statistiques', 'photos'
        ]

class RegionSerializer(serializers.ModelSerializer):
    districts = DistrictSerializer(many=True, read_only=True)
    class Meta:
        model = Region
        fields = ['id', 'nom', 'chef_lieu', 'nb_district', 'meteo_actuelle', 'districts']