import { Suspense, useLayoutEffect } from 'react';
import { LuSearch } from 'react-icons/lu';
import { Await, Form, defer, redirect, useLoaderData } from 'react-router-dom';
import { NoPost } from '../../components/NoPost';
import { PostDetails } from '../../components/PostDetails';
import { SearchButton, SearchForm, SearchInput } from '../../styles/styledGlobal';
import { FetchDocuments } from '../../utils/FetchDocuments';
import { CreatePostTitle } from '../Dashboard/styled';
import { ContainerHome } from '../Home/styled';
import { Container } from './styled';

const Index = () => {
  const data = useLoaderData();

  useLayoutEffect(() => {
    document.title = 'Ekor Solutions - Catalogo';
  }, []);

  // const arrayLength = Array.from({ length: 16 }).map((_, i) => i);

  return (
    <ContainerHome>
      <SearchForm as={Form} method='POST' about='/catalog'>
        <SearchInput
          name='query'
          type='text'
          aria-label='Digite aqui para pesquisar posts'
          placeholder='Digite aqui para pesquisar'
        />
        <SearchButton aria-label='Realizar busca'>
          <LuSearch />
        </SearchButton>
      </SearchForm>
      <CreatePostTitle>Catalogo de postagens</CreatePostTitle>

      <Suspense fallback={<></>}>
        <Await
          resolve={data.PostsData}
          errorElement={<NoPost title={'Nenhuma postagem encontrada.'} />}
        >
          {posts =>
            posts?.data?.length ? (
              <Container>
                {posts?.data?.map(post => (
                  <PostDetails key={post.id} post={post} />
                ))}
              </Container>
            ) : (
              <NoPost title={'Nenhuma postagem encontrada.'} />
            )
          }
        </Await>
      </Suspense>
    </ContainerHome>
  );
};

// fallback={
//   <Container>
//     {arrayLength.map((e, i) => (
//       <SkeletonPostDetails key={i} />
//     ))}
//   </Container>
// }

export default Index;

export async function catalogLoader({ request }) {
  const paramsUrl = new URL(request.url).searchParams;
  const query = paramsUrl.get('q');

  return defer({
    PostsData: FetchDocuments('posts', query),
  });
}

export async function catalogAction({ request }) {
  const data = await request.formData();
  const query = data.get('query');

  const redirectValue = query ? `?q=${query}` : '';

  return redirect(redirectValue);
}
