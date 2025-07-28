'use client';

import React, { useState } from 'react';
import SearchForm from '@/components/SearchForm';
import CurrentWeatherCard from '@/components/CurrentWeatherCard';
import ForecastList from '@/components/ForecastList';
import { getWeatherByCity, WeatherResponse } from '@/lib/weather';

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchedCity, setSearchedCity] = useState<string>('');

  const handleSearch = async (city: string) => {
    setLoading(true);
    setError(null);
    setSearchedCity(city);

    try {
      const data = await getWeatherByCity(city);
      setWeatherData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Weather Dashboard
        </h1>

        <SearchForm onSearch={handleSearch} loading={loading} />

        {loading && (
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <p className="mt-2 text-gray-600">Loading weather data...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <p className="font-bold">Error:</p>
            <p>{error}</p>
          </div>
        )}

        {weatherData && !loading && (
          <div>
            <CurrentWeatherCard
              city={searchedCity}
              temperature={weatherData.current.temperature}
              description={weatherData.current.description}
              iconUrl={weatherData.current.iconUrl}
            />
            <ForecastList forecast={weatherData.forecast} />
          </div>
        )}

        {!weatherData && !loading && !error && (
          <div className="text-center text-gray-600">
            <p>Enter a city name to get started!</p>
          </div>
        )}
      </div>
    </main>
  );
}
