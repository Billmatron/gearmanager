# Generated by Django 4.2.5 on 2023-10-27 18:34

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0001_initial'),
        ('client', '0003_alter_client_create_ux'),
    ]

    operations = [
        migrations.AddField(
            model_name='client',
            name='state',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='clients', to='home.state'),
        ),
        migrations.AlterField(
            model_name='client',
            name='create_ux',
            field=models.PositiveBigIntegerField(default=1698431658),
        ),
    ]