/* eslint-disable react/no-unescaped-entities */
// components
import { Suspense, useLayoutEffect } from 'react';
import { Await, defer, useLoaderData } from 'react-router-dom';
import { NoPost } from '../../components/NoPost';
import { FetchTags } from '../../utils/FetchTags';
import { ContainerHome, ContainerTitle, PostsContainer } from './styled';
import { CardPostPublic } from '../../components/CardPostPublic';

export const Public = () => {
  const data = useLoaderData();

  useLayoutEffect(() => {
    document.title = 'MediaVerse - Promocional';
  }, []);

  return (
    <ContainerHome>
      <ContainerTitle>Novidades que podem ser interessantes:</ContainerTitle>

      <Suspense fallback={<></>}>
        <Await
          resolve={data.PostsData}
          errorElement={<NoPost title={'Nenhuma postagem encontrada.'} />}
        >
          {posts =>
            posts?.length ? (
              <PostsContainer>
                {posts.map(post => (
                  <CardPostPublic key={post.id} to={'/post/public/'} post={post} />
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

export async function publicLoader() {

  return defer({
    PostsData: FetchTags('posts', 'gvlIcpGsWmAco6G9UNws'),
  });
}
