/* eslint-disable react/no-unescaped-entities */
// import styles from "./style.module.css";
// hooks
import { LuArrowLeft } from 'react-icons/lu';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { useQuery } from '../../hooks/useQuery';

// components
import { Link } from 'react-router-dom';
import { PostDetails } from '../../components/PostDetails';
import { CreatePostButton, Subtitle } from '../../styles/styledGlobal';
import { ContainerLink, ContainerPost, TextError } from './styled';

const Index = () => {
  const query = useQuery();
  const search = query.get('q');
  const { documents: posts } = useFetchDocuments('posts', search);
  return (
    <div>
      <Subtitle>Resultados encontrados para: '{search}'</Subtitle>
      <div>
        <ContainerLink>
          {!posts?.length && (
            <>
              <TextError>Não foram encontrados resultados a partir da sua busca</TextError>
              <CreatePostButton as={Link} to='/'>
                <LuArrowLeft /> Voltar
              </CreatePostButton>
            </>
          )}
        </ContainerLink>
        <ContainerPost>
          {posts && posts.map(post => <PostDetails key={post.id} post={post} />)}
        </ContainerPost>
      </div>
    </div>
  );
};

export default Index;

