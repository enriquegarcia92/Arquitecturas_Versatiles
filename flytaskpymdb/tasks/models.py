from django.db import models

# Create your models here.
from django.db import models
from users.models import User
from mongoengine import ObjectIdField, ReferenceField


# Create your models here.
class Task(models.Model):
    tsk_id = ObjectIdField(primary_key=True, default=None)
    tsk_title = models.CharField(max_length=255)
    tsk_desc = models.CharField(max_length=255, blank=True)
    tsk_status = models.IntegerField()
    tsk_creation_date = models.DateTimeField()
    tsk_due_date = models.DateTimeField()
    usr = ReferenceField(User, dbref=True)

    class Meta:
        db_table = 'tasks'
