import { gSSP, IPost } from '../../types/models';
import { GetServerSidePropsContext } from 'next';
import { createRequest, createResponse } from 'node-mocks-http';

interface ISetTestProps {
  posts: IPost[];
  error: boolean;
  loading: boolean;
}

export const mockPosts = [
  { name: 'bulbasaur' },
  { name: 'charmander' },
  { name: 'pikachu' },
  { name: 'ivysaur' },
];

export const setTestProps = (props: Partial<ISetTestProps> = {}) => {
  const { posts, error, loading } = props;
  const gSSPTestProps: gSSP = {
    cards: {
      loading: loading || false,
      posts: posts || mockPosts,
      error: error || false,
      status: '',
    },
  };
  return gSSPTestProps;
};

export const gsspCtx = (
  ctx?: Partial<GetServerSidePropsContext>
): GetServerSidePropsContext => ({
  req: createRequest(),
  res: createResponse(),
  params: undefined,
  query: {},
  resolvedUrl: '',
  ...ctx,
});
