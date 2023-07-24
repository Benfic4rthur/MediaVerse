import { styled, keyframes } from 'styled-components';

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

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10rem;
`;

export const ContainerSectors = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;

  @media (max-width: 800px) {
    flex-direction: column;
    background-color: red;
  }
`;

export const ContainerImage = styled.div`
height: 100%;
width: 100%;
`
export const Sectors = styled.div`
  background: ${({ theme }) => theme.color.first};
  width: 20rem;
  height: 15rem;
  border-radius: 1rem;

  &.up {
    animation: ${sobe} 1s;
  }
  &.down {
    animation: ${desce} 1s;
  }

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
  }
`;


