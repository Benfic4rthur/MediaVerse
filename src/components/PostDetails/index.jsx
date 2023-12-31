import { Link } from 'react-router-dom';
import { Container, ContainerMidia, Image, Title, Video } from './styled';

export const PostDetails = ({ post }) => {
  const limiteCaracteres = 200;
  const body =
    post.body.length > limiteCaracteres
      ? `${post.body.substring(0, limiteCaracteres)}...`
      : post.body;

  return (
    <Container as={Link} to={`/post/${post.id}`}>
      {post.mediaURL && (post.mediaURL.includes('.mp4') || post.mediaURL.includes('.webm')) ? (
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <ContainerMidia>
          <Video src={post.mediaURL} alt={post.title} title={body} preload='none' />
        </ContainerMidia>
      ) : (
        <ContainerMidia>
          <Image src={post.mediaURL} alt={post.title} title={body} />
        </ContainerMidia>
      )}
      <Title aria-label={post?.title} title={post?.title}>
        {post?.title}
      </Title>
    </Container>
  );
};
