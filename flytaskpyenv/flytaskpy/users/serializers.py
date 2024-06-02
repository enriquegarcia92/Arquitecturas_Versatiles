from rest_framework import serializers
from .models import User
from .Exceptions import PasswordMismatchException, DuplicateEmailException
class UserSerializer(serializers.ModelSerializer):
    confirmPassword = serializers.CharField(write_only=True)
    name = serializers.CharField(write_only=True, source='usr_name')
    email = serializers.EmailField(write_only=True, source='usr_email')
    password = serializers.CharField(write_only=True, source='usr_password')

    class Meta:
        model = User
        fields = ['usr_id', 'name', 'email', 'password', 'confirmPassword']
        read_only_fields = ['usr_id']
        extra_kwargs = {
            'usr_password': {'write_only': True},
        }

    def validate(self, data):
        if data['usr_password'] != data['confirmPassword']:
            raise PasswordMismatchException("Passwords do not match")
        if User.objects.filter(usr_email=data['usr_email']).exists():
            raise DuplicateEmailException("Email already exists")
        return data

    def create(self, validated_data):
        validated_data.pop('confirmPassword')
        password = validated_data.pop('usr_password')
        validated_data['usr_role'] = 'CLIENT'
        instance = self.Meta.model(**validated_data)
        if password:
            instance.set_password(password)
        instance.save()
        return instance
