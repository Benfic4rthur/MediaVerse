import { getElapsedTime } from '../../utils/getElapsedTime';
import { Container, Descricao, Subtitle, Video } from './styled';

export const CardSidebar = ({ props }) => {
  const { title, views, createdOn, mediaURL, id } = props;

  const deta = getElapsedTime(createdOn);

  return (
    <Container
      to={`../${id}`}
      relative='path'
      className={({ isActive }) => (isActive ? 'active' : '')}
    >
      <Video
        src={mediaURL}
        alt={title}
        title={title}
        poster={props?.thumbURL ? props?.thumbURL : ''}
        preload='none'
      />
      <Descricao>
        {title}
        <Subtitle>
          {views} views - {deta}
        </Subtitle>
      </Descricao>
    </Container>
  );
};
