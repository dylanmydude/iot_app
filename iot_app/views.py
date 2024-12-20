import os
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.utils.dateparse import parse_datetime
from iot_app.models import SensorReading, DeviceSensor
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
    try:
        temperature_sensor = DeviceSensor.objects.filter(sensor_type='temperature').first()
        humidity_sensor = DeviceSensor.objects.filter(sensor_type='humidity').first()

        latest_temperature = SensorReading.objects.filter(sensor=temperature_sensor).latest('timestamp') if temperature_sensor else None
        latest_humidity = SensorReading.objects.filter(sensor=humidity_sensor).latest('timestamp') if humidity_sensor else None

        return JsonResponse({
            'temperature': latest_temperature.value if latest_temperature else None,
            'humidity': latest_humidity.value if latest_humidity else None,
            'timestamp': latest_temperature.timestamp if latest_temperature else None,
            'debug': 'Sensor data fetched successfully'
        })
    except SensorReading.DoesNotExist:
        return JsonResponse({'error': 'No readings found'}, status=404)


def about(request):
    return render(request, 'about.html')

def get_readings_history(request):
    time_range = request.GET.get('time_range', '24hrs')  # Parse time range
    sensors = DeviceSensor.objects.all()
    data = []

    for sensor in sensors:
        readings = SensorReading.objects.filter(sensor=sensor).order_by('-timestamp')[:50]
        data.append({
            "sensor_id": sensor.id,
            "sensor_type": sensor.sensor_type,
            "unit": sensor.unit,
            "readings": [{"value": r.value, "timestamp": r.timestamp} for r in readings]
        })

    return JsonResponse(data, safe=False)
