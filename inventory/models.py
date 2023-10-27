from django.db import models
from django.contrib.auth.models import User
from django.contrib.postgres.fields import ArrayField

import time

# Create your models here.



class Make(models.Model):
	name = models.CharField(max_length=100, unique=True)
	country = models.ForeignKey('home.Country', on_delete=models.CASCADE, related_name="makes", default=0)
	#types
	#units
	def __str__(self):
		return f"{self.id}: {self.name}"
	
	def to_dict(self):
		data = {'name': self.name,
		  'country': self.country}
		return data



class Unit(models.Model):
	name = models.CharField(max_length=100, unique=True)
	manual_link = models.CharField(max_length=200, default="")
	weight_g = models.IntegerField(default=0)
	value = models.IntegerField(default=0)
	create_ux = models.BigIntegerField(null=False, default= int(time.time()))
	make = models.ManyToManyField(Make, related_name='units')
	image = models.CharField(max_length=100, default="")
	user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='models', default=1)
	#types
	#subtypes
	#attributes
	def __str__(self):
		return f"{self.id}: {self.name}"
	
	def to_dict(self):
		
		data = {'name': self.name,
		  'id': self.id,
		  'weight': self.weight_g,
		  'make':self.make,
		  }
		return data


class Types(models.Model): 
	name = models.CharField(max_length=100, unique=True)
	unit_list = models.ManyToManyField(Unit, related_name='types',blank=True)
	makes = models.ManyToManyField(Make, related_name='types')
	icon = models.CharField(max_length=200, default = '')
	#attributes
	#subtypes

	def __str__(self):
		return f"{self.id}: {self.name}"
	

class Subtypes(models.Model):
	name= models.CharField(max_length=100, unique=True)
	unit_list = models.ManyToManyField(Unit, related_name='subtypes', blank=True)
	types = models.ManyToManyField(Types, related_name='subtypes', blank=True)

	def __str__(self):
		return f"{self.id}: {self.name}"
	


	
class Attributeclass(models.Model):
	name = models.CharField(max_length=50, unique=True)
	types = models.ManyToManyField(Types, related_name='attributeclass')
	

class Attributes(models.Model):
	name = models.CharField(max_length=50, unique=True)
	unit_list = models.ManyToManyField(Unit, related_name='attributes')
	attribute_class = models.ForeignKey(Attributeclass, on_delete=models.CASCADE, related_name='attributes')
	#inventory_set

	def __str__(self):
		return f"{self.id}: {self.name}"
	
class Inventory(models.Model):
	unit = models.ForeignKey(Unit, on_delete=models.CASCADE, related_name="inventories")
	make = models.ForeignKey(Make, on_delete=models.CASCADE, related_name="inventories")
	quantity = models.IntegerField(default=1, null=False)
	rate = models.IntegerField(default=0)
	attributes = models.ManyToManyField(Attributes)
	serial_number = ArrayField(models.CharField(max_length=30, blank=True))
	label = models.CharField(max_length=200)
	purchase_price = models.IntegerField(default=0)
	notes = models.CharField(max_length=1000, blank=True)
	create_ux = models.BigIntegerField(null=False, default = int(time.time()))
	exists = models.BooleanField(null=False, default=True)
	user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="inventory", default=1)

	
  
	def __str__(self):
		return f"{self.id}: {self.label}"

