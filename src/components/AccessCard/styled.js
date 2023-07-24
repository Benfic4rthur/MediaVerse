import styled, { css, keyframes } from 'styled-components';

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

const showingReverse = keyframes`
   0% {
    opacity: 0;
    transform: translateX(100px);
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
  display: grid;
  grid-template-rows: auto, auto;
  align-items: center;
  padding: 0.8rem;
  gap: 1.2rem;

  @media (min-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 3%;
  }
`;

export const ContainerMedia = styled.div`
  aspect-ratio: 16 / 9;
  background-color: rgb(0 0 0 / 0.5);
  border-radius: 1.2rem;
  overflow: hidden;
  &.left{
    animation: ${showing} 1s;
  }
  &.right{
    animation: ${showingReverse} 1s;
  }
`;

const Media = css`
  object-position: center;
  min-width: 100%;
  object-fit: cover;
`;

export const Image = styled.img`
  ${Media}
`;

export const Video = styled.video`
  ${Media}
`;

export const ContainerInfos = styled.div`
  flex-direction: column;
  gap: 1.2rem;
  display: flex;
  justify-content: center;
  @media (min-width: 800px) {
    order: ${props => (props.$reverse ? -1 : 1)};
  }
  &.left{
    animation: ${showing} 1s;
  }
  &.right{
    animation: ${showingReverse} 1s;
  }
`;

export const Title = styled.h3`
  padding-top: 0.8rem;
  font-size: ${({ theme }) => theme.font.size.lg};
  color: ${({ theme }) => theme.color.fourth};

  @media (min-width: 1024px) {
    font-size: ${({ theme }) => theme.font.size.xl};
  }
`;

export const Description = styled.p`
  color: ${({ theme }) => theme.color.fourth};
  font-size: ${({ theme }) => theme.font.size.base};
  font-weight: 500;
  padding-bottom: 1.6rem;

  @media (min-width: 1024px) {
    font-size: ${({ theme }) => theme.font.size.lgs};
  }
`;

export const HR = styled.hr`
  @media (min-width: 800px) {
    /* animate-showing */
  }
`;

export const container = css`
  .container {
    width: 100%;
  }
  @media (min-width: 640px) {
    .container {
      max-width: 640px;
    }
  }
  @media (min-width: 800px) {
    .container {
      max-width: 800px;
    }
  }
  @media (min-width: 1024px) {
    .container {
      max-width: 1024px;
    }
  }
  @media (min-width: 1280px) {
    .container {
      max-width: 1280px;
    }
  }
  @media (min-width: 1536px) {
    .container {
      max-width: 1536px;
    }
  }
`;
