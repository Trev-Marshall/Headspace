from django.shortcuts import render
from django.contrib.auth import login, authenticate
from django.shortcuts import render, redirect
# Create your views here.
from .forms import SignUpForm
def home(request):
    
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=raw_password)
            login(request, user)
            return redirect('home')
    else:
        form = SignUpForm()
    return render(request, 'home.html', {'form': form})

    #pass

    #return render(request, 'home.html')
    

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



def state(request):
    
    return render(request, 'state.html')

def tax(request):

    return render(request, 'tax.html')

def investment(request):

    return render(request, 'investment.html')

def strats(request):

    return render(request, 'strats.html')

def extra(request):

    return render(request, 'extra.html')

def signup(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=raw_password)
            login(request, user)
            return redirect('home')
    else:
        form = SignUpForm()
    return render(request, 'registration/signup.html', {'form': form})

def test(request):

    num_visits = request.session.get('num_visits', 0)
    request.session['num_visits'] = num_visits + 1
    context = {
        'num_visits' : num_visits,
    }

    return render(request, 'test.html', context=context)

def dashboard(request):
    return render(request, 'dashboard/dashboard.html')

def logout(request):
    return render(request, 'registration/logged_out.html')
