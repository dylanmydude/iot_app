import os
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.utils.dateparse import parse_datetime
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

def get_readings_history(request):
    """Fetch historical readings with optional filtering."""
    limit = int(request.GET.get('limit', 100))  # Default to 100 records
    start_time = request.GET.get('start_time')  # Optional start time
    end_time = request.GET.get('end_time')  # Optional end time

    query = SensorReading.objects.all()

    if start_time:
        query = query.filter(timestamp__gte=parse_datetime(start_time))
    if end_time:
        query = query.filter(timestamp__lte=parse_datetime(end_time))

    readings = query.order_by('-timestamp')[:limit]

    data = {
        "temperature": [reading.temperature for reading in readings],
        "humidity": [reading.humidity for reading in readings],
        "timestamps": [reading.timestamp.isoformat() for reading in readings],
    }

    return JsonResponse(data)
