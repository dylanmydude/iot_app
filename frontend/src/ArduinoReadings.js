// src/ArduinoReadings.js
import React, { useEffect, useState } from 'react';

const ArduinoReadings = () => {
    const [reading, setReading] = useState({ temperature: null, humidity: null, timestamp: null });
    const [debug, setDebug] = useState('Loading...');

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
                    setDebug(data.debug || 'No debug info available');
                })
                .catch(error => console.error('Error:', error));
        };

        fetchReading(); // Fetch reading immediately on component mount
        const intervalId = setInterval(fetchReading, 10000); // Fetch reading every 10 seconds

        return () => clearInterval(intervalId); // Clean up the interval on component unmount
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold text-indigo-400">Arduino Reading:</h1>
            <p id="reading" className="text-lg text-gray-300">
                Temperature: {reading.temperature}°C, Humidity: {reading.humidity}%, Timestamp: {reading.timestamp}
            </p>
            <p id="debug" className="text-lg text-gray-300">{debug}</p>
        </div>
    );
};

export default ArduinoReadings;
