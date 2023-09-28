from rest_framework.serializers import ModelSerializer
from .models import Model, Make



class MakeSerializer(ModelSerializer):
    class Meta:
        model = Make
        fields = '__all__'


class ModelsSerializer(ModelSerializer):
    make = MakeSerializer(read_only=True, many=True)
    class Meta:
        model = Model
        fields = '__all__'