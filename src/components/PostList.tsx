import React from 'react';
import { IPost } from './models';
import '../assets/PostList.css';

type PostListProps = {
  posts: IPost[];
  title: string;
};

const PostList: React.FC<PostListProps> = ({ posts, title }) => {
  if (!posts.length) {
    return <h3 style={{ textAlign: 'center' }}>No posts found!</h3>;
  }

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>{title}</h2>
      <div className="list">
        {posts.map((post: IPost) => (
          <div className="list__element" key={post.name}>
            <div>
              <p className="list__name"> {post.name}</p>
              <div>
                <img src={post.sprites.front_default} alt="front" />
                <img src={post.sprites.back_default} alt="back" />
                <img src={post.sprites.front_shiny} alt="shiny" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;
