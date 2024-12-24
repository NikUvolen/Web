from django.shortcuts import render
from django import views

class NovellaView(views.View):
    def get(self, request, *args, **kwargs):
        return render(request, 'novella/novella.html')
