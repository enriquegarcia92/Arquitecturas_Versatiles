from django.urls import path
from .views import CreateTaskView, UpdateTaskView, SetTodoView, SetDoneView, SetUpcomingView, SetDoingView, DeleteTaksView, GetMyTasks

urlpatterns = [
    path('task/create', CreateTaskView.as_view()),
    path('task/edit/<str:id>', UpdateTaskView.as_view()),
    path('task/delete/<str:id>', DeleteTaksView.as_view()),
    path('task/todo/<str:id>', SetTodoView.as_view()),
    path('task/doing/<str:id>', SetDoingView.as_view()),
    path('task/done/<str:id>', SetDoneView.as_view()),
    path('task/upcoming/<str:id>', SetUpcomingView.as_view()),
    path('task/search',GetMyTasks.as_view()),
]

