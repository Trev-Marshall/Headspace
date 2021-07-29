from django.contrib.auth import password_validation
from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.contrib.auth.models import User
from rest_framework import permissions, status, generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.serializers import Serializer
from rest_framework.views import APIView
from .models import *
from rest_framework.response import Response
from datetime import date, datetime, timedelta
from .serializer import *
from django.contrib.auth.password_validation import validate_password
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


@api_view(['GET'])
def profile_view(request):
    taskModel = Task.objects.filter(user=request.user)
    taskModelDelta = Task.objects.filter(
        user=request.user, dateCreated__gt=datetime.now()-timedelta(days=7))
    goalModel = Goals.objects.filter(user=request.user)
    reflectionsModel = Reflection.objects.filter(user=request.user)
    taskSerObj = TaskSerializer(taskModel, many=True)
    taskSerObjDelta = TaskSerializer(taskModelDelta, many=True)
    goalsSerObj = GoalsSerializer(goalModel, many=True)
    reflSerObj = ReflectionsSerializer(reflectionsModel, many=True)
    resultModel = {"tasks": taskSerObj.data,
                   "goals": goalsSerObj.data, "reflections": reflSerObj.data, "last7DaysOfTasks": taskSerObjDelta.data}
    return Response(resultModel)


class TaskList(generics.ListAPIView):
    serializer_class = TaskSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user
        return Task.objects.filter(user=user, dateCreated=date.today())


@api_view(['POST'])
def update_task(request, pk):
    permission_classes = (permissions.IsAuthenticated,)
    task = Task.objects.get(id=pk)
    serializer = TaskUpdateSerializer(instance=task, data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


class CreateReflectionView(APIView):
    serializer_class = ReflectionsSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        serializer = ReflectionsSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=request.user)
            return Response(serializer.data)


class CreateGoalView(APIView):
    serializer_class = GoalsSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        serializer = GoalsSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=request.user)
            return Response(serializer.data)


@api_view(['POST'])
def update_goal(request, pk):
    permission_classes = (permissions.IsAuthenticated,)
    task = Goals.objects.get(id=pk)
    serializer = GoalsSerializer(instance=task, data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


class GoalList(generics.ListAPIView):
    serializer_class = GoalsSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user
        return Goals.objects.filter(user=user, completed=False)


class FinishedGoalList(generics.ListAPIView):
    serializer_class = GoalsSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user
        return Goals.objects.filter(user=user, completed=True)


@api_view(['POST'])
def update_reflection(request, pk):
    permission_classes = (permissions.IsAuthenticated,)
    reflection = Reflection.objects.get(id=pk)
    serializer = ReflectionsSerializer(instance=reflection, data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


class ReflectionAPIView(generics.ListAPIView):
    serializer_class = ReflectionsSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user
        return Reflection.objects.filter(user=user, dateCreated=date.today())


class UserList(APIView):
    """
    Create a new user.
    """

    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        # 'request.data' is a POST but in django 'data' is used instead of 'POST'
        serializer = UserSerializerWithToken(data=request.data)
        print(request.data)
        # validate_password(password=request.data['password'])
        # Response(data=validate_password(password=request.data['password']))
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# This is considered a Gernetic APIView which makes common tasks more simple.
class TodoView(APIView):

    serializer_class = TaskSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            # the line below caused a problem for a day or so. When saving an instance be sure to name the data according to what it is in the model. Imade the mistake of following a tutorial and using the parameter he used which was 'ownwer' instead of user which throw a 500 internal server error.
            serializer.save(user=request.user)
            return Response(serializer.data)
