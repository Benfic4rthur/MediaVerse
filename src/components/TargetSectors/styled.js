import { styled } from 'styled-components';

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

  img {
    width: 75%;
  }

  div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
