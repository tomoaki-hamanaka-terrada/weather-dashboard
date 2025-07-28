export interface WeatherResponse {
  current: {
    temperature: number;
    description: string;
    iconUrl: string;
  };
  forecast: {
    date: string;
    minTemp: number;
    maxTemp: number;
    iconUrl: string;
  }[];
}

export interface OpenWeatherCurrentResponse {
  main: { temp: number };
  weather: { description: string; icon: string }[];
  name: string;
}

export interface OpenWeatherForecastResponse {
  list: {
    dt: number;
    main: { temp_min: number; temp_max: number };
    weather: { icon: string }[];
  }[];
}

export async function getWeatherByCity(city: string): Promise<WeatherResponse> {
  const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch weather data: ${response.statusText}`);
  }
  return response.json();
}

export async function getWeatherByCoords(lat: number, lon: number): Promise<WeatherResponse> {
  const response = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch weather data: ${response.statusText}`);
  }
  return response.json();
}
