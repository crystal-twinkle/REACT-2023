import React from 'react';
import * as router from 'react-router';
import { screen, fireEvent } from '@testing-library/react';
import PostList from '../components/PostList';
import { vi } from 'vitest';
import { mockPosts, renderWithProviders } from './test-utils';
import { IPost } from '../types/models';

const postListCall = (posts: IPost[], error?: boolean) => {
  renderWithProviders(<PostList page={1} dataAll={[]} />, {
    preloadedState: {
      pokemon: {
        error: error ? error : false,
        status: 'success',
        posts: posts,
        loading: false,
      },
    },
  });
};

describe('PostList component', () => {
  it('renders PostList component with posts', () => {
    postListCall(mockPosts);
    const detailButtons = screen.getAllByText('Details');
    expect(detailButtons).toHaveLength(mockPosts.length);

    mockPosts.forEach((post) => {
      const nameElement = screen.getByText(post.name);
      expect(nameElement).toBeInTheDocument();
    });
  });

  it('renders PostList component without posts', () => {
    postListCall([], true);
    screen.getByText('No posts found!');
  });
});

const navigate = vi.fn();

beforeEach(() => {
  vi.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
});

describe('check click Details button ', async () => {
  it('navigates to detail page when "Details" button is clicked', async () => {
    postListCall(mockPosts);

    const firstDetailButton = screen.getAllByText('Details')[0];
    fireEvent.click(firstDetailButton);
    expect(navigate).toHaveBeenCalledWith(
      '/posts/details/?page=1&name=Bulbasaur'
    );
  });
});
