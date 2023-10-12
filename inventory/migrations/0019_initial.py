# Generated by Django 4.2.5 on 2023-10-12 18:30

from django.conf import settings
import django.contrib.postgres.fields
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('home', '0001_initial'),
        ('inventory', '0018_remove_inventory_attributes_remove_inventory_make_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Attributeclass',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Attributes',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, unique=True)),
                ('attribute_class', models.ManyToManyField(related_name='attributes', to='inventory.attributeclass')),
            ],
        ),
        migrations.CreateModel(
            name='Make',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, unique=True)),
                ('country', models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, related_name='makes', to='home.country')),
            ],
        ),
        migrations.CreateModel(
            name='Unit',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, unique=True)),
                ('manual_link', models.CharField(default='', max_length=200)),
                ('weight_g', models.IntegerField(default=0)),
                ('value', models.IntegerField(default=0)),
                ('create_ux', models.BigIntegerField(default=1697135400)),
                ('image', models.CharField(default='', max_length=100)),
                ('make', models.ManyToManyField(related_name='units', to='inventory.make')),
                ('user', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='models', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Types',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, unique=True)),
                ('icon', models.CharField(default='', max_length=200)),
                ('makes', models.ManyToManyField(related_name='types', to='inventory.make')),
                ('unit_list', models.ManyToManyField(blank=True, related_name='types', to='inventory.unit')),
            ],
        ),
        migrations.CreateModel(
            name='Subtypes',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, unique=True)),
                ('types', models.ManyToManyField(blank=True, related_name='subtypes', to='inventory.types')),
                ('unit_list', models.ManyToManyField(blank=True, related_name='subtypes', to='inventory.unit')),
            ],
        ),
        migrations.CreateModel(
            name='Inventory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.IntegerField(default=1)),
                ('rate', models.IntegerField(default=0)),
                ('serial_number', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(blank=True, max_length=30), size=None)),
                ('label', models.CharField(max_length=200)),
                ('purchase_price', models.IntegerField(default=0)),
                ('notes', models.CharField(max_length=1000)),
                ('create_ux', models.BigIntegerField(default=1697135400)),
                ('exists', models.BooleanField(default=True)),
                ('attributes', models.ManyToManyField(to='inventory.attributes')),
                ('make', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='inventories', to='inventory.make')),
                ('unit', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='inventories', to='inventory.unit')),
                ('user', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='inventory', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='attributes',
            name='types',
            field=models.ManyToManyField(related_name='attributes', to='inventory.types'),
        ),
        migrations.AddField(
            model_name='attributes',
            name='unit_list',
            field=models.ManyToManyField(related_name='attributes', to='inventory.unit'),
        ),
        migrations.AddField(
            model_name='attributeclass',
            name='types',
            field=models.ManyToManyField(related_name='attributeclass', to='inventory.types'),
        ),
    ]
