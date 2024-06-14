from django.db import models

# Create your models here.
from django.db import models
from users.models import User


# Create your models here.
class Task(models.Model):
    tsk_id = models.AutoField(primary_key=True)
    tsk_title = models.CharField(max_length=255)
    tsk_desc = models.CharField(max_length=255, blank=True)
    tsk_status = models.IntegerField()
    tsk_creation_date = models.DateTimeField()
    tsk_due_date = models.DateTimeField()
    usr = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        db_table = 'tasks'
