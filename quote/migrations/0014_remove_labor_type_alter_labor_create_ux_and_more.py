# Generated by Django 4.2.5 on 2023-11-02 21:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quote', '0013_alter_labor_create_ux_alter_quote_create_ux'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='labor',
            name='type',
        ),
        migrations.AlterField(
            model_name='labor',
            name='create_ux',
            field=models.PositiveBigIntegerField(default=1698960875),
        ),
        migrations.AlterField(
            model_name='quote',
            name='create_ux',
            field=models.PositiveBigIntegerField(default=1698960875),
        ),
    ]