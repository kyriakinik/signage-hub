from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ScreenViewSet

# Ο Router φτιάχνει αυτόματα τα URLs για το ViewSet (GET, POST, PUT, DELETE)
router = DefaultRouter()
router.register(r'screens', ScreenViewSet)

urlpatterns = [
    path('', include(router.urls)),
]