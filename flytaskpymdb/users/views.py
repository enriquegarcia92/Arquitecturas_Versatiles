from functools import wraps
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from django.core.mail import send_mail
from django.http import HttpResponse
from rest_framework.views import APIView
from flytaskpymdb import settings
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
        'iat': int(now.timestamp()),
        'exp': int(exp.timestamp())
    }
    headers = {
        'alg': 'HS256',
        'typ': 'JWT'
    }
    token = jwt.encode(
        payload,
        settings.SECRET_KEY,
        algorithm='HS256',
        headers=headers
    )

    return token

def generate_logintoken(user):
    now = datetime.datetime.utcnow()
    exp = now + datetime.timedelta(hours=4)
    payload = {
        'tokenType': 'LOGIN',
        'sub': user.usr_email,
        'iat': int(now.timestamp()),
        'exp': int(exp.timestamp())
    }
    headers = {
        'alg': 'HS256',
        'typ': 'JWT'
    }
    token = jwt.encode(
        payload,
        settings.SECRET_KEY,
        algorithm='HS256',
        headers=headers
    )

    return token


def token_required(view_func):
    @wraps(view_func)
    def _wrapped_view(self, request, *args, **kwargs):
        authorization_header = request.headers.get('Authorization')
        if not authorization_header or not authorization_header.startswith('Bearer '):
            response = {
                "message": "Invalid Authorization header format",
                "status": "error"
            }
            return Response(response, status=status.HTTP_401_UNAUTHORIZED)

        token = authorization_header.split('Bearer ')[1].strip()

        if not token:
            response = {
                "message": "Token missing",
                "status": "error"
            }
            return Response(response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        try:
            decoded_token = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
        except jwt.ExpiredSignatureError as e:
            response = {
                "message": str(e),
                "status": "error"
            }
            return Response(response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except jwt.InvalidTokenError as e:
            response = {
                "message": str(e),
                "status": "error"
            }
            return Response(response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        if decoded_token.get('tokenType') != 'LOGIN':
            response = {
                "message": "Token not login type",
                "status": "error"
            }
            return Response(response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return view_func(self, request, *args, **kwargs)

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
    def post(self, request):
        email = request.GET.get("email")
        try:
            user = User.objects.filter(usr_email=email).first()
            if user is None:
                raise Exception("User not found")
            token = generate_recoverytoken(user)
            html_message = Utils.getTemplate(token)
            subject = 'Password Recovery'
            from_email = settings.EMAIL_HOST_USER
            password = settings.EMAIL_HOST_PASSWORD
            recipient_list = [email]

            # Create the email content
            message = MIMEMultipart()
            message['From'] = from_email
            message['To'] = email
            message['Subject'] = subject
            message.attach(MIMEText(html_message, 'html'))

            # Send the email using smtplib
            with smtplib.SMTP(settings.EMAIL_HOST, settings.EMAIL_PORT) as server:
                server.starttls()
                server.login(from_email, password)
                server.sendmail(from_email, recipient_list, message.as_string())

            response = {
                "message": "Recovery email sent successfully",
                "status": "success"
            }
            return Response(response, status=status.HTTP_200_OK)
        except Exception as e:
            response = {
                "message": str(e),
                "status": "error"
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
        return HttpResponse("Token Valid", status=status.HTTP_200_OK, content_type="text/plain")
