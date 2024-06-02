from functools import wraps

from django.core.mail import send_mail
from rest_framework.views import APIView
from flytaskpy import settings
from .serializers import UserSerializer
from rest_framework.response import Response
from .models import User
import jwt, datetime
from rest_framework import status
import bcrypt
from .Utils import Utils


def generate_recoverytoken(user):
    now = datetime.datetime.utcnow()
    exp = now + datetime.timedelta(minutes=20)
    payload = {
        'tokenType': 'RECOVERY',
        'sub': user.usr_email,
        'exp': int(exp.timestamp()),
        'iat': int(now.timestamp())
    }
    token = jwt.encode(
        payload,
        settings.SECRET_KEY,
        algorithm='HS256'
    )

    return token


def generate_logintoken(user):
    now = datetime.datetime.utcnow()
    exp = now + datetime.timedelta(hours=4)
    payload = {
        'tokenType': 'LOGIN',
        'sub': user.usr_email,
        'exp': int(exp.timestamp()),
        'iat': int(now.timestamp())
    }
    token = jwt.encode(
        payload,
        settings.SECRET_KEY,
        algorithm='HS256'
    )

    return token


def token_required(view_func):
    @wraps(view_func)
    def _wrapped_view(request, *args, **kwargs):
        token = request.headers.get('Authorization', '').split('Bearer ')[-1]
        if not token:
            response = {
                "message": "Token missing",
                "status": "error"
            }
            return Response(response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        try:
            decoded_token = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            response = {
                "message": "Token Expired",
                "status": "error"
            }
            return Response(response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except jwt.InvalidTokenError:
            response = {
                "message": "Token invalid",
                "status": "error"
            }
            return Response(response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        if decoded_token.get('tokenType') != 'LOGIN':
            response = {
                "message": "Token not login type",
                "status": "error"
            }
            return Response(response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return view_func(request, *args, **kwargs)

    return _wrapped_view


# Create your views here.
class RegisterView(APIView):
    def post(self, request):
        try:
            serializer = UserSerializer(data=request.data)
            if serializer.is_valid(raise_exception=True):
                user = serializer.save()
                response = {
                    "user id": user.usr_id,
                    "message": "User registered successfully",
                    "status": "success"
                }
                return Response(response, status=status.HTTP_200_OK)
        except Exception as e:
            response = {
                "message": str(e),
                "status": "error",
            }
            return Response(response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class LoginView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']
        try:
            user = User.objects.filter(usr_email=email).first()
            stored_hashed_password = user.usr_password.encode('utf-8')  # Ensure the stored hash is in bytes
            provided_password = password.encode('utf-8')  # Encode the provided password to bytes
            if user is None:
                raise Exception('Bad credentials')
            if not bcrypt.checkpw(provided_password, stored_hashed_password):
                raise Exception('Bad credentials')
            response = ({
                'id': user.usr_id,
                'message': 'Logged succesfully',
                'status': 'success',
                'token': generate_logintoken(user)
            })
            return Response(response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            response = {
                "message": str(e),
                "status": "error",
            }
            return Response(response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class PasswordRecoveryView(APIView):
    def post(self, request, *args, **kwargs):
        try:
            email = request.GET.get("email")
            user = User.objects.filter(usr_email=email).first()
            if user is None:
                raise Exception("User not found")
            token = generate_recoverytoken(user)
            html_message = Utils.getTemplate(token)
            subject = 'Password Recovery'
            from_email = settings.EMAIL_HOST_USER
            recipient_list = [email]
            # Send the email
            send_mail(subject, '', from_email, recipient_list, html_message=html_message)
            response = {
                "message": "Recovery email send successfully",
                "status": "success"
            }
            return Response(response, status=status.HTTP_200_OK)
        except Exception as e:
            response = {
                "message": str(e),
                "status": "error",
            }
            return Response(response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class RestePasswordView(APIView):
    def post(self, request):
        try:
            new_password = request.data['newPassword']
            password_confirmation = request.data['passwordConfirmation']
            token = request.data['token']
            # Validate token
            decoded_token = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
            # Check token type
            if decoded_token.get('tokenType') != 'RECOVERY':
                raise Exception("Invalid token type")
            # Get email from token
            email = decoded_token.get('sub')
            # Get user
            user = User.objects.filter(usr_email=email).first()
            # Validate passwords
            if new_password != password_confirmation:
                raise Exception("Passwords do not patch")
            # Set new password
            salt = bcrypt.gensalt()
            hashed_password = bcrypt.hashpw(new_password.encode('utf-8'), salt)
            user.usr_password = hashed_password.decode('utf-8')
            user.save()
            response = {
                "message": "Password recovered successfully",
                "status": "success"
            }
            return Response(response, status=status.HTTP_200_OK)
        except Exception as e:
            response = {
                "message": str(e),
                "status": "error"
            }
            return Response(response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class WhoamIView(APIView):
    @token_required
    def post(self, request):
        return Response("Token Valid", status=status.HTTP_500_INTERNAL_SERVER_ERROR)
