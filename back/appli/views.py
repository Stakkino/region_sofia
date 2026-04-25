from rest_framework import viewsets
from rest_framework.response import Response
from .models import Region, District, Commune, SiteCulturel, Etablissement
from .serializers import (
    RegionSerializer, DistrictSerializer, CommuneSerializer, 
    SiteCulturelSerializer, EtablissementSerializer
)

class RegionViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API pour consulter la région SOFIA et tous ses districts imbriqués.
    """
    queryset = Region.objects.all()
    serializer_class = RegionSerializer

class DistrictViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API pour consulter les détails d'un district (météo, communes, IA).
    """
    queryset = District.objects.all()
    serializer_class = DistrictSerializer

class CommuneViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API pour consulter les détails d'une commune (écoles, quartiers, établissements).
    """
    queryset = Commune.objects.all()
    serializer_class = CommuneSerializer

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