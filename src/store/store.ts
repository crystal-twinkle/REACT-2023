import {
  PreloadedState,
  configureStore,
  combineReducers,
} from '@reduxjs/toolkit';
import { searchReducer } from './reducers/searchSlice';
import { pokemonAPI } from '../services/pokemonAPI';
import { pokemonReducer } from './reducers/pokemonSlice';
import {createWrapper} from 'next-redux-wrapper';
import {setupListeners} from '@reduxjs/toolkit/query';

const rootReducer = combineReducers({
  [pokemonAPI.reducerPath]: pokemonAPI.reducer,
  search: searchReducer,
  pokemon: pokemonReducer,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonAPI.middleware),
});

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      }).concat(pokemonAPI.middleware),
    preloadedState,
  });
}

const setupStore2 = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(pokemonAPI.middleware),
  });
};
setupListeners(store.dispatch);
export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<typeof rootReducer>;
export const wrapper = createWrapper<AppStore>(setupStore2, { debug: true });
export default store;
