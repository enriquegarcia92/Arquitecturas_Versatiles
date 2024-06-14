from rest_framework import serializers
from .models import Task, User


class TaskSerializer(serializers.ModelSerializer):
    taskId = serializers.IntegerField(source='tsk_id')
    title = serializers.CharField(source='tsk_title')
    description = serializers.CharField(source='tsk_desc')
    status = serializers.IntegerField(source='tsk_status')
    creationDate = serializers.DateTimeField(source='tsk_creation_date')
    dueDate = serializers.DateTimeField(source='tsk_due_date')
    class Meta:
        model = Task
        fields = ['taskId', 'title', 'description', 'status', 'creationDate', 'dueDate']
