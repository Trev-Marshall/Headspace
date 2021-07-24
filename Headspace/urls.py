"""Headspace URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from core.views import *
from django.conf.urls import url
from django.contrib import admin
from django.urls import path, include
from rest_framework_jwt.views import obtain_jwt_token
# from rest_framework_jwt import views as jwt_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('wel/', TodoView.as_view(), name="create task"),
    path('todos/', TaskList.as_view(), name="todo list"),
    path('edit-todo/<str:pk>/', update_task, name="update task"),
    path('current-reflection/', ReflectionAPIView.as_view(),
         name="current reflection"),
    path('update-reflection/<str:pk>/',
         update_reflection, name="update reflection"),
    path('token-auth/', obtain_jwt_token),
    path('core/', include('core.urls')),
    path('create-reflection/', CreateReflectionView.as_view(),
         name="create reflection"),
    path('create-goal/', CreateGoalView.as_view(), name="create goal"),
    path('update-goal/<str:pk>/', update_goal, name="update goal"),
    path('get-goals/', GoalList.as_view(), name="get goals"),
    path("get-finished-goals", FinishedGoalList.as_view(),
         name='get finsihed goals'),
    path('profile-info/', profile_view, name="user profile data")
]
