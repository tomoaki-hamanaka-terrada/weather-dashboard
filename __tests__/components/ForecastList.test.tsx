import React from 'react';
import { render, screen } from '@testing-library/react';
import ForecastList from '@/components/ForecastList';

describe('ForecastList', () => {
  const mockForecast = [
    {
      date: '2023-01-01',
      minTemp: 15,
      maxTemp: 25,
      iconUrl: 'https://example.com/icon1.png'
    },
    {
      date: '2023-01-02',
      minTemp: 18,
      maxTemp: 28,
      iconUrl: 'https://example.com/icon2.png'
    }
  ];

  it('renders forecast title', () => {
    render(<ForecastList forecast={mockForecast} />);
    expect(screen.getByText('5-Day Forecast')).toBeInTheDocument();
  });

  it('renders all forecast items', () => {
    render(<ForecastList forecast={mockForecast} />);
    
    expect(screen.getByText('2023-01-01')).toBeInTheDocument();
    expect(screen.getByText('2023-01-02')).toBeInTheDocument();
  });

  it('renders temperature ranges correctly', () => {
    render(<ForecastList forecast={mockForecast} />);
    
    expect(screen.getByText('25°')).toBeInTheDocument();
    expect(screen.getByText('15°')).toBeInTheDocument();
    expect(screen.getByText('28°')).toBeInTheDocument();
    expect(screen.getByText('18°')).toBeInTheDocument();
  });

  it('renders weather icons', () => {
    render(<ForecastList forecast={mockForecast} />);
    
    const icons = screen.getAllByAltText('Weather icon');
    expect(icons).toHaveLength(2);
    expect(icons[0]).toHaveAttribute('src', 'https://example.com/icon1.png');
    expect(icons[1]).toHaveAttribute('src', 'https://example.com/icon2.png');
  });

  it('renders empty forecast list', () => {
    render(<ForecastList forecast={[]} />);
    expect(screen.getByText('5-Day Forecast')).toBeInTheDocument();
  });
});
