import { getElapsedTime } from '../../utils/getElapsedTime';
import { Container, Descricao, Subtitle, Video } from '../CardSidebar/styled';

export const Sidebar = ({ props }) => {
  const { title, views, createdOn, mediaURL, id } = props;

  const deta = getElapsedTime(createdOn);

  return (
    <Container
      to={`/learning/${id}`}
      className={({ isActive, isPending }) => (isPending ? 'pending' : isActive ? 'active' : '')}
    >
      <Video
        src={mediaURL}
        alt={title}
        title={title}
        poster={props?.thumbURL ? props?.thumbURL : ''}
        preload='metadata'
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
