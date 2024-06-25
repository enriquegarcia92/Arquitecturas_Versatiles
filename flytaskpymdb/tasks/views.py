from django.db import connection
from django.utils.timezone import make_aware
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from users.views import token_required
from .models import Task
from users.models import User
from .serializers import TaskSerializer
from datetime import datetime
from djongo.models import Q  # Import Q object for query construction
from bson import ObjectId


class GetMyTasks(APIView):
    @token_required
    def get(self, request):
        user_id = request.GET.get("userId")
        keyword = request.GET.get("keyword")
        tsk_status = request.GET.get("status")
        obj_id = ObjectId(user_id)
        user = User.objects.filter(_id=obj_id).first()

        try:
            # Construct the MongoDB-like filter using djongo's Q object
            filter_query = Q(
                usr_id=user._id
            )

            # Query the Tasks collection with the constructed filter
            tasks_queryset = Task.objects.filter(filter_query)

            # Serialize the queryset into JSON format
            serializer = TaskSerializer(tasks_queryset, many=True)

            # Return a JSON response with the serialized data
            response = {
                "data": serializer.data,
                "totalTasks": len(tasks_queryset),
                "message": "Tasks retrieved successfully",
                "status": "success"
            }
            return Response(response, status=status.HTTP_200_OK)

        except Exception as e:
            response = {
                "message": str(e),
                "status": "error",
            }
            return Response(response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class CreateTaskView(APIView):
    @token_required
    def post(self, request):
        try:
            title = request.data['title']
            description = request.data['description']
            due_date_str = request.data['dueDate']
            user_id = request.data['userId']
            obj_id = ObjectId(user_id)

            # Try to parse dueDate string to datetime object with different formats
            try:
                due_date = make_aware(datetime.strptime(due_date_str, "%Y-%m-%dT%H:%M:%SZ"))
            except ValueError:
                due_date = make_aware(datetime.strptime(due_date_str, "%Y-%m-%d"))
            user = User.objects.filter(_id=obj_id).first()

            # Create Task instance
            task = Task.objects.create(
                tsk_title=title,
                tsk_desc=description,
                tsk_status=0,  # Assuming 0 represents an initial status
                tsk_creation_date=datetime.now(),
                tsk_due_date=due_date,
                usr_id=user
            )
            user = User.objects.filter(_id=user_id).first()
            serializer = TaskSerializer(task)

            response = {
                "data": task._id,
                "message": f"Task created successfully for user  {str(user._id)}",
                "status": "success"
            }
            # Return success response
            return Response(response, status=status.HTTP_200_OK)
        except Exception as e:
            response = {
                "message": str(e),
                "status": "error",
            }
            return Response(response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class UpdateTaskView(APIView):
    @token_required
    def put(self, request, id):
        try:
            # Retrieve the Task instance from the database
            obj_id = ObjectId(id)
            task = Task.objects.filter(_id=obj_id).first()
            if task is None:
                raise Exception("Task not found")

            # Update the Task instance with the new values
            task.tsk_title = request.data['title']
            task.tsk_desc = request.data['description']
            due_date_str = request.data['dueDate']

            # Try to parse dueDate string to datetime object with different formats
            try:
                task.tsk_due_date = make_aware(datetime.strptime(due_date_str, "%Y-%m-%dT%H:%M:%SZ"))
            except ValueError:
                task.tsk_due_date = make_aware(datetime.strptime(due_date_str, "%Y-%m-%d"))

            # Save the updated Task instance
            task.save()
            response = {
                "data": str(task._id),
                "message": "Task Updated Successfully",
                "status": "success"
            }
            # Return success response
            return Response(response, status=status.HTTP_200_OK)
        except Exception as e:
            response = {
                "message": str(e),
                "status": "error",
            }
            return Response(response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class SetStateView(APIView):
    @token_required
    def put(self, request, id, newstatus):
        try:
            obj_id = ObjectId(id)
            # Retrieve the Task instance from the database
            task = Task.objects.filter(_id=obj_id).first()
            changeState = 0;
            if newstatus == 'todo':
                changeState = 0
            if newstatus == 'doing':
                changeState = 1
            if newstatus == 'done':
                changeState = 2
            if newstatus == 'upcoming':
                changeState = 3
            if task is None:
                raise Exception(f"Task not found with ID: {id}")
            # Update the Task instance with the new values
            task.tsk_status = changeState
            # Save the updated Task instance
            task.save()
            response = {
                "message": "Task Changed to TODO",
                "status": "success"
            }
            # Return success response
            return Response(response, status=status.HTTP_200_OK)
        except Exception as e:
            response = {
                "message": str(e),
                "status": "error",
            }
            return Response(response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class DeleteTaksView(APIView):
    @token_required
    def delete(self, request, id):
        try:
            obj_id = ObjectId(id)

            # Retrieve the Task instance from the database
            task = Task.objects.filter(_id=obj_id).first()
            if task is None:
                raise Exception(f"Task not found with ID: {id}")
            # Delete the Task instance
            task.delete()
            # Return success response
            response = {
                "message": "Task Deleted Successfully",
                "status": "success"
            }
            return Response(response, status=status.HTTP_200_OK)
        except Exception as e:
            response = {
                "message": str(e),
                "status": "error",
            }
            return Response(response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
