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

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;
export const Sectors = styled.div`
  background: ${({ theme }) => theme.color.first};
  width: 20%;
  height: 25rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;

  &.up {
    animation: ${sobe} 1s;
  }
  &.down {
    animation: ${desce} 1s;
  }

  img {
    width: 75%;
  }

  div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
