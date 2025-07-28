import { NextRequest, NextResponse } from 'next/server';

const API_KEY = process.env.OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city');
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');

  if (!API_KEY) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
  }

  try {
    let currentWeatherUrl: string;
    let forecastUrl: string;

    if (city) {
      currentWeatherUrl = `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
      forecastUrl = `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
    } else if (lat && lon) {
      currentWeatherUrl = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
      forecastUrl = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    } else {
      return NextResponse.json({ error: 'City name or coordinates required' }, { status: 400 });
    }

    const [currentResponse, forecastResponse] = await Promise.all([
      fetch(currentWeatherUrl),
      fetch(forecastUrl)
    ]);

    if (!currentResponse.ok || !forecastResponse.ok) {
      return NextResponse.json({ error: 'Failed to fetch weather data' }, { status: 500 });
    }

    const currentData = await currentResponse.json();
    const forecastData = await forecastResponse.json();

    const response = {
      current: {
        temperature: Math.round(currentData.main.temp),
        description: currentData.weather[0].description,
        iconUrl: `https://openweathermap.org/img/wn/${currentData.weather[0].icon}@2x.png`
      },
      forecast: forecastData.list
        .filter((_: unknown, index: number) => index % 8 === 0)
        .slice(0, 5)
        .map((item: { dt: number; main: { temp_min: number; temp_max: number }; weather: { icon: string }[] }) => ({
          date: new Date(item.dt * 1000).toLocaleDateString(),
          minTemp: Math.round(item.main.temp_min),
          maxTemp: Math.round(item.main.temp_max),
          iconUrl: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`
        }))
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Weather API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
