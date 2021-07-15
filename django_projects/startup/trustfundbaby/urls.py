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
    path('state/', views.state, name='state'),
    path('tax/', views.tax, name='tax'),
    path('investment/', views.investment, name='investment'),
    path('strats/', views.strats, name='strats'),
    path('extra/', views.extra, name='extra'),
    path('signup/', views.signup, name='signup'),

    path('accounts/signup/', views.signup, name='signup'), #deprecated
    path('test/', views.test, name='test'),
    path('accounts/', include('django.contrib.auth.urls')),
    
    path('dashboard', views.dashboard, name='dashboard'),
    path('logout', views.logout, name='logout'),
    
]
