import { Suspense } from 'react';
import { Await } from 'react-router-dom';
import {
  Container,
  ContainerInfor,
  ContainerVideo,
  Description,
  Text,
  Title,
  Video as VideoStyled,
} from './styled';

export function Video({ getData }) {

  return (
    <Container id='init'>
      <ContainerInfor>
        <Suspense fallback={<></>}>
          <Await resolve={getData}>
            {data => {
              console.log(getData, data);

            return<>
                <ContainerVideo>
                  <VideoStyled
                    src={data?.[0]?.mediaURL}
                    controls
                    poster={data?.[0]?.thumbURL ? data?.[0]?.thumbURL : ''}
                  ></VideoStyled>
                </ContainerVideo>
                <Text>
                  <Title>{data?.[0]?.title}</Title>
                  <Description>{data?.[0]?.body}</Description>
                </Text>
              </>
            }}
          </Await>
        </Suspense>
      </ContainerInfor>
    </Container>
  );
}
