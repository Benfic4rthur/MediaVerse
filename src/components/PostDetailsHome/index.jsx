import { where } from 'firebase/firestore';
import { useEffect, useLayoutEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GetCollectionValues } from '../../utils/GetCollectionValues';
import { Author, ContainerDeta, ContainerMidia, ContainerPost, Deta, Image, Title } from './styled';

export const PostDetailsHome = ({ post, to }) => {
  const [date, setDate] = useState();
  const [postId, setPostId] = useState('');
  const [Size, setSize] = useState(0);
  const limiteCaracteres = 40;
  const title =
    post.name.length > limiteCaracteres
      ? `${post.name.substring(0, limiteCaracteres)}...`
      : post.name;

  useLayoutEffect(() => {
    const objectDate = new Date(post?.createdAt?.seconds * 1000).toLocaleDateString('pt-BR');

    setDate(objectDate);
  }, []);

  useEffect(() => {
    const func = async () => {
      const Where = where('collec', '==', post.id);
      const val = await GetCollectionValues('posts', Where);

      setPostId(val?.[0]?.id);
      setSize(val.length);
    };

    func();
  }, [post]);

  return (
    <>
      {Size > 0 ? (
        <ContainerPost as={Link} to={`${to}${postId}`}>
          {post.mediaURL && (
            <ContainerMidia>
              <Image src={post.mediaURL} alt={post.title} title={post.title} />
              <Deta title={'Postado em ' + date}>{date}</Deta>
            </ContainerMidia>
          )}

          <Title aria-label={post.title} title={post.title}>
            {title}
          </Title>
          <ContainerDeta>
            <Author>{post.category}</Author>
            <Author>
              {Size} {Size > 1 ? 'Aulas' : 'Aula'}
            </Author>
          </ContainerDeta>
        </ContainerPost>
      ) : (
        <ContainerPost
          style={{ cursor: 'not-allowed' }}
          title='Este curso ainda não possui postagens'
        >
          {post.mediaURL && (
            <ContainerMidia>
              <Image src={post.mediaURL} alt={post.title} title={post.title} />
              <Deta title={'Postado em ' + date}>{date}</Deta>
            </ContainerMidia>
          )}

          <Title aria-label={post.title} title={post.title}>
            {title}
          </Title>
          <ContainerDeta>
            <Author>{post.category}</Author>
            <Author>
              {Size} {Size > 1 ? 'Aulas' : 'Aula'}
            </Author>
          </ContainerDeta>
        </ContainerPost>
      )}
    </>
  );
};
