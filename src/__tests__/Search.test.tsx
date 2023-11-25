import React from 'react';
import { screen, fireEvent, render } from '@testing-library/react';
import Search from '../components/Search';
import mockRouter from 'next-router-mock';

const searchCall = () => {
  render(<Search />);
};

describe('Search component', () => {
  it('saves the entered value to the local storage', async () => {
    searchCall();
    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: 'test' } });

    const localSave = localStorage.getItem('search');
    expect(localSave).toBe('test');
  });

  it('check local storage value show in input and clicking search button', () => {
    const localSave = localStorage.getItem('search');
    expect(localSave).toBe('test');

    searchCall();
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveValue(localSave);

    const searchButton = screen.getByText('search');
    fireEvent.click(searchButton);
    expect(mockRouter.query).toEqual({ search: 'test' });
  });
});
