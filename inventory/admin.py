from django.contrib import admin

from .models import Make, Unit, Inventory, Types, Subtypes, Attributes

# Register your models here.
admin.site.register(Make)
admin.site.register(Unit)
admin.site.register(Inventory)
admin.site.register(Types)
admin.site.register(Subtypes)
admin.site.register(Attributes)