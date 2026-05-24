from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Task
from .serializers import TaskSerializer

# GET TASKS + ADD TASK
@api_view(['GET', 'POST'])
def task_list(request):

    if request.method == 'GET':
        tasks = Task.objects.all()
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = TaskSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors)


# DELETE TASK + MARK AS DONE
@api_view(['DELETE', 'PUT'])
def task_detail(request, pk):

    try:
        task = Task.objects.get(id=pk)
    except Task.DoesNotExist:
        return Response({'error': 'Task not found'})


    # DELETE TASK
    if request.method == 'DELETE':
        task.delete()
        return Response({'message': 'Task deleted'})


    # MARK TASK AS DONE
    if request.method == 'PUT':

        task.is_completed = True
        task.save()

        serializer = TaskSerializer(task)
        return Response(serializer.data)