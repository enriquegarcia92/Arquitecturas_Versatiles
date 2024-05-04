from django.urls import path
from .Api.views import hello_world

urlpatterns = [
    path('testing', hello_world, name='hello_world'),
]