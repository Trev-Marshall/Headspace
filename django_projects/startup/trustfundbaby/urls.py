from django.urls import path
from django.urls import include
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('works/', views.works, name='works'),
    path('sendgift/', views.sendgift, name='sendgift'),
    path('blog/', views.blog, name='blog'),
    path('edu/', views.edu, name='edu'),
    path('faq/', views.faq, name='faq'),
    path('achv/', views.achv, name='achv'),

    path('accounts/signup/', views.signup, name='signup'), #deprecated
    path('test/', views.test, name='test'),
    path('accounts/', include('django.contrib.auth.urls')),
    
    path('dashboard', views.dashboard, name='dashboard')
]
