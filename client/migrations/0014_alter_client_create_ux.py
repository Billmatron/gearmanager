# Generated by Django 4.2.5 on 2023-11-02 21:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('client', '0013_alter_client_create_ux'),
    ]

    operations = [
        migrations.AlterField(
            model_name='client',
            name='create_ux',
            field=models.PositiveBigIntegerField(default=1698960875),
        ),
    ]
