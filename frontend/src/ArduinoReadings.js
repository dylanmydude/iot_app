import React, { useEffect, useState } from 'react';

const ArduinoReadings = ({ onUpdateTemperature, onUpdateHumidity }) => {
    const [reading, setReading] = useState({ temperature: null, humidity: null, timestamp: null });

    useEffect(() => {
        const fetchReading = () => {
            fetch('/reading/')
                .then(response => response.json())
                .then(data => {
                    setReading({
                        temperature: data.temperature,
                        humidity: data.humidity,
                        timestamp: data.timestamp,
                    });
                    if (onUpdateTemperature) {
                        onUpdateTemperature(data.temperature); // Update temperature in the parent
                    }
                    if (onUpdateHumidity) {
                        onUpdateHumidity(data.humidity); // Update humidity in the parent
                    }
                })
                .catch(error => console.error('Error fetching data:', error));
        };

        fetchReading(); // Fetch immediately on component mount
        const intervalId = setInterval(fetchReading, 10000); // Refresh every 10 seconds

        return () => clearInterval(intervalId); // Cleanup
    }, [onUpdateTemperature, onUpdateHumidity]);

    return null; // This component now only handles data fetching
};

export default ArduinoReadings;
