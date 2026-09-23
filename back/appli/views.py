from rest_framework import viewsets
from rest_framework.response import Response
from .models import Region, District, Commune, SiteCulturel, Etablissement
from .serializers import (
    RegionSerializer, DistrictSerializer, CommuneSerializer, 
    SiteCulturelSerializer, EtablissementSerializer
)


class RegionViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = RegionSerializer

    def get_queryset(self):
        return Region.objects.prefetch_related(
            'districts__communes__quartiers',
            'districts__communes__ecole_set',
            'districts__communes__eglise_set',
            'districts__communes__usine_set',
            'districts__communes__siteculturel_set',
            'districts__communes__etablissement_set',
            'districts__contenudynamiqueia_set',
            'districts__statistiquehistorique_set',
            'districts__photo_set',
        )

class DistrictViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = DistrictSerializer

    def get_queryset(self):
        return District.objects.select_related('region').prefetch_related(
            'communes__quartiers', 'communes__ecole_set', 'communes__eglise_set',
            'communes__usine_set', 'communes__siteculturel_set', 'communes__etablissement_set',
            'contenudynamiqueia_set', 'statistiquehistorique_set', 'photo_set',
        )

class CommuneViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = CommuneSerializer

    def get_queryset(self):
        return Commune.objects.select_related('district').prefetch_related(
            'quartiers', 'ecole_set', 'eglise_set', 'usine_set',
            'siteculturel_set', 'etablissement_set',
        )

class SiteCulturelViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API pour les lieux comme 'Magala' (POI).
    """
    queryset = SiteCulturel.objects.all()
    serializer_class = SiteCulturelSerializer

class EtablissementViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API pour filtrer les Hôtels, Restaurants, etc.
    """
    queryset = Etablissement.objects.all()
    serializer_class = EtablissementSerializer
    filterset_fields = ['categorie', 'etoile'] # Permet de filtrer par type (ex: /?categorie=HOTEL)