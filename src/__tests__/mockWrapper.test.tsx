import { BrowserRouter } from 'react-router-dom';
import SearchProvider from '../contexts/app-context';
import React, { PropsWithChildren } from 'react';
import { render } from '@testing-library/react';

const MockWrapper = ({ children }: PropsWithChildren) => {
  return (
    <BrowserRouter>
      <SearchProvider>{children}</SearchProvider>
    </BrowserRouter>
  );
};

describe('Check render Components', () => {
  it('renders', async () => {
    render(<MockWrapper />);
  });
});

export default MockWrapper;
