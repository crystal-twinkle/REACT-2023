import { MemoryRouter } from 'react-router-dom';
import React, { PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { setupStore, RootState, AppStore } from '../store/store';
import { PreloadedState } from '@reduxjs/toolkit';
import type { RenderOptions } from '@testing-library/react';

export const mockPosts = [
  { name: 'Bulbasaur' },
  { name: 'Charmander' },
  { name: 'Pikachu' },
  { name: 'ivysaur' },
];

const defaultState: PreloadedState<RootState> = {
  PokemonAPI: {
    queries: {},
    mutations: {},
    provided: {},
    subscriptions: {},
    config: {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
      refetchOnFocus: true,
      reducerPath: 'PokemonAPI',
      online: true,
      focused: true,
      middlewareRegistered: true,
      keepUnusedDataFor: 60,
    },
  },
  search: {
    query: localStorage.getItem('search') || '',
    isSearch: !!localStorage.getItem('search'),
  },
  pokemon: {
    error: false,
    status: '',
    posts: [],
    loading: false,
  },
};

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = defaultState,
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren) {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/?name=Pikachu`]}>
          {children}
        </MemoryRouter>
      </Provider>
    );
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
