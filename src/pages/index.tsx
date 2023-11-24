import React from 'react';
import Main from '../components/Main';
import store from '../store/store';
import { Provider } from 'react-redux';

export default function Page() {
  return (
    <div className="app">
      <Provider store={store}>
        <Main />
      </Provider>
    </div>
  );
}
