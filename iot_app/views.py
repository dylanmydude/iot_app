import os
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from .models import SensorReading

def index(request):
    """Serve the React app."""
    react_index_path = os.path.join(os.path.dirname(__file__), '..', 'frontend', 'dist', 'index.html')
    try:
        with open(react_index_path) as f:
            return HttpResponse(f.read(), content_type='text/html')
    except FileNotFoundError:
        return HttpResponse("React build files not found. Did you run 'npm run build'?", status=404)

def reading(request):
    latest_reading = SensorReading.objects.latest('timestamp')
    return JsonResponse({
        'temperature': latest_reading.temperature,
        'humidity': latest_reading.humidity,
        'timestamp': latest_reading.timestamp,
        'debug': 'Sensor data fetched successfully'
    })

def about(request):
    return render(request, 'about.html')
