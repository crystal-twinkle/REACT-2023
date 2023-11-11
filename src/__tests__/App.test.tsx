import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Router } from 'react-router';
import App from '../App';
import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import React from 'react';
import { createMemoryHistory } from 'history';

describe('Renders main page correctly', async () => {
  it('display App', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
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
