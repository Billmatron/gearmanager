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

# used on inventory add form
@api_view(['GET'])
def getUnit(request, pk):
    unit = Unit.objects.get(pk=pk)
    serializer = UnitSerializer(unit, many=False)
   
    return Response(serializer.data)

#api call on inventory list page to get entire inventory for user
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getInventory(request):
    user = request.user
    inventory = user.inventory.all()
    serializer = InventorySerializer(inventory, many=True)
    return Response(serializer.data)

#used on Inventory list page to do category filter select
@api_view(['GET'])
def getInventoryFilter(request, type_id):
    inventory = Inventory.objects.filter(unit__types__id=type_id)
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


# Used on inventory add form
@api_view(['GET'])
def getUnitsByMake(request, make_id):
    make = Make.objects.filter(pk=make_id).first()
    units = make.units.all()
    serializer = UnitSerializer(units, many=True)
    return Response(serializer.data)



@api_view(['POST'])
def createNewUnit(request):
    item = request.data
    print(item)
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
@permission_classes([IsAuthenticated])
def addToInventory(request):

    user = request.user
    item = request.data
     
    unit = Unit.objects.get(pk=item['unit_id'])
    make = Make.objects.get(pk=item['make_id'])
    # print(item)
    newInventoryItem = Inventory(unit=unit, make=make, quantity=item['quantity'],
                                 rate=item['rental_price'], serial_number=item['serial_numbers'],
                                 purchase_price=item['purchase_price'], notes=item['notes'],
                                 user=user)
    newInventoryItem.save()
    for attribute in item['attributes']:
        newInventoryItem.attributes.add(attribute)
    
    #unit = Unit.objects.get(pk=367)
    serializer = InventorySerializer(newInventoryItem, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def editInventoryItem(request, pk):
    data = request.data
    item = Inventory.objects.get(id=pk)
    serializer = InventorySerializer(instance=item, data=data)
    
    if serializer.is_valid():
        serializer.save()
    else:
        print('not valid serializer')
        print(serializer.errors)
    return Response({'status':200})