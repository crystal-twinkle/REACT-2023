import { render } from '@testing-library/react';
import { Router } from 'react-router';
import App from '../App';
import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import React from 'react';
import { createMemoryHistory } from 'history';
import WrapperMock from './wrapper.test';

describe('Renders main page correctly', async () => {
  it('display App', async () => {
    render(
      <WrapperMock>
        <App />
      </WrapperMock>
    );
    act(() => {
      expect(screen.getByText('Write something')).toBeInTheDocument();
    });
  });

  it('NotFound page open with wrong path', () => {
    const history = createMemoryHistory();
    render(
      <Router navigator={history} location={'/non-existent-path'}>
        <App />
      </Router>
    );
    expect(screen.getByText(/not found/i)).toBeInTheDocument();
  });
});
