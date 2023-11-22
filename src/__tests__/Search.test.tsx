import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import Search from '../components/Search';
import { renderWithProviders } from './test-utils';
import {
  initialState,
  searchActions,
  searchReducer,
} from '../store/reducers/searchSlice';

const searchCall = () => {
  return renderWithProviders(<Search />);
};

describe('Search component', () => {
  it('click search button', () => {
    searchCall();
    const searchButton = screen.getByText('search');
    fireEvent.click(searchButton);
  });

  it('Clicking the Search button saves the entered value to the local storage', async () => {
    searchCall();
    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: 'test local save' } });

    const localSave = localStorage.getItem('search');
    expect(localSave).toBe('test local save');
  });

  it('Should initialize with query from localStorage', async () => {
    const ls = localStorage.getItem('search');
    expect(ls).toBe('test local save');
    const initialSearchState = {
      search: {
        query: ls || '',
        isSearch: !!ls,
      },
    };

    renderWithProviders(<Search />, {
      preloadedState: {
        search: initialSearchState.search,
      },
    });

    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveValue('test local save');
  });

  it('check searchSlice', () => {
    const searchSliceInit = searchReducer(
      initialState,
      searchActions.updateSearchQuery(localStorage.getItem('search') || '')
    );
    const expectedState = {
      isSearch: false,
      query: 'test local save',
    };
    expect(searchSliceInit).toEqual(expectedState);
  });
});
