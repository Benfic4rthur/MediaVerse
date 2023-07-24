/* eslint-disable react/no-unescaped-entities */
// components
import { Suspense, useLayoutEffect } from 'react';
import { Await, defer, useLoaderData } from 'react-router-dom';
import { NoPost } from '../../components/NoPost';
import { PostDetailsHome } from '../../components/PostDetailsHome';
import { FetchTags } from '../../utils/FetchTags';
import { ContainerHome, PostsContainer, ContainerTitle } from './styled';

const Index = () => {
  const data = useLoaderData();

  useLayoutEffect(() => {
    document.title = 'MediaVerse- Não é Cliente';
  }, []);

  return (
    <ContainerHome>
      <ContainerTitle>Novidades do Sistema Genuine:</ContainerTitle>

      <Suspense fallback={<></>}>
        <Await
          resolve={data.PostsData}
          errorElement={<NoPost title={'Nenhuma postagem encontrada.'} />}
        >
          {posts =>
            posts?.length ? (
              <PostsContainer>
                {posts.map(post => (
                  <PostDetailsHome key={post.id} to={'/public-post/'} post={post} />
                ))}
              </PostsContainer>
            ) : (
              <NoPost title={'Nenhuma postagem encontrada.'} />
            )
          }
        </Await>
      </Suspense>
    </ContainerHome>
  );
};

export default Index;

export async function publicLoader() {
  return defer({
    PostsData: FetchTags('posts', ['nao-e-cliente']),
  });
}
