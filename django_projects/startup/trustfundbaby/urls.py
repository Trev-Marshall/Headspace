from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('works/', views.achv, name='works'),
    path('sendgift/', views.achv, name='sendgift'),
    path('blog/', views.blog, name='blog'),
    path('edu/', views.edu, name='edu'),
    path('faq/', views.faq, name='faq'),
    path('achv/', views.achv, name='achv'),

]
