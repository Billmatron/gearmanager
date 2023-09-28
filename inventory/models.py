from django.db import models
from django.contrib.auth.models import User


import time

# Create your models here.



class Make(models.Model):
	name = models.CharField(max_length=100, unique=True)
	country = models.ForeignKey('home.Country', on_delete=models.CASCADE, related_name="makes", default=0)
	#types_set
	#models_set
	def __str__(self):
		return f"{self.id}: {self.name}"
	

class Model(models.Model):
	name = models.CharField(max_length=100, unique=True)
	manual_link = models.CharField(max_length=200, default="")
	weight_g = models.IntegerField(default=0)
	value = models.IntegerField(default=0)
	create_ux = models.BigIntegerField(null=False, default= int(time.time()))
	make = models.ManyToManyField(Make)
	image = models.CharField(max_length=100, default="")
	user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='models', default=1)
	#types_set
	#subtypes_set
	#attributes_set
	def __str__(self):
		return f"{self.id}: {self.name}"
	


class Types(models.Model): 
	name = models.CharField(max_length=100, unique=True)
	model_list = models.ManyToManyField(Model)
	makes = models.ManyToManyField(Make)
	icon = models.CharField(max_length=200, default = '')
	#attributes_set
	#subtypes_set

	def __str__(self):
		return f"{self.id}: {self.name}"
	

class Subtypes(models.Model):
	name= models.CharField(max_length=100, unique=True)
	model_list = models.ManyToManyField(Model)
	types = models.ManyToManyField(Types)

	def __str__(self):
		return f"{self.id}: {self.name}"
	


	


class Attributes(models.Model):
	name = models.CharField(max_length=50, unique=True)
	model_list = models.ManyToManyField(Model)
	types = models.ManyToManyField(Types)
	subtypes = models.ManyToManyField(Subtypes)
	#inventory_set

	def __str__(self):
		return f"{self.id}: {self.name}"
	
class Inventory(models.Model):
	model = models.ForeignKey(Model, on_delete=models.CASCADE, related_name="inventories")
	quantity = models.IntegerField(default=1, null=False)
	rate = models.IntegerField(default=0)
	attributes = models.ManyToManyField(Attributes)
	serial_number = models.CharField(max_length=100)
	label = models.CharField(max_length=200)
	purchase_price = models.IntegerField(default=0)
	notes = models.CharField(max_length=1000)
	create_ux = models.BigIntegerField(null=False, default = int(time.time()))
	exists = models.BooleanField(null=False, default=True)
	user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="inventory", default=1)

	
  
	def __str__(self):
		return f"{self.id}: {self.label}"
