from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
   
    path('achv/', views.achv, name='achv'),
    path('blog/', views.blog, name='blog'),
    path('edu/', views.edu, name='edu'),
    path('faq/', views.faq, name='faq'),
    
]
