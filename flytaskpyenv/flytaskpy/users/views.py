from django.shortcuts import render
from rest_framework.exceptions import AuthenticationFailed

from rest_framework.views import APIView
from .serializers import UserSerializer
from rest_framework.response import Response
from .models import User
import jwt, datetime
from rest_framework import status


# Create your views here.
class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        user = User.objects.filter(email = email).first()

        if user is None:
            raise AuthenticationFailed('Invalid email/password')
        if not user.check_password(password):
            raise AuthenticationFailed('Invalid email/password')

        payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes = 60),
            'ist': datetime.datetime.utcnow()
        }

        token = jwt.encode(payload, '74fb18cb25e231e2fd2dd6d140f23d3c6bf1e5b11af3b52d98ef6a2158d99a1674fb18cb25e231e2fd2dd6d140f23d3c6bf1e5b11af3b52d98ef6a2158d99a16', algorithm='HS256').decode('utf-8')

        response = Response()
        response.set_cookie(key = 'jwt', value = token, httponly=True)
        response.data = ({
            'message': 'success',
            'jwt': token
        })
        return response