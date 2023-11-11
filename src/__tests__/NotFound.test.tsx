import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NotFound from '../pages/NotFound';

describe('Not Found age test', () => {
  it('Render NotFound component', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );
  });
});
