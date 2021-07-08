from django.shortcuts import render
from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import render, redirect
# Create your views here.

def home(request):
    pass

    return render(request, 'home.html')

def works(request):  

    return render(request, 'works.html')

def sendgift(request):  

    return render(request, 'sendgift.html')

def blog(request):  

    return render(request, 'blog.html')

def edu(request):  

    return render(request, 'edu.html')

def achv(request):  

    return render(request, 'achv.html')

def faq(request):  

    return render(request, 'faq.html')

def signup(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=raw_password)
            login(request, user)
            return redirect('home')
    else:
        form = UserCreationForm()
    return render(request, 'signup.html', {'form': form})
