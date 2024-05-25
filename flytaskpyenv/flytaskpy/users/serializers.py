from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    confirmPassword = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['usr_id', 'usr_name', 'usr_email', 'usr_password', 'confirmPassword', 'usr_role']
        extra_kwargs = {
            'usr_password': {'write_only': True},
        }

    def validate(self, data):
        if data['usr_password'] != data['confirmPassword']:
            raise serializers.ValidationError("Passwords do not match.")
        return data

    def create(self, validated_data):
        validated_data.pop('confirmPassword')
        password = validated_data.pop('usr_password')
        instance = self.Meta.model(**validated_data)
        if password:
            instance.set_password(password)
        instance.save()
        return instance