import React from 'react';
import * as router from 'react-router';
import { screen, fireEvent } from '@testing-library/react';
import PostList from '../components/PostList';
import { vi } from 'vitest';
import { IPost } from '../components/models';
import { renderWithProviders } from './test-utils';

const mockPosts = [
  {
    name: 'Post_1',
  },
  {
    name: 'Post_2',
  },
];

const postListCall = ({ posts }: { posts: IPost[] }) => {
  return renderWithProviders(
    <PostList
      dataInfo={{
        count: 1200,
        results: posts,
      }}
      page={1}
    />
  );
};

describe('PostList component', () => {
  it('renders PostList component with posts', () => {
    postListCall({ posts: mockPosts });
    const detailButtons = screen.getAllByText('Details');
    expect(detailButtons).toHaveLength(mockPosts.length);

    mockPosts.forEach((post) => {
      const nameElement = screen.getByText(post.name);
      expect(nameElement).toBeInTheDocument();
    });
    expect(mockPosts).toHaveLength(2);
  });

  it('renders PostList component without posts', () => {
    postListCall({ posts: [] });
    screen.getByText('No posts found!');
  });
});

const navigate = vi.fn();

beforeEach(() => {
  vi.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
});

describe('check click Details button ', async () => {
  it('navigates to detail page when "Details" button is clicked', async () => {
    postListCall({ posts: mockPosts });

    const firstDetailButton = screen.getAllByText('Details')[0];
    fireEvent.click(firstDetailButton);
    expect(navigate).toHaveBeenCalledWith('/posts/details/?page=1&name=Post_1');
  });
});
