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
class GetMyTasks(APIView):
    @token_required
    def get(self, request):
        user_id = request.GET.get("userId")
        keyword = request.GET.get("keyword")
        tsk_status = request.GET.get("status")
        # Get the date strings from the request

        # Print to debug
        try:
            query = """
                select * 
                from Tasks t 
                join "user" u on t.usr_id = u.usr_id 
                where t.usr_id = %s 
                AND (LOWER(t.tsk_title) like lower(concat('%%', %s, '%%')) 
                     OR LOWER(t.tsk_desc) like lower(concat('%%', %s, '%%')) 
                     OR t.tsk_status = %s)
            """

            # Execute the SQL query
            with connection.cursor() as cursor:
                cursor.execute(query, (user_id, keyword, keyword, tsk_status))

                rows = cursor.fetchall()


            # Serialize the query result into JSON format
            tasks = []
            for row in rows:
                task = {
                    'tsk_id': row[0],
                    'tsk_title': row[1],
                    'tsk_desc': row[2],
                    'tsk_status': row[3],
                    'tsk_creation_date': row[4].isoformat(),
                    'tsk_due_date': row[5].isoformat(),
                    'usr_id': row[6]
                }
                tasks.append(task)
            serializer = TaskSerializer(data=tasks, many=True)
            serializer.is_valid()

            # Return a JSON response with the serialized data
            response = {
                "data": serializer.data,
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

            # Convert dueDate string to datetime object
            due_date = make_aware(datetime.strptime(due_date_str, "%Y-%m-%dT%H:%M:%SZ"))

            # Create Task instance
            task = Task.objects.create(
                tsk_title=title,
                tsk_desc=description,
                tsk_status=0,  # Assuming 0 represents an initial status
                tsk_creation_date=datetime.now(),
                tsk_due_date=due_date,
                usr_id=user_id
            )
            user = User.objects.filter(usr_id=user_id).first()
            serializer = TaskSerializer(task)

            response = {
                "data": task.tsk_id,
                "message": f"Task created successfully for user {user.usr_id}",
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
            task = Task.objects.filter(tsk_id=id).first()
            if task is None:
                raise Exception("Task not found")
            # Update the Task instance with the new values
            task.tsk_title = request.data['title']
            task.tsk_desc = request.data['description']
            due_date_str = request.data['dueDate']
            task.tsk_due_date = make_aware(datetime.strptime(due_date_str, "%Y-%m-%dT%H:%M:%SZ"))

            # Save the updated Task instance
            task.save()
            response = {
                "data": task.tsk_id,
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


class SetTodoView(APIView):
    @token_required
    def put(self, request, id):
        try:
            # Retrieve the Task instance from the database
            task = Task.objects.filter(tsk_id=id).first()
            if task is None:
                raise Exception(f"Task not found with ID: {id}")
            # Update the Task instance with the new values
            task.tsk_status = 0
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


class SetDoingView(APIView):
    @token_required
    def put(self, request, id):
        try:
            # Retrieve the Task instance from the database
            task = Task.objects.filter(tsk_id=id).first()
            if task is None:
                raise Exception(f"Task not found with ID: {id}")
            # Update the Task instance with the new values
            task.tsk_status = 1
            # Save the updated Task instance
            task.save()
            response = {
                "message": "Task Changed to DOING",
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


class SetDoneView(APIView):
    @token_required
    def put(self, request, id):
        try:
            # Retrieve the Task instance from the database
            task = Task.objects.filter(tsk_id=id).first()
            if task is None:
                raise Exception(f"Task not found with ID: {id}")
            # Update the Task instance with the new values
            task.tsk_status = 2
            # Save the updated Task instance
            task.save()
            response = {
                "message": "Task Changed to DONE",
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


class SetUpcomingView(APIView):
    @token_required
    def put(self, request, id):
        try:
            # Retrieve the Task instance from the database
            task = Task.objects.filter(tsk_id=id).first()
            if task is None:
                raise Exception(f"Task not found with ID: {id}")
            # Update the Task instance with the new values
            task.tsk_status = 3
            # Save the updated Task instance
            task.save()
            response = {
                "message": "Task Changed to Upcoming",
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
            # Retrieve the Task instance from the database
            task = Task.objects.filter(tsk_id=id).first()
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
