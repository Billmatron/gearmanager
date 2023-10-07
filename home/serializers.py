from rest_framework.serializers import ModelSerializer
from .models import Profile
from django.contrib.auth.models import User

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name']

class ProfileSerializer(ModelSerializer):
    user = UserSerializer(read_only=True, many=False)
    class Meta:
        model = Profile
        fields = '__all__'