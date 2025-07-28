import React from 'react';
import { render, screen } from '@testing-library/react';
import CurrentWeatherCard from '@/components/CurrentWeatherCard';

describe('CurrentWeatherCard', () => {
  const mockProps = {
    city: 'London',
    temperature: 25,
    description: 'sunny',
    iconUrl: 'https://example.com/icon.png'
  };

  it('renders city name', () => {
    render(<CurrentWeatherCard {...mockProps} />);
    expect(screen.getByText('London')).toBeInTheDocument();
  });

  it('renders temperature with celsius unit', () => {
    render(<CurrentWeatherCard {...mockProps} />);
    expect(screen.getByText('25°C')).toBeInTheDocument();
  });

  it('renders weather description', () => {
    render(<CurrentWeatherCard {...mockProps} />);
    expect(screen.getByText('sunny')).toBeInTheDocument();
  });

  it('renders weather icon with correct alt text', () => {
    render(<CurrentWeatherCard {...mockProps} />);
    const icon = screen.getByAltText('sunny');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('src', 'https://example.com/icon.png');
  });

  it('capitalizes description text with CSS', () => {
    render(<CurrentWeatherCard {...mockProps} />);
    const description = screen.getByText('sunny');
    expect(description).toHaveClass('capitalize');
  });
});
