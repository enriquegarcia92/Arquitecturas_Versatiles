from django.db import models

# Create your models here.
from django.db import models
from djongo.models import ObjectIdField

from users.models import User
from bson import ObjectId

# Create your models here.
class Task(models.Model):
    _id = ObjectIdField(primary_key=True, default=ObjectId)
    tsk_title = models.CharField(max_length=255)
    tsk_desc = models.CharField(max_length=255, blank=True)
    tsk_status = models.IntegerField()
    tsk_creation_date = models.DateTimeField()
    tsk_due_date = models.DateTimeField()
    usr = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        db_table = 'Tasks'