import os
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.utils.dateparse import parse_datetime
from .models import SensorReading
from datetime import timedelta
from django.utils import timezone


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

def get_readings_history(request):
    """Fetch historical readings with time range filtering."""
    print("Request Received:", request)
    time_range = request.GET.get('time_range', '24hrs')
    limit = int(request.GET.get('limit', 100)) 

    now = timezone.now()
    if time_range == '1hr':
        start_time = now - timedelta(hours=1)
    elif time_range == '8hrs':
        start_time = now - timedelta(hours=8)
    elif time_range == '24hrs':
        start_time = now - timedelta(hours=24)
    elif time_range == '7d':
        start_time = now - timedelta(days=7)
    elif time_range == '1m':
        start_time = now - timedelta(days=30)
    else:
        start_time = now - timedelta(hours=24)

    readings = SensorReading.objects.filter(timestamp__gte=start_time).order_by('-timestamp')[:limit]

    data = {
        "temperature": [reading.temperature for reading in readings],
        "humidity": [reading.humidity for reading in readings],
        "timestamps": [reading.timestamp.isoformat() for reading in readings],
    }

    print("Returning Data:", data)
    return JsonResponse(data)
