from django.contrib import admin
from .models import Task, Reflection, Goals

# Register your models here.
admin.site.register(Task)
admin.site.register(Reflection)
admin.site.register(Goals)
