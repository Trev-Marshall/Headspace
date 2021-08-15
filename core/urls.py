from django.urls import path, re_path
from .views import current_user, UserList
# from django.views.generic.base import TemplateView


urlpatterns = [
    path('current_user/', current_user),
    path('users/', UserList.as_view()),
    # re_path('.*', TemplateView.as_view(template_name='index.html'))
]
