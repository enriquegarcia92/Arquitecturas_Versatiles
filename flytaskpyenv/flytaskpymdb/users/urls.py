from django.urls import path
from .views import RegisterView, LoginView, PasswordRecoveryView, RestePasswordView, WhoamIView

urlpatterns = [
    path('auth/register', RegisterView.as_view()),
    path('auth/login', LoginView.as_view()),
    path('auth/recover-password', PasswordRecoveryView.as_view()),
    path('auth/recover-authenticated', RestePasswordView.as_view()),
    path('auth/whoami', WhoamIView.as_view())
]

