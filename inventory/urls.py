from django.urls import path

from . import views


urlpatterns = [
    #path("", views.index),
    path("", views.getRoutes, name='routes'),
    path("units/", views.getUnits, name='units'),
    path('units/<str:pk>', views.getUnit, name='unit'),

    path('inventory/', views.getInventory, name='inventory'),
    path('inventory/<str:type_id>', views.getInventoryFilter, name='inventory-search'),
    path('inventory/<str:pk>', views.getInventoryItem, name='inventory-item'),
    path('inventory/edit/<str:pk>', views.editInventoryItem, name='edit-inventory-item'),
    path('newinventory', views.addToInventory, name='inventory-add'),

    path('types', views.getTypes, name='types'),
    path('types/<str:make_name>', views.getTypesByMake, name='types-by-make'),
    
    path('makes', views.getMakes, name='makes'),
    path('units/make/<str:make_id>', views.getUnitsByMake),
    path('newunit/create', views.createNewUnit, name='create-unit')
]