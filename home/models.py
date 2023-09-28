
from django.db import models
from django.dispatch import receiver
from django.db.models.signals import post_save
from django.core.validators import MinLengthValidator, MaxLengthValidator
from django.contrib.auth.models import User




class State(models.Model):
	name = models.CharField(max_length=100, unique=True)
	abbr = models.CharField(max_length=3, unique=True)

	#users = db.relationship("Users", back_populates="state")
	#company = db.relationship("Company", back_populates="state")
	def __str__(self):
		return f"{self.id}: {self.name}, {self.abbr}"
    	
	

class Country(models.Model):
	name = models.CharField(max_length=100, unique=True)
	
	def __str__(self):
		return f"{self.id}: {self.name}"
	#make = db.relationship("Make", back_populates="country")

class City(models.Model):
	name = models.CharField(max_length=100, unique=True)

	def __str__(self):
		return f"{self.id}: {self.name}"
	

class Profile(models.Model):
	user = models.OneToOneField(User, on_delete=models.CASCADE)
	website = models.CharField(max_length=150)
	image = models.CharField(max_length=150)
	company_name = models.CharField(max_length=150)
	address = models.CharField(max_length=200)
	city = models.ForeignKey(City, on_delete=models.CASCADE, related_name="users", default=1)
	state = models.ForeignKey(State, on_delete=models.CASCADE, related_name="users", default=1)
	zipcode = models.PositiveIntegerField(validators=[MinLengthValidator(5), MaxLengthValidator(10)], default = 12345)


###########
# hook the create_user_profile and save_user_profile methods to the User model whenever a save event occurs
# https://simpleisbetterthancomplex.com/tutorial/2016/07/22/how-to-extend-django-user-model.html#onetoone
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
	if created:
		Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
	instance.profile.save()
###########