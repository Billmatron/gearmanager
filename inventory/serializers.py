from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField
from .models import Unit, Make, Inventory, Types, Subtypes



class MakeSerializer(ModelSerializer):
    class Meta:
        model = Make
        fields = '__all__'

class TypesSerializer(ModelSerializer):
    class Meta:
        model = Types
        fields = ('name','id')

class SubtypesSerializer(ModelSerializer):
    class Meta:
        model = Subtypes
        fields = ('name',)

class UnitSerializer(ModelSerializer):
    make = MakeSerializer(read_only=True, many=True)
    types = TypesSerializer(read_only=True, many=True)
    subtypes = SubtypesSerializer(read_only=True, many=True)
    class Meta:
        model = Unit
        fields = '__all__'

class InventorySerializer(ModelSerializer):
    unit = UnitSerializer(read_only=True, many=False)
    make = MakeSerializer(read_only=True, many=False)
    class Meta:
        model = Inventory
        fields = '__all__'