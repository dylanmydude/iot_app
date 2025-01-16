from django.urls import path
from . import views

urlpatterns = [
    path('api/login/', views.login_view, name='login'),
    path('api/logout/', views.logout_view, name='logout'),
    path('', views.index, name='index'),  # Main page
    path('reading/', views.reading, name='reading'),  # Latest reading
    path('about/', views.about, name='about'),
    path('api/readings/history/', views.get_readings_history, name='readings_history'),
    path('weather/', views.weather_view, name='weather_view'),
]
