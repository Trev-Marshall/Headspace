from django.urls import path
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
<<<<<<< HEAD
    #path('tax/', views.tax, name='tax'),
    #path('investment/', views.investment, name='investment'),
    #path('strats/', views.strats, name='strats'),
    #path('extra/', views.strats, name='extra'),
=======
    path('tax/', views.tax, name='tax'),
    path('investment/', views.investment, name='investment'),
    path('strats/', views.strats, name='strats'),
    path('extra/', views.extra, name='extra'),
>>>>>>> 7012f9c63443fc309950706bad08578b096d04d7
    path('signup/', views.signup, name='signup')
]
