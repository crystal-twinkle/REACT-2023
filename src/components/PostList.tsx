import React from 'react';
import { IPost } from './models';
import { useNavigate } from 'react-router-dom';
import '../assets/PostList.css';
import { useAppSelector } from '../store/redux-hooks';

type PostListProps = {
  page: number;
  isError: boolean;
};

const PostList = (props: PostListProps) => {
  const { posts } = useAppSelector((state) => state.pokemon);
  const { page, isError } = props;
  const navigate = useNavigate();

  if (!posts?.length || isError) {
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
      <h2 style={{ textAlign: 'center' }}>List</h2>
      <div className="list">
        {posts.map((post: IPost) => (
          <div className="list__element" key={post.name}>
            <p className="list__name"> {post.name}</p>
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
    </div>
  );
};

export default PostList;
