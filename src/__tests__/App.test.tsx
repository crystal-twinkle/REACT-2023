import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from '../App';

describe('Renders main page correctly', async () => {
  it('display App', async () => {
    render(
      <Router>
        <App />
      </Router>
    );
  });
});
