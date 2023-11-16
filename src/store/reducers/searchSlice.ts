import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface appState {
  query: string;
}

const initialState: appState = {
  query: localStorage.getItem('search') || '',
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    updateSearchQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
  },
});

export const searchActions = searchSlice.actions;
export const searchReducer = searchSlice.reducer;
