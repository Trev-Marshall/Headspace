from django.shortcuts import render

# Create your views here.

def index(request):
    pass

    return render(request, 'home.html')

def achv(request):  

    return render(request, 'achv.html')

def blog(request):  

    return render(request, 'blog.html')

def edu(request):  

    return render(request, 'edu.html')

def faq(request):  

    return render(request, 'faq.html')
