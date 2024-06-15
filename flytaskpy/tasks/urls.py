from django.urls import path
from .views import CreateTaskView, UpdateTaskView, SetTodoView, SetDoneView, SetUpcomingView, SetDoingView, DeleteTaksView, GetMyTasks

urlpatterns = [
    path('task/create', CreateTaskView.as_view()),
    path('task/edit/<int:id>', UpdateTaskView.as_view()),
    path('task/delete/<int:id>', DeleteTaksView.as_view()),
    path('task/todo/<int:id>', SetTodoView.as_view()),
    path('task/doing/<int:id>', SetDoingView.as_view()),
    path('task/done/<int:id>', SetDoneView.as_view()),
    path('task/upcoming/<int:id>', SetUpcomingView.as_view()),
    path('task/search',GetMyTasks.as_view()),
]

