from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('mainMenu.urls')),
    path('novella/', include('novella.urls')),
    path('quiz/', include('quiz.urls')),
    path('auth/', include('authenticate.urls'))
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
