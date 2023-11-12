import { MemoryRouter } from 'react-router-dom';
import React, { PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import AppProvider from '../contexts/app-context';

const MockWrapper = ({ children }: PropsWithChildren) => {
  return (
    <MemoryRouter>
      <AppProvider>{children}</AppProvider>
    </MemoryRouter>
  );
};

describe('Check render Components', () => {
  it('renders', async () => {
    render(<MockWrapper />);
  });
});

export default MockWrapper;
