import React from 'react';
import { IPokemonState, IPost } from '../types/models';
import styles from '../assets/PostList.module.css';
import { useRouter } from 'next/router';

type PostListProps = {
  cards: IPokemonState;
};

const PostList = (props: PostListProps) => {
  const { error } = props.cards;
  const router = useRouter();

  function notFound() {
    return (
      <h3 style={{ textAlign: 'center', marginTop: '50px' }}>
        No posts found!
      </h3>
    );
  }

  function mainBlock() {
    return (
      <div style={{ marginTop: '50px' }}>
        <h2 style={{ textAlign: 'center' }}>List</h2>
        <div className={styles.list}>
          {props.cards.posts.map((post: IPost) => (
            <div className={styles.list__element} key={post.name}>
              <p className={styles.list__name}> {post.name}</p>
              <button
                className={styles.btnDetail}
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
  }

  const navigateDetailPage = (post: IPost) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, id: `${post.name}` },
    });
  };

  return <>{!error ? mainBlock() : notFound()}</>;
};

export default PostList;
