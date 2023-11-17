import React from 'react';
import { IPost } from './models';
import { useNavigate } from 'react-router-dom';
import '../assets/PostList.css';
import { useAppSelector } from '../store/redux-hooks';

type PostListProps = {
  dataInfo: {
    count: number;
    results: IPost[];
  };
  page: number;
};

const PostList = (props: PostListProps) => {
  const { dataInfo, page } = props;
  const navigate = useNavigate();
  const { query } = useAppSelector((state) => state.search);

  const filteredPosts = dataInfo.results.filter((post: IPost) => {
    return query ? post.name.toLowerCase().includes(query.toLowerCase()) : true;
  });

  if (!filteredPosts.length) {
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
        {filteredPosts.map((post: IPost) => (
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
