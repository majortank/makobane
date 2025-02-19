# backend/api/urls.py
from django.urls import include, path
from rest_framework import routers
from . import views  # Import the views module

router = routers.DefaultRouter()
router.register(r'words', views.WordViewSet, basename='word')
router.register(r'definitions', views.DefinitionViewSet, basename='definition')

urlpatterns = [
    path('', include(router.urls)),
]