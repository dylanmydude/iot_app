import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import ArduinoReadings from './ArduinoReadings';
import WeatherCard from "./WeatherCard";
import Timeline from './Timeline';

const DashboardLayout = () => {
    const [temperature, setTemperature] = useState(null);
    const [humidity, setHumidity] = useState(null);

    // Historical data
    const [temperatureHistory, setTemperatureHistory] = useState([]);
    const [humidityHistory, setHumidityHistory] = useState([]);
    const [timeStamps, setTimeStamps] = useState([]);
    // const [timeStamps, setTimeStamps] = useState([]);

    const fetchHistory = async (timeRange = '24hrs') => {
        try {
            const response = await fetch(`/api/readings/history/?time_range=${timeRange}`);
            const sensors = await response.json();
    
            // Filter temperature and humidity data
            const tempSensor = sensors.find(sensor => sensor.sensor_type === 'temperature');
            const humiditySensor = sensors.find(sensor => sensor.sensor_type === 'humidity');
    
            setTemperatureHistory(tempSensor ? tempSensor.readings.map(r => r.value) : []);
            setHumidityHistory(humiditySensor ? humiditySensor.readings.map(r => r.value) : []);
            setTimeStamps(tempSensor ? tempSensor.readings.map(r => new Date(r.timestamp).toLocaleTimeString()) : []);
    
            console.log(`Fetched data for: ${timeRange}`, sensors);
        } catch (error) {
            console.error('Error fetching historical data:', error);
        }
    };

     // Fetch live readings
     const fetchLiveReadings = async () => {
        try {
            const response = await fetch('/api/readings/');
            const data = await response.json();

            setTemperature(data.temperature);
            setHumidity(data.humidity);

            console.log('Fetched live readings:', data);
        } catch (error) {
            console.error('Error fetching live readings:', error);
        }
    };

    // Initial data fetch
    useEffect(() => {
        fetchHistory();
    }, []);

    // Fetch live readings every 10 seconds
    useEffect(() => {
        fetchLiveReadings(); // Fetch initial readings
        const interval = setInterval(fetchLiveReadings, 10000); // Poll every 10 seconds
        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    // live updates
    useEffect(() => {
        if (temperature !== null && humidity !== null) {
            setTemperatureHistory(prev => [...prev, temperature].slice(-100));
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
                    <div className="p-2 text-2xl text-white">450 lx</div>
                </div>
                <div className="backdrop-blur-md bg-black/20 border border-gray-800/20 shadow-md rounded-lg flex items-center justify-center">
                    <div className="p-2 text-2xl text-white">+</div>
                </div>
               
                <div className="backdrop-blur-xl bg-black/20 border border-gray-800/20 shadow-md rounded-lg col-span-4 row-span-2 p-2 flex flex-col">
                    {/* Buttons and Legend Row */}
                    <div className="flex justify-between items-center mb-2">
                        {/* Legend and Buttons in Flex */}
                        <div className="flex items-center space-x-8">
                            {/* Plotly Legend Title */}
                            <div className="flex items-center space-x-4">
                                {/* <span className="text-white text-sm">Legend:</span> */}
                                <div className="flex space-x-2">
                                    <div className="flex items-center">
                                        <div className="w-4 h-1 bg-red-600 mr-1"></div>
                                        <span className="text-white text-xs">Temp</span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-4 h-1 bg-blue-600 mr-1"></div>
                                        <span className="text-white text-xs">RH</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Time Range Buttons */}
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => fetchHistory('1hr')}
                                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs">
                                1 Hour
                            </button>
                            <button
                                onClick={() => fetchHistory('8hrs')}
                                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs">
                                8 Hours
                            </button>
                            <button
                                onClick={() => fetchHistory('24hrs')}
                                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs">
                                1 Day
                            </button>
                            <button
                                onClick={() => fetchHistory('7d')}
                                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs">
                                1 Week
                            </button>
                            <button
                                onClick={() => fetchHistory('1m')}
                                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs">
                                1 Month
                            </button>
                        </div>

                    </div>

                    {/* Graph */}
                    <div className="w-full h-full">
                        <Plot
                            data={[
                                {
                                    x: timeStamps.slice(-50),
                                    y: temperatureHistory.slice(-50),
                                    name: 'Temp',
                                    type: 'scatter',
                                    mode: 'lines',
                                    line: { color: 'rgba(255, 0, 0, 0.8)', width: 2 },
                                },
                                {
                                    x: timeStamps.slice(-50),
                                    y: humidityHistory.slice(-50),
                                    name: 'RH',
                                    type: 'scatter',
                                    mode: 'lines',
                                    line: { color: 'rgba(0, 0, 255, 0.8)', width: 2 },
                                },
                            ]}
                            layout={{
                                autosize: true,
                                paper_bgcolor: 'transparent',
                                plot_bgcolor: 'transparent',
                                font: { color: 'rgba(225, 225, 225, 0.8)' },
                                margin: { l: 20, r: 20, t: 20, b: 20 },
                                showlegend: false, 
                                xaxis: {
                                    showgrid: true,
                                    gridcolor: 'rgba(200, 200, 200, 0.4)',
                                    gridwidth: 1,
                                    griddash: 'dot',
                                    showticklabels: true,
                                    tickformat: '%H:%M',
                                    // tickangle: 45,
                                },
                                yaxis: {
                                    showgrid: true,
                                    gridcolor: 'rgba(200, 200, 200, 0.4)',
                                    gridwidth: 1,
                                    griddash: 'dot',
                                    showticklabels: true,
                                },
                            }}
                            config={{
                                responsive: true,
                                displayModeBar: false,
                            }}
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
            <div className="backdrop-blur-md bg-black/20 border border-gray-800/20 shadow-md rounded-lg col-span-5 row-span-1 p-2">
                <div className="relative w-full h-16">
                    {/* Horizontal Line */}
                    <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/50 -translate-y-1/2"></div>

                    {/* Event Dots */}
                    {[
                        { position: 10, annotation: 'Planted seeds' },
                        { position: 50, annotation: 'Watered plants' },
                        { position: 80, annotation: 'Fertilisation applied' },
                    ].map((event, index) => (
                        <div
                            key={index}
                            className="absolute w-4 h-4 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 hover:scale-150 transition-transform duration-200"
                            style={{
                                left: `${event.position}%`,
                                top: '50%',
                            }}
                            title={event.annotation}
                        ></div>
                    ))}
                </div>
            </div>

            {/* Weather API Card */}
            <WeatherCard />

            {/* Vision AI Card */}
            <div className="backdrop-blur-md bg-black/20 border border-gray-800/20 shadow-md rounded-lg col-span-2 row-span-2 p-2 flex items-center justify-center">
                <div className="text-2xl text-white">Vision AI</div>
            </div>
        </div>
    );
};

export default DashboardLayout;
