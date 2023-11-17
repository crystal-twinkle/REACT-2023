import React from 'react';
import * as router from 'react-router';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PostList from '../components/PostList';
import { vi } from 'vitest';
import { IPost } from '../components/models';
import AppProvider, { AppContext, IAppContext } from '../contexts/app-context';

const mockPosts = [
  {
    name: 'Post_1',
    sprites: {
      front_default: 'image1.png',
      back_default: 'image1_back.png',
      front_shiny: 'image1_shiny.png',
    },
  },
  {
    name: 'Post_2',
    sprites: {
      front_default: 'image2.png',
      back_default: 'image2_back.png',
      front_shiny: 'image2_shiny.png',
    },
  },
];

const mockProps = {
  title: 'Mock Title',
  page: 1,
  isFetchError: false,
};

const PostListWrap = ({ posts }: { posts: IPost[] }) => {
  return (
    <MemoryRouter>
      <AppProvider>
        <AppContext.Provider value={{ posts } as IAppContext}>
          <PostList
            dataInfo={{
              count: 1200,
              results: posts,
            }}
            {...mockProps}
          />
        </AppContext.Provider>
      </AppProvider>
    </MemoryRouter>
  );
};

describe('PostList component', () => {
  it('renders PostList component with posts', () => {
    render(<PostListWrap posts={mockPosts} />);

    const titleElement = screen.getByText(mockProps.title);
    expect(titleElement).toBeInTheDocument();
    const detailButtons = screen.getAllByText('Details');
    expect(detailButtons).toHaveLength(mockPosts.length);

    mockPosts.forEach((post) => {
      const nameElement = screen.getByText(post.name);
      expect(nameElement).toBeInTheDocument();
    });
    expect(mockPosts).toHaveLength(2);

    const frontImages = screen.getAllByAltText('front');
    expect(frontImages).toHaveLength(2);
    const backImages = screen.getAllByAltText('back');
    expect(backImages).toHaveLength(2);
    const shinyImages = screen.getAllByAltText('shiny');
    expect(shinyImages).toHaveLength(2);
  });

  it('renders PostList component without posts', () => {
    render(<PostListWrap posts={[]} />);
    screen.getByText('No posts found!');
  });
});

const navigate = vi.fn();

beforeEach(() => {
  vi.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
});

describe('check click Details button ', async () => {
  it('navigates to detail page when "Details" button is clicked', async () => {
    render(<PostListWrap posts={mockPosts} />);

    const firstDetailButton = screen.getAllByText('Details')[0];
    fireEvent.click(firstDetailButton);
    expect(navigate).toHaveBeenCalledWith('/posts/details/?page=1&name=Post_1');
  });
});
