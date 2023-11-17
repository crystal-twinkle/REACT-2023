import React from 'react';
import { IPost } from './models';
import { useNavigate } from 'react-router-dom';
import '../assets/PostList.css';

type PostListProps = {
  dataInfo: {
    count: number;
    results: IPost[];
  };
  title: string;
  page: number;
  isFetchError: boolean;
};

const PostList: React.FC<PostListProps> = (props: PostListProps) => {
  const navigate = useNavigate();
  const { dataInfo, title, isFetchError, page } = props;
  if (!dataInfo.results.length || isFetchError) {
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
      <div className="list">
        {dataInfo.results.map((post: IPost) => (
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
