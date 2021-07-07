from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.contrib.auth.models import User
from rest_framework import permissions, status
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from .models import *
from rest_framework.response import Response
from .serializer import *

# Create your views here.


@api_view(['GET'])
# The parameter here is passed in by default by rest framework. it is not Django's HttpRequest instance, it is REST's Request instances being passed in
# authentication runs before the request is passed into the hendler method shown below.
def current_user(request):
    """
    Determine the current user by token, and return their data
    """

    serializer = UserSerializer(request.user)
    return Response(serializer.data)


class UserList(APIView):
    """
    Create a new user.
    """

    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
      # 'request.data' is a POST but in django 'data' is used instead of 'POST'
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# This is considered a Gernetic APIView which makes common tasks more simple.
class TodoView(APIView):

    serializer_class = TaskSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        detail = [{"task": detail.task}
                  for detail in Task.objects.all()]
        return Response(detail)

    def post(self, request):
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
          # the line below caused a problem for a day or so. When saving an instance be sure to name the data according to what it is in the model. Imade the mistake of following a tutorial and using the parameter he used which was 'ownwer' instead of user which throw a 500 internal server error.
            serializer.save(user=request.user)
            return Response(serializer.data)
