from django.urls import path
from .views import CreateTaskView, UpdateTaskView,SetStateView, DeleteTaksView, GetMyTasks

urlpatterns = [
    path('task/create', CreateTaskView.as_view()),
    path('task/edit/<int:id>', UpdateTaskView.as_view()),
    path('task/delete/<int:id>', DeleteTaksView.as_view()),
    path('task/<str: newstatus>/<int:id>', SetStateView.as_view()),
    path('task/search',GetMyTasks.as_view()),
]

