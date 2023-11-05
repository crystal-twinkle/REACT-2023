import React from 'react';
import { IPost } from './models';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import '../assets/PostList.css';

type PostListProps = {
  posts: IPost[];
  title: string;
  page: number;
  isFetchError: boolean;
};

const PostList: React.FC<PostListProps> = ({
  posts,
  title,
  isFetchError,
  page,
}) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  searchParams.set('page', '1');
  searchParams.set('name', 'ivysaur');

  if (!posts.length || isFetchError) {
    return (
      <h3 style={{ textAlign: 'center', marginTop: '50px' }}>
        No posts found!
      </h3>
    );
  }

  const navigateDetailPage = (post: IPost) => {
    navigate(`/posts/details/?page=${page}&name=${post.name}`);
  };

  return (
    <div style={{ marginTop: '50px' }}>
      <h2 style={{ textAlign: 'center' }}>{title}</h2>
      <div className={`list-wrap`}>
        <div className="list">
          {posts.map((post: IPost) => (
            <div className="list__element" key={post.name}>
              <p className="list__name"> {post.name}</p>
              <div>
                <img src={post.sprites.front_default} alt="front" />
                <img src={post.sprites.back_default} alt="back" />
                <img src={post.sprites.front_shiny} alt="shiny" />
              </div>
              <button
                className={`btn-detail`}
                onClick={() => {
                  navigateDetailPage(post);
                }}
              >
                Details
              </button>
            </div>
          ))}
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default PostList;
