from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    RegionViewSet, DistrictViewSet, CommuneViewSet, 
    SiteCulturelViewSet, EtablissementViewSet
)

# Le Router génère automatiquement les URLs comme /districts/ ou /districts/1/
router = DefaultRouter()
router.register(r'regions', RegionViewSet)
router.register(r'districts', DistrictViewSet)
router.register(r'communes', CommuneViewSet)
router.register(r'sites-culturels', SiteCulturelViewSet)
router.register(r'etablissements', EtablissementViewSet)

urlpatterns = [
    path('', include(router.urls)),
]