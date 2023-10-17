from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField
from .models import Unit, Make, Inventory, Types, Subtypes, Attributes, Attributeclass



class MakeSerializer(ModelSerializer):
    class Meta:
        model = Make
        fields = '__all__'

    
class SubtypesSerializer(ModelSerializer):
    class Meta:
        model = Subtypes
        fields = ('name', 'id')

class AttributeForUnitSerializer(ModelSerializer):
    class Meta:
        model = Attributeclass
        fields = ('name', 'id')

class AttributeSerializer(ModelSerializer):
    attribute_class = AttributeForUnitSerializer(read_only=True, many=False)
    class Meta:
        model=Attributes
        fields=('id','name', 'attribute_class')

class AttributeclassSerializer(ModelSerializer):
    attributes = AttributeSerializer(read_only=True, many=True)
    class Meta:
        model=Attributeclass
        fields = ('id', 'name', 'attributes')


class TypesSerializer(ModelSerializer):
    subtypes = SubtypesSerializer(read_only=True, many=True)
    attributeclass = AttributeclassSerializer(read_only=True, many=True)
    class Meta:
        model = Types
        fields = ('name','id', 'subtypes', 'attributeclass')

class UnitSerializer(ModelSerializer):
    attributes = AttributeSerializer(read_only=True, many=True)
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