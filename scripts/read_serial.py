import os
import sys
import django
import serial
import time

# Add the project root to the PYTHONPATH
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(project_root)
print("Project root added to PYTHONPATH:", project_root)
print("Current PYTHONPATH:", sys.path)

# Setup Django environment
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "project.settings")
django.setup()

from iot_app.models import SensorReading

def read_from_serial():
    try:
        ser = serial.Serial('/dev/ttyUSB0', 9600, timeout=1)
        print("Connected to Arduino on /dev/ttyUSB0")
    except Exception as e:
        print(f"Failed to connect to Arduino: {e}")
        raise

    while True:
        if ser.in_waiting > 0:
            line = ser.readline().decode('utf-8').strip()
            print(f"Received: {line}")
            
            try:
                # Handle the format "T:<temperature>,H:<humidity>"
                if line.startswith("T:") and ",H:" in line:
                    temp_part, humi_part = line.split(",H:")
                    temperature = float(temp_part.split(":")[1])
                    humidity = float(humi_part)
                    print(f"Parsed Temperature: {temperature}, Humidity: {humidity}")

                    # Save to database
                    SensorReading.objects.create(
                        temperature=temperature,
                        humidity=humidity
                    )
                    print(f"Saved to DB: Temperature={temperature}, Humidity={humidity}")
                else:
                    # Print other lines as debug info without flagging as invalid
                    print(f"Debug: {line}")
            except ValueError as e:
                print(f"Error parsing data: {e}, Data: {line}")

        time.sleep(1)

if __name__ == "__main__":
    read_from_serial()
