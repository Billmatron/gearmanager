# Generated by Django 4.2.5 on 2023-10-12 19:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0021_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='attributes',
            name='attribute_class',
        ),
        migrations.RemoveField(
            model_name='attributes',
            name='types',
        ),
        migrations.RemoveField(
            model_name='attributes',
            name='unit_list',
        ),
        migrations.RemoveField(
            model_name='inventory',
            name='attributes',
        ),
        migrations.RemoveField(
            model_name='inventory',
            name='make',
        ),
        migrations.RemoveField(
            model_name='inventory',
            name='unit',
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
            model_name='subtypes',
            name='types',
        ),
        migrations.RemoveField(
            model_name='subtypes',
            name='unit_list',
        ),
        migrations.RemoveField(
            model_name='types',
            name='makes',
        ),
        migrations.RemoveField(
            model_name='types',
            name='unit_list',
        ),
        migrations.RemoveField(
            model_name='unit',
            name='make',
        ),
        migrations.RemoveField(
            model_name='unit',
            name='user',
        ),
        migrations.DeleteModel(
            name='Attributeclass',
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
            name='Subtypes',
        ),
        migrations.DeleteModel(
            name='Types',
        ),
        migrations.DeleteModel(
            name='Unit',
        ),
    ]