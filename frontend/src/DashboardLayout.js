import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import ArduinoReadings from './ArduinoReadings';

const DashboardLayout = () => {
    const [temperature, setTemperature] = useState(null);
    const [humidity, setHumidity] = useState(null);

    // Historical data from the backend
    const [temperatureHistory, setTemperatureHistory] = useState([]);
    const [humidityHistory, setHumidityHistory] = useState([]);
    const [timeStamps, setTimeStamps] = useState([]);

    // Fetch historical data from the backend on component mount
    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await fetch('/api/readings/history/');
                const data = await response.json();

                setTemperatureHistory(data.temperature.reverse());
                setHumidityHistory(data.humidity.reverse());
                setTimeStamps(data.timestamps.reverse());
            } catch (error) {
                console.error('Error fetching historical data:', error);
            }
        };

        fetchHistory();
    }, []);

    // Update live data with the most recent temperature and humidity values
    useEffect(() => {
        if (temperature !== null && humidity !== null) {
            setTemperatureHistory(prev => [...prev, temperature].slice(-100)); // Keep only the last 100 points
            setHumidityHistory(prev => [...prev, humidity].slice(-100));
            setTimeStamps(prev => [...prev, new Date().toLocaleTimeString()].slice(-100));
        }
    }, [temperature, humidity]);

    return (
        <div className="grid grid-cols-5 grid-rows-6 gap-4 h-full w-full">
            {/* Include ArduinoReadings */}
            <ArduinoReadings
                onUpdateTemperature={setTemperature}
                onUpdateHumidity={setHumidity}
            />

            {/* Left Section: 4 small cards + graph */}
            <div className="col-span-3 row-span-3 grid grid-cols-4 grid-rows-3 gap-4">
                <div className="backdrop-blur-md bg-black/20 border border-gray-800/20 shadow-md rounded-lg flex items-center justify-center">
                    <div className="p-2 text-2xl text-white">
                        {temperature !== null ? `${temperature}°C` : 'Loading...'}
                    </div>
                </div>
                <div className="backdrop-blur-md bg-black/20 border border-gray-800/20 shadow-md rounded-lg flex items-center justify-center">
                    <div className="p-2 text-2xl text-white">
                        {humidity !== null ? `${humidity}% RH` : 'Loading...'}
                    </div>
                </div>

                <div className="backdrop-blur-md bg-black/20 border border-gray-800/20 shadow-md rounded-lg flex items-center justify-center">
                    <div className="p-2 text-2xl text-white">Extra</div>
                </div>
                <div className="backdrop-blur-md bg-black/20 border border-gray-800/20 shadow-md rounded-lg flex items-center justify-center">
                    <div className="p-2 text-2xl text-white">New Card</div>
                </div>
                <div className="backdrop-blur-xl bg-black/20 border border-gray-800/20 shadow-md rounded-lg col-span-4 row-span-2 p-2 flex items-center justify-center">
                    <div className="w-full h-full">
                        <Plot
                            data={[
                                {
                                    x: timeStamps.slice(-100),
                                    y: temperatureHistory.slice(-100),
                                    name: 'Temperature',
                                    type: 'scatter',
                                    mode: 'lines+markers',
                                    marker: { color: 'red' },
                                },
                                {
                                    x: timeStamps.slice(-100),
                                    y: humidityHistory.slice(-100),
                                    name: 'Humidity',
                                    type: 'scatter',
                                    mode: 'lines+markers',
                                    marker: { color: 'blue' },
                                },
                            ]}
                            layout={{
                                autosize: true,
                                title: 'Temperature & Humidity Over Time',
                                paper_bgcolor: 'transparent',
                                plot_bgcolor: 'transparent',
                                font: { color: 'white' },
                                margin: { l: 30, r: 30, t: 30, b: 30 },
                                xaxis: { title: 'Time' },
                                yaxis: { title: 'Value' },
                            }}
                            config={{ responsive: true }}
                            style={{ width: '100%', height: '100%' }}
                        />
                    </div>
                </div>
            </div>

            {/* Notifications Card */}
            <div className="backdrop-blur-md bg-black/20 border border-gray-800/20 shadow-md rounded-lg col-span-2 row-span-3 p-2 flex items-center justify-center">
                <div className="text-2xl text-white">Notifications</div>
            </div>

            {/* Timeline Card */}
            <div className="backdrop-blur-md bg-black/20 border border-gray-800/20 shadow-md rounded-lg col-span-5 row-span-1 p-2 flex items-center justify-center">
                <div className="text-2xl text-white">Timeline</div>
            </div>

            {/* Weather API Card */}
            <div className="backdrop-blur-md bg-black/20 border border-gray-800/20 shadow-md rounded-lg col-span-3 row-span-2 p-2 flex items-center justify-center">
                <div className="text-2xl text-white">Weather API</div>
            </div>

            {/* Vision AI Card */}
            <div className="backdrop-blur-md bg-black/20 border border-gray-800/20 shadow-md rounded-lg col-span-2 row-span-2 p-2 flex items-center justify-center">
                <div className="text-2xl text-white">Vision AI</div>
            </div>
        </div>
    );
};

export default DashboardLayout;
