from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.static import serve
from django.urls import re_path

from .settings import DEBUG, STATIC_URL, STATIC_ROOT, MEDIA_URL, MEDIA_ROOT

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('mainMenu.urls')),
    path('novella/', include('novella.urls')),
    path('quiz/', include('quiz.urls')),
    path('auth/', include('authenticate.urls'))
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if not DEBUG:
    urlpatterns += [
        re_path(f'{MEDIA_URL.lstrip("/")}(?P<path>.*)$', serve, {'document_root': MEDIA_ROOT}),
        re_path(f'{STATIC_URL.lstrip("/")}(?P<path>.*)$', serve, {'document_root': STATIC_ROOT}),
    ]
