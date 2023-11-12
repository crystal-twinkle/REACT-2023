import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Search from '../components/Search';
import WrapperMock from './mockWrapper.test';

const SearchWrapper = () => {
  return (
    <WrapperMock>
      <Search />
    </WrapperMock>
  );
};

describe('Search component', () => {
  it('handles input changes and clicking search button', () => {
    render(<SearchWrapper />);
    const inputElement = screen.getByRole('textbox');
    const searchButton = screen.getByText('search');
    fireEvent.change(inputElement, { target: { value: 'Search query' } });
    screen.debug();
    expect(inputElement).toHaveValue('Search query');
    fireEvent.click(searchButton);
  });

  it('Clicking the Search button saves the entered value to the local storage', async () => {
    render(<SearchWrapper />);

    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: 'test local save' } });

    const localSave = localStorage.getItem('search');
    expect(localSave).toBe('test local save');
  });

  it('Check that the component retrieves the value from the local storage upon mounting', async () => {
    const ls = localStorage.getItem('search');
    expect(ls).toBe('test local save');

    render(<SearchWrapper />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveValue('test local save');
  });
});
