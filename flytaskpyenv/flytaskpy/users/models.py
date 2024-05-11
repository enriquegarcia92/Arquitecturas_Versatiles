from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class User(AbstractUser):
    usr_id = models.AutoField(primary_key=True)
    usr_name = models.CharField(max_length=255, blank=True)  # Adjust as needed
    username = models.CharField(max_length=255, blank=True, null=True)  # Adjust as needed
    usr_email = models.CharField(max_length=255, unique=True)
    usr_password = models.CharField(max_length=255)
    usr_role = models.CharField(max_length=10)
    #Variables default no utilizadas para caso de uso
    password = models.CharField(max_length=255, unique=True, null = True)
    is_superuser = models.BooleanField(blank = True, default=False, null=True)  # Set default value to False
    first_name = models.CharField(max_length=255, blank=True, null=True)  # Adjust as needed
    last_name = models.CharField(max_length=255, blank=True, null=True)  # Adjust as needed
    email = models.CharField(max_length=255, blank=True, null=True)  # Adjust as needed
    is_staff = models.BooleanField(blank=True, default=False, null=True)  # Adjust as needed
    is_active = models.BooleanField(blank=True, default=True, null=True)  # Adjust as needed
    date_joined = models.DateTimeField(null=True)
    USERNAME_FIELD = 'usr_email'
    REQUIRED_FIELDS = ['usr_name', 'usr_role']  # Add additional required fields if needed

    class Meta:
        db_table = 'user'

class Task(models.Model):
    tsk_id = models.AutoField(primary_key=True)
    tsk_title = models.CharField(max_length=255)
    tsk_desc = models.CharField(max_length=255, blank=True)
    tsk_status = models.IntegerField()
    tsk_creation_date = models.DateTimeField()
    tsk_due_date = models.DateTimeField()
    usr = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title

    class Meta:
        db_table = 'tasks'
