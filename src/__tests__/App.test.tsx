import { render } from '@testing-library/react';
import { Router } from 'react-router';
import App from '../App';
import { screen } from '@testing-library/react';
import React from 'react';
import { createMemoryHistory } from 'history';

describe('Renders main page correctly', async () => {
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
