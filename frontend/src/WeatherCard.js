import React, { useState, useEffect } from "react";

const WeatherCard = () => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/weather/?city=Johannesburg");
                if (!response.ok) {
                    throw new Error("Failed to fetch weather data");
                }
                const data = await response.json();
                setWeather(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, []);

    return (
        <div className="backdrop-blur-md bg-black/20 border border-gray-800/20 shadow-md rounded-lg col-span-3 row-span-2 p-2 flex items-center justify-center">
            {loading ? (
                <div className="text-white text-xl">Loading...</div>
            ) : error ? (
                <div className="text-red-500 text-xl">Error: {error}</div>
            ) : (
                <div className="text-white text-center">
                    <h2 className="text-2xl mb-2">Weather in {weather.city}</h2>
                    <p>Temperature: {weather.temperature}°C</p>
                    <p>Description: {weather.description}</p>
                    <p>Humidity: {weather.humidity}%</p>
                    <p>Wind Speed: {weather.wind_speed} m/s</p>
                </div>
            )}
        </div>
    );
};

export default WeatherCard;
