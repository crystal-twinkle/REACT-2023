import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from '../App';
import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';

describe('Renders main page correctly', async () => {
  it('display App', async () => {
    render(
      <Router>
        <App />
      </Router>
    );
    act(() => {
      expect(screen.getByText('Write something')).toBeInTheDocument();
    });
  });
});
