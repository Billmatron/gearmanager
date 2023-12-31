# Generated by Django 4.2.5 on 2023-10-04 18:45

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0005_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='inventory',
            name='attributes',
        ),
        migrations.RemoveField(
            model_name='inventory',
            name='model',
        ),
        migrations.RemoveField(
            model_name='inventory',
            name='user',
        ),
        migrations.RemoveField(
            model_name='make',
            name='country',
        ),
        migrations.RemoveField(
            model_name='model',
            name='make',
        ),
        migrations.RemoveField(
            model_name='model',
            name='user',
        ),
        migrations.RemoveField(
            model_name='subtypes',
            name='model_list',
        ),
        migrations.RemoveField(
            model_name='subtypes',
            name='types',
        ),
        migrations.RemoveField(
            model_name='types',
            name='makes',
        ),
        migrations.RemoveField(
            model_name='types',
            name='model_list',
        ),
        migrations.DeleteModel(
            name='Attributes',
        ),
        migrations.DeleteModel(
            name='Inventory',
        ),
        migrations.DeleteModel(
            name='Make',
        ),
        migrations.DeleteModel(
            name='Model',
        ),
        migrations.DeleteModel(
            name='Subtypes',
        ),
        migrations.DeleteModel(
            name='Types',
        ),
    ]
