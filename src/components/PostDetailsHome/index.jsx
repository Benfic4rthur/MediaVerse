import { useLayoutEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LuEye } from 'react-icons/lu';
import {
  Author,
  ContainerDeta,
  ContainerMidia,
  ContainerPost,
  // ContainerTag,
  Deta,
  Image,
  // Tag,
  Title,
  Video,
} from './styled';

export const PostDetailsHome = ({ post, to }) => {
  const [date, setDate] = useState();
  const limiteCaracteres = 40;
  const title =
    post.title.length > limiteCaracteres
      ? `${post.title.substring(0, limiteCaracteres)}...`
      : post.title;

  useLayoutEffect(() => {
    const objectDate = new Date(post?.createdAt?.seconds * 1000).toLocaleDateString('pt-BR');

    setDate(objectDate);
  }, []);

  return (
    <ContainerPost as={Link} to={`${to}${post.id}`}>
      {post.mediaURL && (post.mediaURL.includes('.mp4') || post.mediaURL.includes('.webm')) ? (
        <ContainerMidia>
          <Video
            src={post.mediaURL}
            alt={post.title}
            title={post.title}
            poster={post.thumbURL ? post.thumbURL : ''}
            preload='none'
          />
        </ContainerMidia>
      ) : (
        <ContainerMidia>
          <Image src={post.mediaURL} alt={post.title} title={post.title} />
        </ContainerMidia>
      )}

      <Title aria-label={post.title} title={post.title}>
        <div>{title}</div>
        <div title={post.views + ' Visualizações'}>
          <LuEye />
          {post.views}
        </div>
      </Title>
      <ContainerDeta>
        <Author>Autor: {post.createdBy}</Author>
        <Deta title={'Postado em ' + date}>{date}</Deta>
      </ContainerDeta>
      {/* <ContainerTag>
        {post.tags.map(tag => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </ContainerTag> */}
    </ContainerPost>
  );
};
