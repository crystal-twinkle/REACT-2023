// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import {
  initialState,
  someActions,
  someReducer,
} from '../store/reducers/someSlice';

describe('someSlice check', () => {
  it('check updateItems', () => {
    const posts = [
      {
        name: 'charizard',
      },
      {
        name: 'squirtle',
      },
    ];
    const someSliceInit = someReducer(
      initialState,
      someActions.updateItems(posts)
    );
    const expectedState = {
      posts,
      loadingAllCards: true,
      loadingDetailedCard: true,
    };
    expect(someSliceInit).toEqual(expectedState);
  });

  it('check updateLoadingAll', () => {
    const someSliceInit = someReducer(
      initialState,
      someActions.updateLoadingAll(false)
    );
    const expectedState = {
      posts: [],
      loadingAllCards: false,
      loadingDetailedCard: true,
    };
    expect(someSliceInit).toEqual(expectedState);
  });
  it('check updateLoadingDetail', () => {
    const someSliceInit = someReducer(
      initialState,
      someActions.updateLoadingDetail(false)
    );
    const expectedState = {
      posts: [],
      loadingAllCards: true,
      loadingDetailedCard: false,
    };
    expect(someSliceInit).toEqual(expectedState);
  });
});
