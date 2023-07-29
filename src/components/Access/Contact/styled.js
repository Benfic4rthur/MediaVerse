import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding-inline: .5rem;
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
  max-width: 45rem;
  width: 100%;

  /*
  @media (max-width: 900px) {
    h2 {
      font-size: 2.5rem;
      padding-bottom: 1rem;
    }

    p {
      font-size: 1.3rem;
      line-height: 20px;
    }
  } */
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
  color: white;
`;

export const Title = styled.h2`
    font-size: clamp(2.5rem, 5vw, 3.4rem);
    padding-bottom: 1rem;
`;

export const Description = styled.p`
  font-size: 1.6rem;
  font-size: clamp(1.4rem, 3vw, 1.8rem);

  line-height: 20px;
`;
