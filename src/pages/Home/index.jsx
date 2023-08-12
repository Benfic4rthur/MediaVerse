/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { Await, Form, defer, useLoaderData, useSearchParams } from 'react-router-dom';

//components

import { Suspense, useLayoutEffect } from 'react';
import { LuSearch } from 'react-icons/lu';
import { NoPost } from '../../components/NoPost';
import { PostDetailsHome } from '../../components/PostDetailsHome';
import { SearchButton, SearchForm, SearchInput } from '../../styles/styledGlobal';
import { FetchDocuments } from '../../utils/FetchDocuments';
import { ContainerButton, ContainerHome, PostsContainer } from './styled';

export const Home = () => {
  const data = useLoaderData();

  useLayoutEffect(() => {
    document.title = 'MediaVerse - Home';
  }, []);

  const arrayLength = Array.from({ length: 6 }).map((_, i) => i);
  let [searchParams, setSearchParams] = useSearchParams();
  const hasSearch = searchParams.get('q');

  return (
    <ContainerHome>
      <ContainerButton>
        <SearchForm as={Form} method='GET' about='/'>
          <SearchInput
            type='text'
            name='q'
            aria-label='Digite aqui para pesquisar posts'
            placeholder='Digite aqui para pesquisar'
          />
          <SearchButton aria-label='Realizar busca'>
            <LuSearch />
          </SearchButton>
        </SearchForm>
      </ContainerButton>
      <Suspense fallback={<></>}>
        <Await
          resolve={data.PostsData}
          errorElement={<NoPost title={'Nenhuma postagem encontrada.'} />}
        >
          {posts =>
            posts?.data?.length ? (
              <>
                {!!hasSearch && (
                  <h1 style={{ color: 'hsl(0, 0%, 95%, 0.7)' }}>
                    Resultados para a pesquisa por: '{hasSearch}'
                  </h1>
                )}
                <PostsContainer>
                  {posts.data
                    .map(post => {
                      return (
                      <PostDetailsHome key={post.id} to={'/post/'} post={post} />
                    )})}
                </PostsContainer>
              </>
            ) : (
              <NoPost title={'Nenhuma postagem encontrada.'} />
            )
          }
        </Await>
      </Suspense>
    </ContainerHome>
  );
};

export async function homeLoader({ request }) {
  const paramsUrl = new URL(request.url).searchParams;
  const query = paramsUrl.get('q');

  return defer({
    PostsData: FetchDocuments('collec', query),
  });
}
