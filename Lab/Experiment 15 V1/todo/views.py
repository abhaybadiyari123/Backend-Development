from django.shortcuts import render, redirect
from .models import Task

def task_list(request):
    tasks=Task.objects.all().order_by('-created_at')
    context={
        'tasks':tasks,
        'total_tasks':tasks.count(),
        'completed_tasks':tasks.filter(completed=True).count(),
        'pending_tasks':tasks.filter(completed=False).count(),
    }
    return render(request,'todo/task_list.html',context)

def add_task(request):
    if request.method=='POST':
        title=request.POST.get('title')
        if title:
            Task.objects.create(title=title)
        return redirect('task_list')
    return render(request,'todo/add_task.html')

def toggle_task(request,task_id):
    task=Task.objects.get(id=task_id)
    task.completed=not task.completed
    task.save()
    return redirect('task_list')

def delete_task(request,task_id):
    task=Task.objects.get(id=task_id)
    task.delete()
    return redirect('task_list')