from django.shortcuts import render
from django.http import HttpResponse
from .models import Service, Contact, Portfolio
# Create your views here.
def index(response, id):
    return HttpResponse("<h1>%s</h1>" %id)


