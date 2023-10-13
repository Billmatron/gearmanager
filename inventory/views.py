from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import Unit, Inventory, Types, Make
from django.contrib.auth.models import User
from .serializers import UnitSerializer, InventorySerializer, TypesSerializer, MakeSerializer
from pprint import pprint
# Create your views here.
def index(request):
    return render(request, "inventory/index.html")

@api_view(['GET'])
def getRoutes(request):
    print(request.user.profile.zipcode)
    return Response("Gear API")

@api_view(['GET'])
def getUnits(request):
    unit = Unit.objects.all()
    serializer = UnitSerializer(unit, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getUnit(request, pk):
    unit = Unit.objects.get(pk=pk)
    serializer = UnitSerializer(unit, many=False)
   
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getInventory(request):
    user = request.user
    inventory = user.inventory.all()
    serializer = InventorySerializer(inventory, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getInventoryFilter(request, type_name):
    inventory = Inventory.objects.filter(unit__types__name=type_name)
    serializer = InventorySerializer(inventory, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getInventoryItem(request, pk):
    unit = Inventory.objects.get(pk=pk)
    serializer = InventorySerializer(unit, many=False)
    return Response(serializer.data)

@api_view(['GET'])
def getTypes(request):
    types = Types.objects.all()
    serializer = TypesSerializer(types, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getTypesByMake(request, make_name):
    types = Types.objects.filter(makes__name=make_name).all()
    serializer = TypesSerializer(types, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getMakes(request):
    makes= Make.objects.all()
    serializer = MakeSerializer(makes, many=True)
    x = sorted(serializer.data, key=lambda k: (k['name']))
    return Response(x)


@api_view(['GET'])
def getUnitsByMake(request, make):
    make = Make.objects.filter(name=make).first()
    units = make.units.all()
    serializer = UnitSerializer(units, many=True)
    return Response(serializer.data)



@api_view(['POST'])
def createNewUnit(request):
    item = request.data
    newUnit = Unit(name=item['name'], manual_link=item['manual_link'], weight_g=item['weight_g'], value=item['value'])
    newUnit.save()
    newUnit.make.add(item['make'])
    newUnit.types.add(item['type'])
    newUnit.subtypes.add(item['subtype'])
    for att in item['attributes']:
        newUnit.attributes.add(att)

    
    
    serializer = UnitSerializer(newUnit, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def addToInventory(request):
    item = request.data
    user = User.objects.get(username=item['username'])
    
    unit = Unit.objects.get(pk=item['unit_id'])
    make = Make.objects.get(pk=item['make_id'])
    print(item)
    newInventoryItem = Inventory(unit=unit, make=make, quantity=item['quantity'],
                                 rate=item['rental_price'], serial_number=item['serial_numbers'],
                                 purchase_price=item['purchase_price'], notes=item['notes'],
                                 user=user)
    newInventoryItem.save()
    for attribute in item['attributes']:
        newInventoryItem.attributes.add(attribute['id'])
    
    
    serializer = InventorySerializer(newInventoryItem, many=False)
    return Response(serializer.data)