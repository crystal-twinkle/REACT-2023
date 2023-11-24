import { createSlice } from '@reduxjs/toolkit';
import { IPost } from '../../components/models';
import { pokemonAPI } from '../../services/pokemonAPI';

interface ISomeState {
  posts: IPost[];
  loading: boolean;
  error: boolean;
  status: string;
}

const initialState: ISomeState = {
  status: '',
  posts: [],
  loading: true,
  error: false,
};

export const pokemonSlice = createSlice({
  name: 'different',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      pokemonAPI.endpoints.getAllCards.matchPending,
      (state) => {
        state.status = 'loading';
        state.posts = [];
        state.loading = true;
      }
    );
    builder.addMatcher(
      pokemonAPI.endpoints.getAllCards.matchFulfilled,
      (state, action) => {
        state.status = 'success';
        if (action.payload?.results) {
          state.posts = action.payload.results;
        } else {
          state.posts = [action.payload];
        }
        state.loading = false;
        state.error = false;
      }
    );
    builder.addMatcher(
      pokemonAPI.endpoints.getAllCards.matchRejected,
      (state) => {
        state.status = 'failed';
        state.posts = [];
        state.loading = false;
        state.error = true;
      }
    );
  },
});

export const pokemonActions = pokemonSlice.actions;
export const pokemonReducer = pokemonSlice.reducer;