import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Search from '../components/Search';
import { vi } from 'vitest';

describe('Search component', () => {
  it('renders correctly', () => {
    render(<Search title="Search Title" inputSearch={() => {}} />);

    const titleElement = screen.getByText('Search Title');
    const inputElement = screen.getByPlaceholderText('');
    const searchButton = screen.getByText('search');

    expect(titleElement).toBeInTheDocument();
    expect(inputElement).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });

  it('handles input changes and clicking search button', () => {
    const inputSearchMock = vi.fn();
    render(<Search title="Search Title" inputSearch={inputSearchMock} />);
    const inputElement = screen.getByRole('textbox');
    const searchButton = screen.getByText('search');
    fireEvent.change(inputElement, { target: { value: 'Search query' } });
    expect(inputElement).toHaveValue('Search query');
    fireEvent.click(searchButton);
    expect(inputSearchMock).toHaveBeenCalledWith('Search query');
  });
});
