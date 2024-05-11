from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class User(AbstractUser):
    usr_id = models.AutoField(primary_key=True)
    usr_name = models.CharField(max_length=255)
    usr_email = models.CharField(max_length=255, unique=True)
    usr_password = models.CharField(max_length=255)
    usr_role = models.CharField(max_length=10)

    USERNAME_FIELD = 'usr_email'

    REQUIRED_FIELDS = []

    class Meta:
        db_table = 'user'
