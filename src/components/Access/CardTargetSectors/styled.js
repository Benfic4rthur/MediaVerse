import { keyframes, styled } from 'styled-components';

const sobe = keyframes`
0% {
    transform: translateY(100px);
    opacity: 0;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    transform: none;
    opacity: 1;
  }
`;
const desce = keyframes`
0% {
    transform: translateY(-100px);
    opacity: 0;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    transform: none;
    opacity: 1;
  }
`;

export const Sectors = styled.div`
  width: 28rem;
  height: 30rem;
  border-radius: 1rem;

  @media (max-width: 700px) {
    width: 100%;
    margin: 0 0.75rem;
  }

  p {
    margin-top: 1rem;
    font-size: 1.2rem;
  }

  &.up {
    animation: ${sobe} 1s;
  }
  &.down {
    animation: ${desce} 1s;
  }
`;

export const ContainerImage = styled.div`
  height: 25rem;
  width: 100%;
  border-radius: 1rem;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
  transition: 0.5s;
  &:hover {
    transform: scale(1.05);
    transition: 0.5s;
  }
`;
