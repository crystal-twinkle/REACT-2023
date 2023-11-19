import { MemoryRouter } from 'react-router-dom';
import React, { PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { setupStore, RootState, AppStore } from '../store/store';
import { configureStore, PreloadedState } from '@reduxjs/toolkit';
import type { RenderOptions } from '@testing-library/react';
import { searchReducer } from '../store/reducers/searchSlice';

const searchState = {
  search: {
    query: localStorage.getItem('search') || '',
    isSearch: !!localStorage.getItem('search'),
  },
};

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
  ...searchState,
  some: {
    posts: [],
    loadingAllCards: true,
    loadingDetailedCard: true,
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

const searchSetupStore = (
  preloadedState?: { search?: { query: string; isSearch: boolean } } | undefined
) => {
  return configureStore({
    reducer: { search: searchReducer },
    preloadedState,
  });
};

interface ExtendedRenderOptionSome extends Omit<RenderOptions, 'queries'> {
  preloadedState?: typeof searchState;
  store?: ReturnType<typeof searchSetupStore>;
}

export function renderWithProviderSearch(
  ui: React.ReactElement,
  {
    preloadedState = searchState,
    store = searchSetupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptionSome = {}
) {
  function Wrapper({ children }: PropsWithChildren) {
    return (
      <Provider store={store}>
        <MemoryRouter>{children}</MemoryRouter>
      </Provider>
    );
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
