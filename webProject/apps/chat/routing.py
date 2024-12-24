from django.urls import path
from .consumers import ChatroomConsumers

websocket_urlpatterns = [
    path('ws/chatroom/<chatroom_name>', ChatroomConsumers.as_asgi())
]