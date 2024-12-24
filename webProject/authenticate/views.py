from django.contrib.auth import authenticate, login, get_user_model
from django.http import HttpResponseRedirect
from django.shortcuts import render, get_object_or_404
from django import views

from .forms import LoginForm, RegistrationForm
from .mixins import AnonymityRequiredMixin

from .models import Profiles

User = get_user_model()

class LoginView(AnonymityRequiredMixin, views.View):

    def get(self, request, *args, **kwargs):
        form = LoginForm(request.POST or None)
        context = {
            'form': form
        }
        return render(request, 'authenticate/login.html', context=context)

    def post(self, request, *args, **kwargs):
        form = LoginForm(request.POST or None)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(username=username, password=password)
            if user:
                login(request, user)
                return HttpResponseRedirect('/')
        context = {
            'form': form
        }
        return render(request, 'authenticate/login.html', context)


class RegistrationView(AnonymityRequiredMixin, views.View):

    def get(self, request, *args, **kwargs):
        form = RegistrationForm(request.POST or None)
        return render(request, 'authenticate/register.html', {'form': form})

    def post(self, request, *args, **kwargs):
        form = RegistrationForm(request.POST or None)

        if form.is_valid():
            new_user = form.save(commit=False)
            new_user.username = form.cleaned_data['username']
            new_user.save()
            new_user.set_password(form.cleaned_data['password'])
            new_user.save()
            user = authenticate(username=form.cleaned_data['username'], password=form.cleaned_data['password'])
            Profiles.objects.create(user=user, display_name='user')
            login(request, user)
            return HttpResponseRedirect('/')

        context = {
            'form': form
        }
        return render(request, 'authenticate/register.html', context=context)
    

class UserProfileView(views.View):
    def get(self, request, pk, *args, **kwargs):
        user = get_object_or_404(User, pk=pk)
        user_profile = get_object_or_404(Profiles, user=user)

        context = {
            'user': user,
            'profile': user_profile
        }

        return render(request, 'authenticate/user_profile.html', context=context)
