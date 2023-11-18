import React, { useState } from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import Main from '../pages/Main';
import { vi } from 'vitest';
import { renderWithProviders } from './test-utils';

import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

const server = setupServer(
  http.get('https://pokeapi.co/api/v2/pokemon', ({}) => {
    return HttpResponse.json({
      count: 1200,
      results: [
        { name: 'Bulbasaur' },
        { name: 'Charmander' },
        { name: 'Pikachu' },
        { name: 'ivysaur' },
      ],
    });
  }),
  http.get('https://pokeapi.co/api/v2/pokemon/bulbasaur', ({}) => {
    return HttpResponse.json({ name: 'Bulbasaur' });
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const mockSetUrlPageString = vi.fn();

let mockSearchParam: { page: string } = { page: '1' };

vi.mock('react-router-dom', async () => {
  const actual: object = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useSearchParams: () => {
      const [params, setParams] = useState(
        new URLSearchParams(mockSearchParam)
      );

      return [
        params,
        (newParams: { page: string }) => {
          setParams(new URLSearchParams(newParams));
          mockSearchParam = newParams;
          mockSetUrlPageString(newParams);
        },
      ];
    },
  };
});

const mainCall = () => {
  return renderWithProviders(<Main />);
};

describe('Main Component', () => {
  it('renders with default values', async () => {
    mainCall();

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).toBeNull();
    });
    expect(screen.getByText('List')).toBeInTheDocument();
    expect(screen.getByText('Write something')).toBeInTheDocument();
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
  });

  it('check click on arrows', async () => {
    mainCall();
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).toBeNull();
    });
    const rightButton = await screen.getByText('>');
    fireEvent.click(rightButton);
    expect(mockSearchParam).toContain({ page: '2' });
    const leftButton = await screen.getByText('<');
    fireEvent.click(leftButton);
    expect(mockSearchParam).toContain({ page: '1' });
  });

  it('check click on Set posts button', async () => {
    renderWithProviders(<Main />);
    mockSearchParam = { page: '35' };
    const setPostsButton = await screen.findByText('Set Posts');
    fireEvent.click(setPostsButton);
    expect(mockSearchParam).toContain({ page: '1' });
    expect(mockSetUrlPageString).toHaveBeenCalledWith({ page: '1' });
  });

  it('handles search input', async () => {
    mainCall();
    const input = screen.getByRole('textbox');
    const searchButton = screen.getByText('search');
    fireEvent.change(input, { target: { value: 'ivysaur' } });
    fireEvent.click(searchButton);
    expect(await screen.findByText('ivysaur')).toBeInTheDocument();
  });

  it('click on Generate Error', async () => {
    mainCall();

    const errorBtn = screen.getByText('Generate Error');
    expect(() => fireEvent.click(errorBtn)).toThrow('Test error');
  });
});
