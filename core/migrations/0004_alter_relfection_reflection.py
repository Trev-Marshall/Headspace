# Generated by Django 3.2.4 on 2021-07-13 20:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_alter_task_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='relfection',
            name='reflection',
            field=models.TextField(max_length=600),
        ),
    ]
