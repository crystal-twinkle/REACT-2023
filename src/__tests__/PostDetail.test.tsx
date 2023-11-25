import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import PostDetail from '../components/PostDetail';
import { renderWithProviders } from './utils/renderWithProviders';
import { vi } from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

vi.mock('next/router', () => ({
  useRouter() {
    return {
      route: '',
      pathname: '',
      query: { id: 'ivysaur' },
      asPath: '',
      push: vi.fn(),
    };
  },
}));

const server = setupServer(
  http.get('https://pokeapi.co/api/v2/pokemon/:name', ({ params }) => {
    const { name } = params;
    return HttpResponse.json({
      name,
      sprites: {
        front_default: 'front_default_url',
        back_default: 'back_default_url',
        front_shiny: 'front_shiny_url',
      },
      height: 10,
      weight: 20,
    });
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

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
  });
});
