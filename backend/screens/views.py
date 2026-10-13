from rest_framework import viewsets
from .models import Screen
from .serializers import ScreenSerializer

class ScreenViewSet(viewsets.ModelViewSet):
    # 1. Από πού παίρνουμε τα δεδομένα; Από όλες τις εγγραφές του Screen
    queryset = Screen.objects.all()
    
    # 2. Ποιον μεταφραστή χρησιμοποιούμε; Τον ScreenSerializer
    serializer_class = ScreenSerializer