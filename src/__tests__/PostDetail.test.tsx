import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PostDetail from '../pages/PostDetail';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

describe('PostDetail component', () => {
  vi.mock('../API/api', async () => {
    const actual = await vi.importActual('../API/api');
    return {
      actual,
      default: {
        getByName: vi.fn().mockResolvedValue({
          name: 'Pikachu',
          sprites: { front_default: 'pikachu-image-url' },
          height: 10,
          weight: 20,
        }),
      },
    };
  });

  it('renders correctly with loading state', () => {
    render(
      <MemoryRouter>
        <PostDetail />
      </MemoryRouter>
    );
  });

  it('fetches and displays Pokemon details', async () => {
    render(
      <MemoryRouter initialEntries={[`/?name=Pikachu`]}>
        <PostDetail />
      </MemoryRouter>
    );

    await waitFor(() => {
      screen.getByText(`Pokemon name is Pikachu`);
      screen.getByAltText('front');
      screen.getByText(`Height: ${10}`);
      screen.getByText(`Weight: ${20}`);
      screen.getByText('Close');
    });
  });

  it('handles the "Close" button click', async () => {
    render(
      <MemoryRouter initialEntries={[`/?name=Pikachu`]}>
        <PostDetail />
      </MemoryRouter>
    );

    await waitFor(() => {
      const loadingElement = screen.getByText(/Loading/i);
      expect(loadingElement).toBeInTheDocument();
    });

    const closeButton = await screen.getByText('Close');
    fireEvent.click(closeButton);
    const postDetailElement = screen.queryByTestId('post-detail-wrap');
    expect(postDetailElement).not.toBeInTheDocument();
  });
});
