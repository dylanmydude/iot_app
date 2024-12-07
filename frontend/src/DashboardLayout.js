import React, { useState } from 'react';
import ArduinoReadings from './ArduinoReadings';

const DashboardLayout = () => {
    const [temperature, setTemperature] = useState(null);

    return (
        <div className="grid grid-cols-5 grid-rows-6 gap-4 p-0">
            {/* Include ArduinoReadings to fetch temperature */}
            <ArduinoReadings onUpdateTemperature={setTemperature} />

            {/* Left Section: Display temperature in the "temp" card */}
            <div className="col-span-3 row-span-3 grid grid-rows-3 grid-cols-3 gap-4">
                <div className="bg-white rounded-lg shadow aspect-w-2 aspect-h-1 p-2">
                    <div className="p-2 text-xl font-semibold">
                        {temperature !== null ? `${temperature}°C` : 'Loading...'}
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow aspect-w-2 aspect-h-1 p-2">
                    <div className="p-2">RH</div>
                </div>
                <div className="bg-white rounded-lg shadow aspect-w-2 aspect-h-1 p-2">
                    <div className="p-2">Extra</div>
                </div>
                <div className="col-span-3 row-span-2 bg-white rounded-lg shadow p-2">
                    <div className="p-2">Graph</div>
                </div>
            </div>

            {/* Notifications Card */}
            <div className="col-span-2 row-span-3 bg-white rounded-lg shadow p-2">
                <div className="h-full p-2">Notifications</div>
            </div>

            {/* Timeline Card */}
            <div className="col-span-5 row-span-1 bg-white rounded-lg shadow p-2">
                <div className="p-2">Timeline</div>
            </div>
        </div>
    );
};

export default DashboardLayout;
