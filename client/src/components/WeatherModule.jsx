import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './WeatherModule.css';

const WeatherModule = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchWeather = async () => {
            setIsLoading(true);
            setError('');
            try {
                // CRA Proxy handles routing /api/weather to the backend
                const response = await axios.get('https://infohub-challenge-2-7bra.onrender.com/api/weather'); 
                setWeatherData(response.data);
            } catch (err) {
                const message = err.response?.data?.error || 'Failed to connect to the weather service.';
                setError(message);
                setWeatherData(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchWeather();
    }, []);

    if (isLoading) {
        return <div className="loading-message">Loading Weather... 🌤️</div>;
    }

    if (error) {
        return (
            <div className="error-box">
                <p><strong>Error Fetching Weather 🛑</strong></p>
                <p>{error}</p>
            </div>
        );
    }

    if (!weatherData) return null;

    const iconUrl = `https://openweathermap.org/img/wn/${weatherData.icon}@4x.png`;

    return (
        <div className="weather-card">
            <h2>Weather in {weatherData.city}, {weatherData.country}</h2>
            <div className="weather-data-row">
                <img src={iconUrl} alt={weatherData.description} style={{ width: '120px', height: '120px' }} />
                <p className="weather-temp">
                    {weatherData.temperature}°C
                </p>
            </div>
            <p className="weather-description">
                {weatherData.description}
            </p>
        </div>
    );
};

export default WeatherModule;