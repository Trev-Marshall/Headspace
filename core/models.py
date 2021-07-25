from django.db import models
from django.db.models.fields import DateField
from django.contrib.auth.models import User


class Task(models.Model):
    task = models.CharField(max_length=100)
    details = models.TextField(max_length=600, blank=True, null=True)
    completed = models.BooleanField(default=True)
    dateCreated = models.DateField(auto_now_add=True)
    user = models.ForeignKey(
        User, default=None, on_delete=models.CASCADE, related_name="task")


class Reflection(models.Model):
    reflection = models.TextField(max_length=600)
    dateCreated = models.DateField(auto_now_add=True)
    user = models.ForeignKey(User, default=None, on_delete=models.CASCADE)


class Goals(models.Model):
    goal = models.CharField(max_length=100)
    completeBy = DateField()
    completed = models.BooleanField(default=True)
    dateCreated = models.DateField(auto_now_add=True)
    user = models.ForeignKey(User, default=None, on_delete=models.CASCADE)
