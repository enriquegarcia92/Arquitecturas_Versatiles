from django.urls import path
from flytaskpy.views import hello_world

urlpatterns = [
    path('testing', hello_world, name='hello_world'),
]