import React from 'react';

interface ForecastItem {
  date: string;
  minTemp: number;
  maxTemp: number;
  iconUrl: string;
}

interface ForecastListProps {
  forecast: ForecastItem[];
}

export default function ForecastList({ forecast }: ForecastListProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">5-Day Forecast</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
        {forecast.map((item, index) => (
          <div
            key={index}
            className="text-center p-4 border border-gray-200 rounded-lg"
          >
            <div className="text-sm text-gray-600 mb-2">
              {item.date}
            </div>
            <img
              src={item.iconUrl}
              alt="Weather icon"
              className="w-12 h-12 mx-auto mb-2"
            />
            <div className="text-sm">
              <div className="font-semibold text-gray-800">
                {item.maxTemp}°
              </div>
              <div className="text-gray-600">
                {item.minTemp}°
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
