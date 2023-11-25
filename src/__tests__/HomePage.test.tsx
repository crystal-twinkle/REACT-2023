import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { createMockRouter } from './utils/createMockRouter';
import HomePage from '../pages';
import { setTestProps } from './utils/forMock';
import React from 'react';
import { screen, waitFor, render } from '@testing-library/react';
import { vi } from 'vitest';

const useRouter = vi.spyOn(require('next/router'), 'useRouter');

describe('Test Home Page', () => {
  it('render with default values', async () => {
    render(
      <RouterContext.Provider
        value={createMockRouter({ query: { page: '1', limit: '20' } })}
      >
        <HomePage data={setTestProps()} />
      </RouterContext.Provider>
    );
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).toBeNull();
    });
    expect(screen.getByText('List')).toBeInTheDocument();
    expect(screen.getByText('Write something')).toBeInTheDocument();
    expect(screen.getByText('pikachu')).toBeInTheDocument();
  });

  it('check render with wrong search query', async () => {
    useRouter.mockImplementationOnce(() => ({
      query: { search: 'nobody' },
    }));
    render(<HomePage data={setTestProps({ error: true })} />);
    expect(screen.getByText('No posts found!')).toBeInTheDocument();
    expect(screen.queryByTestId('pagination-wrap')).toBeNull();
  });
});
