from django.contrib import admin
from .models import (
    Region, District, Commune, Quartier,
    Infrastructure, Ecole, Eglise, Usine,
    Etablissement,
    SiteCulturel, ContenuDynamiqueIA, StatistiqueHistorique, Photo,
)

# Configuration pour afficher les Communes à l'intérieur de la vue District
class CommuneInline(admin.TabularInline):
    model = Commune
    extra = 1




#--------------------------
# --- BLOC GÉOGRAPHIQUE ---
#--------------------------

@admin.register(Region)
class RegionAdmin(admin.ModelAdmin):
    list_display = ('nom', 'chef_lieu', 'nb_district', 'meteo_actuelle')

@admin.register(District)
class DistrictAdmin(admin.ModelAdmin):
    list_display = ('nom', 'region', 'nb_commune', 'distance_vers_antsohihy')
    list_filter = ('region',)
    search_fields = ('nom',)
    inlines = [CommuneInline]

@admin.register(Commune)
class CommuneAdmin(admin.ModelAdmin):
    list_display = ('nom', 'district', 'type_commune', 'population', 'surface')
    list_filter = ('type_commune', 'district')
    search_fields = ('nom',)

admin.site.register(Quartier)





#----------------------------------------
# --- BLOC INFRASTRUCTURES ---
#----------------------------------------

admin.site.register(Ecole)
admin.site.register(Eglise)
admin.site.register(Usine)





#--------------------------------
# --- BLOC COMMERCIAL & LIEUX ---
#--------------------------------

@admin.register(Etablissement)
class EtablissementAdmin(admin.ModelAdmin):
    list_display = ('nom', 'categorie', 'commune', 'etoile', 'contact')
    list_filter = ('categorie', 'etoile')





#--------------------------
# --- BLOC IA & CULTURE ---
#--------------------------

@admin.register(SiteCulturel)
class SiteCulturelAdmin(admin.ModelAdmin):
    list_display = ('nom', 'commune', 'proprietaire', 'derniere_verification_ia')
    search_fields = ('nom', 'description_ia')
    # On met en avant les champs IA pour que tu puisses les vérifier facilement
    fieldsets = (
        ('Informations Fixes', {
            'fields': ('commune', 'nom', 'proprietaire', 'latitude', 'longitude')
        }),
        ('Généré par IA', {
            'fields': ('description_ia', 'activites_possibles', 'fady_associe'),
            'description': 'Vérifiez les informations fournies par l\'IA avant validation.'
        }),
    )

admin.site.register(ContenuDynamiqueIA)
admin.site.register(StatistiqueHistorique)

@admin.register(Photo)
class PhotoAdmin(admin.ModelAdmin):
    list_display = ('legende', 'district', 'commune', 'image')