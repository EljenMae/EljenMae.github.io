from django.urls import path

from . import views 

urlpatterns = [
    path("<int:id>", views.home, name="home"),
    path("", views.home, name="home")
]
