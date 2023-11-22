import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPost } from '../../components/models';
import { pokemonAPI } from '../../services/pokemonAPI';

interface ISomeState {
  posts: IPost[];
  loading: boolean;
  status: string;
}

const initialState: ISomeState = {
  status: '',
  posts: [],
  loading: true,
};

export const pokemonSlice = createSlice({
  name: 'different',
  initialState,
  reducers: {
    updateItems(state, action: PayloadAction<IPost[]>) {
      state.posts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      pokemonAPI.endpoints.getAllCards.matchPending,
      (state) => {
        state.status = 'loading';
        state.loading = true;
      }
    );
    builder.addMatcher(
      pokemonAPI.endpoints.getAllCards.matchFulfilled,
      (state, action) => {
        state.status = 'success';
        state.posts = action.payload.results;
        state.loading = false;
      }
    );
    builder.addMatcher(
      pokemonAPI.endpoints.getAllCards.matchRejected,
      (state) => {
        state.status = 'failed';
        state.posts = [];
        state.loading = false;
      }
    );
  },
});

export const pokemonActions = pokemonSlice.actions;
export const pokemonReducer = pokemonSlice.reducer;
