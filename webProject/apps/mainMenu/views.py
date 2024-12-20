from django import views
from django.shortcuts import render

class MainMenuViewPage(views.View):
    def get(self, request, *args, **kwargs):
        return render(request, 'mainMenu/main_menu.html')
