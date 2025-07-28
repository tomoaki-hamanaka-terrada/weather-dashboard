# Weather Dashboard

A modern weather dashboard built with Next.js and TypeScript that displays current weather and 5-day forecasts using the OpenWeatherMap API.

## Features

- Current weather display with temperature, description, and weather icon
- 5-day weather forecast
- Responsive design with Tailwind CSS
- TypeScript for type safety
- Comprehensive testing with Jest and React Testing Library
- CI/CD with GitHub Actions

## Setup Instructions

1. Clone the repository
   ```bash
   git clone https://github.com/tomoaki-hamanaka-terrada/weather-dashboard.git
   cd weather-dashboard
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create `.env.local` file with your OpenWeatherMap API key:
   ```
   OPENWEATHER_API_KEY=your_api_key_here
   ```

4. Get your API key from [OpenWeatherMap](https://openweathermap.org/api)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode

## API Usage

The application uses the OpenWeatherMap API to fetch:
- Current weather data
- 5-day/3-hour forecast data

API endpoints:
- `/api/weather?city=CityName` - Get weather by city name
- `/api/weather?lat=LAT&lon=LON` - Get weather by coordinates

## Project Structure

```
src/
├── app/
│   ├── api/weather/          # API routes
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Home page
├── components/               # React components
│   ├── CurrentWeatherCard.tsx
│   ├── ForecastList.tsx
│   └── SearchForm.tsx
└── lib/                      # Utility functions and data layer
    └── weather.ts
__tests__/                    # Test files
├── components/
├── lib/
└── api/
```

## Environment Variables

- `OPENWEATHER_API_KEY` - Your OpenWeatherMap API key (required)

## Technologies Used

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Testing**: Jest + React Testing Library
- **Linting**: ESLint
- **Formatting**: Prettier
- **CI/CD**: GitHub Actions

## Getting Started

1. Follow the setup instructions above
2. Start the development server with `npm run dev`
3. Open [http://localhost:3000](http://localhost:3000) in your browser
4. Enter a city name to search for weather data

## Testing

Run the test suite:
```bash
npm test
```

Run tests in watch mode during development:
```bash
npm run test:watch
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License.
