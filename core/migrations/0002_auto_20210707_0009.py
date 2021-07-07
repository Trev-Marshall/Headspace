# Generated by Django 3.2.4 on 2021-07-07 00:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='goals',
            name='completed',
            field=models.BooleanField(default=True),
        ),
        migrations.AlterField(
            model_name='goals',
            name='goal',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='relfection',
            name='reflection',
            field=models.CharField(max_length=150),
        ),
        migrations.AlterField(
            model_name='task',
            name='task',
            field=models.CharField(max_length=100),
        ),
    ]
