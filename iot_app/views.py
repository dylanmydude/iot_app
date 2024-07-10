from django.shortcuts import render
from django.http import JsonResponse
from .models import SensorReading

def index(request):
    latest_reading = SensorReading.objects.latest('timestamp')
    return render(request, 'index.html', {'reading': latest_reading})

def reading(request):
    latest_reading = SensorReading.objects.latest('timestamp')
    return JsonResponse({
        'temperature': latest_reading.temperature,
        'humidity': latest_reading.humidity,
        'timestamp': latest_reading.timestamp,
        'debug': 'Sensor data fetched successfully'  # Add any debug info you need
    })

def about(request):
    return render(request, 'about.html')
