from django.db import models
from django.contrib.auth.models import AbstractUser
from bson import ObjectId
from djongo.models import ObjectIdField


# Create your models here.

class User(AbstractUser):
    _id = ObjectIdField(primary_key=True, default=ObjectId)
    usr_name = models.CharField(max_length=255, blank=True)  # Adjust as needed
    username = models.CharField(max_length=255, blank=True, null=True)  # Adjust as needed
    usr_email = models.CharField(max_length=255, unique=True)
    usr_password = models.CharField(max_length=255)
    usr_role = models.CharField(max_length=10)

    password = models.CharField(max_length=255, blank=True, null=True)
    is_superuser = models.BooleanField(blank=True, default=False, null=True)  # Set default value to False
    first_name = models.CharField(max_length=255, blank=True, null=True)  # Adjust as needed
    last_name = models.CharField(max_length=255, blank=True, null=True)  # Adjust as needed
    email = models.CharField(max_length=255, blank=True, null=True)  # Adjust as needed
    is_staff = models.BooleanField(blank=True, default=False, null=True)  # Adjust as needed
    is_active = models.BooleanField(blank=True, default=True, null=True)  # Adjust as needed
    date_joined = models.DateTimeField(null=True)
    USERNAME_FIELD = 'usr_email'
    REQUIRED_FIELDS = ['usr_id', 'usr_name', 'usr_password', 'usr_role']  # Add additional required fields if needed

    class Meta:
        db_table = 'User'
