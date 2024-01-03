import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import PostDetail from '../pages/PostDetail';
import { renderWithProviders } from './test-utils';

const detailCall = () => {
  return renderWithProviders(<PostDetail />);
};

describe('PostDetail component', () => {
  it('renders correctly with loading state', () => {
    detailCall();
  });

  it('fetches and displays Pokemon details', async () => {
    detailCall();
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).toBeNull();
    });
    await waitFor(() => {
      screen.getByText(`Pikachu`);
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
  });
});
