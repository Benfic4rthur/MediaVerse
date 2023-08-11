import { where } from 'firebase/firestore';
import { useEffect, useLayoutEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GetCollectionValues } from '../../utils/GetCollectionValues';
import {
  Author,
  ContainerDeta,
  ContainerMidia,
  ContainerPost,
  Deta,
  Image,
  Title
} from './styled';

export const PostDetailsHome = ({ post, to }) => {
  const [date, setDate] = useState();
  const [postId, setPostId] = useState("");
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
    const func = async ()=>{
      const Where = where("collec", "==",  post.id)
      const val = await GetCollectionValues('posts', Where);
      setPostId(val?.[0]?.id);
    }
    func()

  }, [post]);

  return (
    <ContainerPost as={Link} to={`${to}${postId}`}>
      {post.mediaURL && (
        <ContainerMidia>
          <Image src={post.mediaURL} alt={post.title} title={post.title} />
        </ContainerMidia>
      )}

      <Title aria-label={post.title} title={post.title}>
        {title}
      </Title>
      <ContainerDeta>
        <Author>category: {post.category}</Author>
        <Deta title={'Postado em ' + date}>{date}</Deta>
      </ContainerDeta>
    </ContainerPost>
  );
};
