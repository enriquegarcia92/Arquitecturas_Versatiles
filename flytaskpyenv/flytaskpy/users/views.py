from django.shortcuts import render
from rest_framework.exceptions import AuthenticationFailed

from rest_framework.views import APIView

from flytaskpy import settings
from .serializers import UserSerializer
from rest_framework.response import Response
from .models import User
import jwt, datetime
from rest_framework import status
from .Exceptions import PasswordMismatchException, DuplicateEmailException


def generate_token(user):
    payload = {
        'tokenType': 'LOGIN',
        'sub': user.usr_email,
        'iat': datetime.utcnow(),
        'exp': datetime.utcnow() + datetime.timedelta(days=1)
    }
    token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
    return token

# Create your views here.
class RegisterView(APIView):
    def post(self, request):
        try:
            serializer = UserSerializer(data=request.data)
            if serializer.is_valid(raise_exception=True):
                user = serializer.save()
                token = generate_token(user)  # Assuming this function generates a JWT token for the user
                response_data = {
                    "headers": {},
                    "body": {
                        "token": token,
                        "name": user.usr_name,
                        "id": user.usr_id,
                        "errorMessage": None
                    },
                    "statusCodeValue": 200,
                    "statusCode": "OK"
                }
                return Response(response_data, status=status.HTTP_200_OK)
        except PasswordMismatchException as e:
            error_response = {
                "headers": {},
                "body": {"errorMessage": str(e)},
                "statusCodeValue": 400,
                "statusCode": "BAD_REQUEST"
            }
            return Response(error_response, status=status.HTTP_400_BAD_REQUEST)
        except DuplicateEmailException as e:
            error_response = {
                "headers": {},
                "body": {"errorMessage": str(e)},
                "statusCodeValue": 400,
                "statusCode": "BAD_REQUEST"
            }
            return Response(error_response, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            error_response = {
                "headers": {},
                "body": {"errorMessage": f"An unexpected error occurred: {str(e)}"},
                "statusCodeValue": 500,
                "statusCode": "INTERNAL_SERVER_ERROR"
            }
            return Response(error_response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class LoginView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        user = User.objects.filter(usr_email = email).first()

        now = datetime.datetime.utcnow()
        exp = now + datetime.timedelta(minutes=60)
        if user is None:
            raise AuthenticationFailed('User not found')
        if user.check_password(password) is False:
            print("Password Check:", user.check_password(password))
            raise AuthenticationFailed('Invalid email/password')

        payload = {
            'id': user.usr_id,
            'exp': int(exp.timestamp()),
            'iat': int(now.timestamp())
        }
        token = jwt.encode(
            payload,
            settings.SECRET_KEY,
            algorithm='HS256'
        )
        response = Response()
        response.set_cookie(key='jwt', value=token, httponly=True)
        response.data = ({
            'message': 'success',
            'jwt': token
        })
        return response
