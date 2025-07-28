import { getWeatherByCity, getWeatherByCoords } from '@/lib/weather';

global.fetch = jest.fn();

describe('Weather API functions', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  describe('getWeatherByCity', () => {
    it('should fetch weather data for a city', async () => {
      const mockResponse = {
        current: {
          temperature: 25,
          description: 'sunny',
          iconUrl: 'https://example.com/icon.png'
        },
        forecast: [
          {
            date: '2023-01-01',
            minTemp: 20,
            maxTemp: 30,
            iconUrl: 'https://example.com/icon.png'
          }
        ]
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await getWeatherByCity('London');

      expect(fetch).toHaveBeenCalledWith('/api/weather?city=London');
      expect(result).toEqual(mockResponse);
    });

    it('should throw error when fetch fails', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        statusText: 'Not Found',
      });

      await expect(getWeatherByCity('InvalidCity')).rejects.toThrow(
        'Failed to fetch weather data: Not Found'
      );
    });
  });

  describe('getWeatherByCoords', () => {
    it('should fetch weather data for coordinates', async () => {
      const mockResponse = {
        current: {
          temperature: 22,
          description: 'cloudy',
          iconUrl: 'https://example.com/icon.png'
        },
        forecast: []
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await getWeatherByCoords(51.5074, -0.1278);

      expect(fetch).toHaveBeenCalledWith('/api/weather?lat=51.5074&lon=-0.1278');
      expect(result).toEqual(mockResponse);
    });
  });
});
