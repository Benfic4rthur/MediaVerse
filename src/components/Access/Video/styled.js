import { keyframes, styled } from 'styled-components';
import Sala from '../../../assets/sala.jpg';

const showing = keyframes`
 0% {
    opacity: 0;
    transform: translateX(-100px);
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
    transform: none;
  }
`;

export const Container = styled.section`
  width: 100%;
  height: 65rem;
  background-color: hsl(228, 11%, 38%, 0.5);
  background-image: url(${Sala});
  background-position: center center;
  background-size: cover;
  display: flex;
  align-items: center;
  border-bottom-right-radius: 3rem;
  border-bottom-left-radius: 3rem;
  box-shadow: 1px 1px 10px hsl(0, 0%, 0%, 0.5);
`;

export const ContainerInfor = styled.div`
  width: 100%;
  padding-inline: 1rem;
  display: flex;
  flex-flow: column;
  padding-top: 2rem;
  gap: 2rem;
  align-items: center;
  justify-content: center;

  @media (min-width: 780px) {
    flex-flow: row;
  }
`;

export const ContainerVideo = styled.div`
  width: 100%;
  max-width: 70rem;
  aspect-ratio: 16 / 9;
  background-color: rgb(0 0 0 / 0.5);
  border-radius: 1.2rem;
  overflow: hidden;
  animation: ${showing} 1s;
`;

export const Video = styled.video`
  object-position: center;
  aspect-ratio: 16 / 9;
  width: 100%;
  object-fit: cover;
`;

export const Text = styled.div`
  width: 100%;
  max-width: 65rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-color: rgba(0, 0, 0, .5);
  padding: 1.5rem;
  border-radius: 1.5rem;
`;

export const Title = styled.h1`
  font-size: clamp(2.5rem, 5vw, 3.4rem);
  padding-bottom: 1rem;
  color: ${({ theme }) => theme.color.first};
`;

export const Description = styled.p`
  font-size: 1.6rem;
  font-size: clamp(1.4rem, 3vw, 1.8rem);
`;
