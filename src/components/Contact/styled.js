import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  gap: 2rem;
  width: 100%;
  padding-bottom: 8rem;
  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

export const Text = styled.p`
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: 40rem;
  width: 100%;

  h2 {
    font-size: 2.5rem;
    padding-bottom: 1rem;
  }
  p {
    font-size: 1.3rem;
    line-height: 20px;
  }
`;
export const Content = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 2rem;
`;

export const ButtonLink = styled(Link)`
  padding: 1rem;
  background: ${({ theme }) => theme.color.first};
  border-radius: 10px;
  text-decoration: none;
  font-size: 2rem;

  display: flex;
  align-items: center;
  gap: 5px;
  transition: 0.7s;

  &:hover {
    transform: scale(1.15);
    transition: 0.7s;
  }
  color: ${({ theme }) => theme.color.fourthOpacity};
`;
