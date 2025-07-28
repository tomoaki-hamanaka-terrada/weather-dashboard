import React from 'react';

interface CurrentWeatherCardProps {
  city: string;
  temperature: number;
  description: string;
  iconUrl: string;
}

export default function CurrentWeatherCard({
  city,
  temperature,
  description,
  iconUrl
}: CurrentWeatherCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{city}</h2>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-4xl font-bold text-blue-600 mb-2">
            {temperature}°C
          </div>
          <div className="text-gray-600 capitalize">
            {description}
          </div>
        </div>
        <div className="flex-shrink-0">
          <img
            src={iconUrl}
            alt={description}
            className="w-20 h-20"
          />
        </div>
      </div>
    </div>
  );
}
