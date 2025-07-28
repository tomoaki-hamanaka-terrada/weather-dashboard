import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchForm from '@/components/SearchForm';

describe('SearchForm', () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    mockOnSearch.mockClear();
  });

  it('renders search input and button', () => {
    render(<SearchForm onSearch={mockOnSearch} loading={false} />);
    
    expect(screen.getByPlaceholderText('Enter city name...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  it('calls onSearch when form is submitted with city name', () => {
    render(<SearchForm onSearch={mockOnSearch} loading={false} />);
    
    const input = screen.getByPlaceholderText('Enter city name...');
    const button = screen.getByRole('button', { name: 'Search' });

    fireEvent.change(input, { target: { value: 'London' } });
    fireEvent.click(button);

    expect(mockOnSearch).toHaveBeenCalledWith('London');
  });

  it('trims whitespace from city name', () => {
    render(<SearchForm onSearch={mockOnSearch} loading={false} />);
    
    const input = screen.getByPlaceholderText('Enter city name...');
    const button = screen.getByRole('button', { name: 'Search' });

    fireEvent.change(input, { target: { value: '  Paris  ' } });
    fireEvent.click(button);

    expect(mockOnSearch).toHaveBeenCalledWith('Paris');
  });

  it('disables input and button when loading', () => {
    render(<SearchForm onSearch={mockOnSearch} loading={true} />);
    
    const input = screen.getByPlaceholderText('Enter city name...');
    const button = screen.getByRole('button', { name: 'Searching...' });

    expect(input).toBeDisabled();
    expect(button).toBeDisabled();
  });

  it('does not submit empty or whitespace-only input', () => {
    render(<SearchForm onSearch={mockOnSearch} loading={false} />);
    
    const button = screen.getByRole('button', { name: 'Search' });

    fireEvent.click(button);
    expect(mockOnSearch).not.toHaveBeenCalled();

    const input = screen.getByPlaceholderText('Enter city name...');
    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.click(button);
    
    expect(mockOnSearch).not.toHaveBeenCalled();
  });
});
