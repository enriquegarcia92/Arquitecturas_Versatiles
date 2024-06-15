from rest_framework import serializers
from .models import User
import bcrypt

class UserSerializer(serializers.ModelSerializer):
    confirmPassword = serializers.CharField(write_only=True)
    name = serializers.CharField(write_only=True, source='usr_name')
    email = serializers.EmailField(write_only=True, source='usr_email')
    password = serializers.CharField(write_only=True, source='usr_password')

    class Meta:
        model = User
        fields = ['name', 'email', 'password', 'confirmPassword']
        read_only_fields = ['_id']
        extra_kwargs = {
            'usr_password': {'write_only': True},
        }

    def validate(self, data):
        if data['usr_password'] != data['confirmPassword']:
            print("passwords not match")
            raise Exception("Passwords do not match")
        if User.objects.filter(usr_email=data['usr_email']).exists():
            print("email exists")
            raise Exception("Email already exists")
        return data

    def create(self, validated_data):
        validated_data.pop('confirmPassword')
        password = validated_data.pop('usr_password')
        validated_data['usr_role'] = 'CLIENT'
        instance = self.Meta.model(**validated_data)
        if password:
            # Hash the password using bcrypt
            salt = bcrypt.gensalt()
            hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
            instance.usr_password = hashed_password.decode('utf-8')  # Decode to store as string
        instance.save()
        return instance
