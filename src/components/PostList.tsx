import React from 'react';
import { IPost } from './models';
import { Outlet, useNavigate } from 'react-router-dom';
import '../assets/PostList.css';
import Pagination from './Pagination';

type PostListProps = {
  posts: IPost[];
  title: string;
  changePage: (page: number) => void;
  page: number;
  totalPages: number;
};

const PostList: React.FC<PostListProps> = ({
  posts,
  title,
  page,
  totalPages,
  changePage,
}) => {
  const navigate = useNavigate();
  if (!posts.length) {
    return <h3 style={{ textAlign: 'center' }}>No posts found!</h3>;
  }

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
      <Pagination totalPages={totalPages} page={page} changePage={changePage} />
    </div>
  );
};

export default PostList;
