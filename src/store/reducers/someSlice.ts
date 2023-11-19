import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPost } from '../../components/models';

interface ISomeState {
  posts: IPost[];
  loadingAllCards: boolean;
  loadingDetailedCard: boolean;
}

export const initialState: ISomeState = {
  posts: [],
  loadingAllCards: true,
  loadingDetailedCard: true,
};

export const someSlice = createSlice({
  name: 'different',
  initialState,
  reducers: {
    updateItems(state, action: PayloadAction<IPost[]>) {
      state.posts = action.payload;
    },
    updateLoadingAll(state, action: PayloadAction<boolean>) {
      state.loadingAllCards = action.payload;
    },
    updateLoadingDetail(state, action: PayloadAction<boolean>) {
      state.loadingDetailedCard = action.payload;
    },
  },
});

export const someActions = someSlice.actions;
export const someReducer = someSlice.reducer;
