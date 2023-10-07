from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Country, City, State, Profile
from django.contrib.auth.models import User
from .serializers import UserSerializer, ProfileSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

# Create your views here.

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['email'] = user.email
        token['company'] = user.profile.company_name
        # ...

        return token
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
def index(request):
    user = Profile.objects.first()
    serializer = ProfileSerializer(user, many=False)
    return Response(serializer.data)

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token',
        'api/token/refresh',
    ]

    return Response(routes)

