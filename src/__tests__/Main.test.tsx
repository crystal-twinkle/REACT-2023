import React, { useState } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Main from '../pages/Main';
import PokemonApi from '../API/api';
import { Mock, vi } from 'vitest';
import WrapperMock from './wrapper.test';

vi.mock('../API/api');
const mockSetUrlPageString = vi.fn();

let mockSearchParam = '';

vi.mock('react-router-dom', async () => {
  const actual: object = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useSearchParams: () => {
      const [params, setParams] = useState(
        new URLSearchParams(mockSearchParam)
      );

      return [
        params,
        (newParams: string) => {
          setParams(new URLSearchParams(newParams));
          mockSearchParam = newParams;
          mockSetUrlPageString(newParams);
        },
      ];
    },
  };
});

const MainWrapper = () => {
  return (
    <WrapperMock>
      <Main />
    </WrapperMock>
  );
};

describe('Main Component', () => {
  it('renders with default values', async () => {
    (PokemonApi.getALL as Mock).mockResolvedValue({
      resolved: [
        { name: 'Pikachu', sprites: { front_default: 'pikachu-image-url' } },
      ],
      countPosts: 1200,
    });

    render(<MainWrapper />);

    await waitFor(() => {
      const loadingElement = screen.getByText(/Loading/i);
      expect(loadingElement).toBeInTheDocument();
    });
    expect(screen.getByText('Generic List')).toBeInTheDocument();
    expect(screen.getByText('Write something')).toBeInTheDocument();
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
  });

  it('check click on arrows', async () => {
    render(<MainWrapper />);
    const rightButton = await screen.findByText('>');
    fireEvent.click(rightButton);
    expect(mockSearchParam).toContain({ page: '2' });
    const leftButton = await screen.findByText('<');
    fireEvent.click(leftButton);
    expect(mockSearchParam).toContain({ page: '1' });
  });

  it('check click on Set posts button', async () => {
    render(<MainWrapper />);
    const setPostsButton = await screen.findByText('Set Posts');
    fireEvent.click(setPostsButton);
    expect(mockSearchParam).toContain({ page: '1' });
    expect(mockSetUrlPageString).toHaveBeenCalledWith({ page: '1' });
    vi.clearAllMocks();
  });

  it('handles search input', async () => {
    vi.clearAllMocks();
    (PokemonApi.getByName as Mock).mockResolvedValue({
      name: 'ivysaur',
      sprites: { front_default: 'ivysaur-image-url' },
    });

    render(<MainWrapper />);
    const input = screen.getByRole('textbox');
    const searchButton = screen.getByText('search');
    fireEvent.change(input, { target: { value: 'ivysaur' } });
    fireEvent.click(searchButton);
    expect(await screen.findByText('ivysaur')).toBeInTheDocument();
  });

  it('handles search without true parameter', async () => {
    (PokemonApi.getByName as Mock).mockRejectedValue(new Error('octopus'));
    render(<MainWrapper />);
    expect(await screen.findByText('No posts found!')).toBeInTheDocument();
  });

  it('click on Generate Error', async () => {
    render(<MainWrapper />);

    const errorBtn = screen.getByText('Generate Error');
    expect(() => fireEvent.click(errorBtn)).toThrow('Test error');
  });
});
