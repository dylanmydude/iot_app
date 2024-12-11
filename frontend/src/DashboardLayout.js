import React, { useState } from 'react';
import ArduinoReadings from './ArduinoReadings';

const DashboardLayout = () => {
    const [temperature, setTemperature] = useState(null);
    const [humidity, setHumidity] = useState(null);

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
                    <div className="p-2 text-2xl text-white">Graph</div>
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
