import { Link } from 'react-router-dom';
import { ContainerMidia, ContainerPost, Deta, Image, Title } from './styled';

export const CardPostPublic = ({ post, to }) => {
      const date = new Date(post?.createdAt?.seconds * 1000).toLocaleDateString('pt-BR');

  return (
    <ContainerPost as={Link} to={`${to}${post.id}`}>
      {post.thumbURL && (
        <ContainerMidia>
          <Image src={post.thumbURL} alt={post.title} title={post.title} />
          <Deta title={'Postado em ' + date}>{date}</Deta>
        </ContainerMidia>
      )}
      <Title aria-label={post.title} title={post.title}>
        {post.title}
      </Title>
    </ContainerPost>
  );
};
