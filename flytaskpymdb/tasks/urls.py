from django.urls import path
from .views import CreateTaskView, UpdateTaskView, SetStateView, DeleteTaksView, GetMyTasks

urlpatterns = [
    path('task/create', CreateTaskView.as_view()),
    path('task/edit/<str:id>', UpdateTaskView.as_view()),
    path('task/delete/<str:id>', DeleteTaksView.as_view()),
    path('task/<str:newstatus>/<str:id>', SetStateView.as_view()),
    path('task/search',GetMyTasks.as_view()),
]

