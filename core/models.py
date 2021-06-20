from django.db import models

# Create your models here.


class React(models.Model):
    task = models.CharField(max_length=50)
