# Generated by Django 4.2.5 on 2023-10-27 19:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0029_alter_inventory_create_ux_alter_unit_create_ux'),
    ]

    operations = [
        migrations.AlterField(
            model_name='inventory',
            name='create_ux',
            field=models.BigIntegerField(default=1698433573),
        ),
        migrations.AlterField(
            model_name='unit',
            name='create_ux',
            field=models.BigIntegerField(default=1698433573),
        ),
    ]