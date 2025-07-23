from django.shortcuts import render;
from django.http import HttpResponse;
from rest_framework import viewsets, permissions;
from .serializers import * ;
from .models import *;
from rest_framework.response import Response;


def home(request):
    return HttpResponse("This is the home page.")

class ProjectViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = ProjectSerializer

    def get_queryset(self):
        """Return fresh queryset each time"""
        return Project.objects.all()

    def list(self, request):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many = True)
        return Response(serializer.data)
        

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        else:
            return Response(serializer.errors, status= 400)
    # def create(self, request):
    #     serializer = self.serializer_class(data=request.data)
    #     if serializer.is_valid():  # ✅ Call the method
    #         serializer.save()
    #         return Response(serializer.data)
    #     else:
    #         return Response(serializer.errors, status=400)

    def retrieve(self, request, pk=None):
        try:
            project = self.get_queryset().get(pk=pk)
            serializer = self.serializer_class(project)
            return Response(serializer.data)
        except Project.DoesNotExist:
            return Response({'error': 'Project not found'}, status=404)

    def update(self, request, pk=None):
        try:
            project = self.get_queryset().get(pk=pk)
            serializer = self.serializer_class(project, data = request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            else:
                return Response(serializer.errors, status= 400)
        except Project.DoesNotExist:
            return Response({'error': 'Project not found'}, status=404)

    def destroy(self, request, pk=None):
        try: 
            project = self.get_queryset().get(pk=pk)
            project.delete()
            return Response(status=204)
        except Project.DoesNotExist:
            return Response({'error': 'Project not found'}, status=404)
