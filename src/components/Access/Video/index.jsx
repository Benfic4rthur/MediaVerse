import { useEffect, useState } from 'react';
import {
  Container,
  ContainerInfor,
  ContainerVideo,
  Description,
  Text,
  Title,
  Video as VideoStyled,
} from './styled';
// import MediaVerse from '../../../assets/mediaverse.mp4';

export function Video({ data }) {
  const [state, setstate] = useState({});

  useEffect(() => {
    setstate(data?.[0]);

  }, [data]);

  return (
    <Container id="init">
      <ContainerInfor>
        <ContainerVideo>
          <VideoStyled
            src={state?.mediaURL}
            controls
            poster={state?.thumbURL ? state?.thumbURL : ''}
          ></VideoStyled>
        </ContainerVideo>
        <Text>
          <Title>{state.title}</Title>
          <Description>{state.body}</Description>
        </Text>
      </ContainerInfor>
    </Container>
  );
}
