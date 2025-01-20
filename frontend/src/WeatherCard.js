import React, { useState, useEffect } from "react";

const WeatherCard = () => {
    const [city, setCity] = useState("Johannesburg"); // Default city
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchWeather = async (selectedCity) => {
        try {
            setLoading(true);
            const response = await fetch(`http://127.0.0.1:8000/weather/?city=${selectedCity}`);
            if (!response.ok) {
                throw new Error("Failed to fetch weather data");
            }
            const data = await response.json();
            setWeather(data);
            setError(null);
        } catch (err) {
            setError(err.message);
            setWeather(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWeather(city); // Fetch weather for the default or updated city
    }, [city]);

    return (
        <div className="backdrop-blur-md bg-black/20 border border-gray-800/20 shadow-md rounded-lg col-span-3 row-span-2 p-4">
            <div className="text-white mb-4">
                <input
                    id="city"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city name"
                    className="p-2 rounded-md w-full bg-gray-800 text-white"
                />
            </div>
            {loading ? (
                <div className="text-white text-xl">Loading...</div>
            ) : error ? (
                <div className="text-red-500 text-xl">Error: {error}</div>
            ) : weather ? (
                <div className="text-white text-center">
                    <p>Temperature: {weather.temperature}°C</p>
                    <p>Description: {weather.description}</p>
                    <p>Humidity: {weather.humidity}%</p>
                    <p>Wind Speed: {weather.wind_speed} m/s</p>
                </div>
            ) : null}
        </div>
    );
};

export default WeatherCard;
