import React from 'react';
import { IPost } from './models';
import { Outlet, useNavigate } from 'react-router-dom';
import '../assets/PostList.css';

type PostListProps = {
  posts: IPost[];
  title: string;
};

const PostList: React.FC<PostListProps> = ({ posts, title }) => {
  const navigate = useNavigate();
  if (!posts.length) {
    return <h3 style={{ textAlign: 'center' }}>No posts found!</h3>;
  }

  return (
    <div>
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
                <button
                  className={`btn-detail`}
                  onClick={() => {
                    navigate(`/posts/${post.name}`);
                  }}
                >
                  Detail
                </button>
              </div>
            </div>
          ))}
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default PostList;
