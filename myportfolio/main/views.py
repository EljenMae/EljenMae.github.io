from django.shortcuts import render
from django.http import HttpResponse
from .models import Service, Contact, Portfolio
# Create your views here.
def home(request):
    
    return render(request,'main/home.html')

