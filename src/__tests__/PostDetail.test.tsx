import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import PostDetail from '../components/PostDetail';
import { renderWithProviders } from './utils/renderWithProviders';
import { vi } from 'vitest';

const mockPush = vi.fn();
vi.mock('next/router', () => ({
  useRouter() {
    return {
      route: '',
      pathname: '',
      query: { page: 1, limit: 20, id: 'ivysaur' },
      asPath: '',
      push: mockPush,
    };
  },
}));

const detailCall = () => {
  return renderWithProviders(<PostDetail />);
};

describe('PostDetail component', () => {
  it('fetches and displays Pokemon details', async () => {
    detailCall();
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).toBeNull();
    });
    await waitFor(() => {
      screen.getByText(`ivysaur`);
      screen.getByAltText('front');
      screen.getByText(`Height: ${10}`);
      screen.getByText(`Weight: ${20}`);
      screen.getByText('Close');
    });
  });

  it('handles the "Close" button click', async () => {
    detailCall();
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).toBeNull();
    });

    const closeButton = await screen.getByText('Close');
    fireEvent.click(closeButton);
    const postDetailElement = screen.queryByTestId('post-detail-wrap');
    expect(postDetailElement).not.toBeInTheDocument();
    expect(mockPush).toHaveBeenCalledWith(
      expect.objectContaining({
        pathname: '',
        query: expect.objectContaining({
          page: '1',
        }),
      })
    );
  });
});
