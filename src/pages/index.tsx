import React from 'react';
import store from '../store/store';
import { Provider } from 'react-redux';
import Main from '../components/Main';

export default function Page() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
