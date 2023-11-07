# Generated by Django 4.2.5 on 2023-11-02 15:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0036_alter_inventory_attributes_alter_inventory_create_ux_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='attributes',
            name='makes',
            field=models.ManyToManyField(related_name='attributes', to='inventory.make'),
        ),
        migrations.AlterField(
            model_name='inventory',
            name='create_ux',
            field=models.BigIntegerField(default=1698940390),
        ),
        migrations.AlterField(
            model_name='unit',
            name='create_ux',
            field=models.BigIntegerField(default=1698940390),
        ),
    ]