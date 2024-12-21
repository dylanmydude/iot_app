from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from iot_app import views
from iot_app.views import weather_view

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.index, name='index'),  # Route for the main page
    path('reading/', views.reading, name='reading'),  # Route for getting the latest reading
    path('about/', views.about, name='about'),
    path('api/readings/history/', views.get_readings_history, name='readings_history'),
     path('weather/', weather_view, name='weather_view'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
