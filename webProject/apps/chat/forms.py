from django.forms import ModelForm
from django import forms

from .models import *

class ChatMessageCreateForm(ModelForm):
    class Meta:
        model = GroupMessage
        fields = ['body']
        widgets = {
            'body': forms.TextInput(
                attrs={
                    'placeholder': 'Type message', 
                    'class': 'form-control form-control-lg', 
                    'type': 'text', 
                    'id': 'exampleFormControlInput1',
                    'maxlength': '512',
                },
            )
        }