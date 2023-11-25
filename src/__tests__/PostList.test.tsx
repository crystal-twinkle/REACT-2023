import React from 'react';
import { screen, fireEvent, render } from '@testing-library/react';
import PostList from '../components/PostList';
import { IPost } from '../types/models';
import { mockPosts } from './utils/forMock';
import mockRouter from 'next-router-mock';

const postListCall = (posts: IPost[], error = false) => {
  render(<PostList cards={{ posts, error }} />);
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

describe('check click Details button ', async () => {
  it('navigates to detail page when "Details" button is clicked', async () => {
    postListCall(mockPosts);

    const firstDetailButton = screen.getAllByText('Details')[0];
    fireEvent.click(firstDetailButton);
    expect(mockRouter.asPath).toEqual('/?id=bulbasaur');
  });
});
