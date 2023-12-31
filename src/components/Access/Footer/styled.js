import { styled } from 'styled-components';

export const Footer = styled.div`
  display: flex;
  padding-inline: 0.5rem;
  align-items: center;
  gap: 1rem;
  justify-content: space-around;
  height: 10rem;
  width: 100%;
  text-align: center;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.color.fourth};
  background: ${({ theme }) => theme.color.firstNav};
  padding: 0 1rem;

  img {
    width: 4rem;
    margin-right: 1.5rem;
  }

  .link {
    text-decoration: none;
    color: white;
    font-size: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.3s;
    &:hover {
      transform: scale(1.2);
      transition: 0.3s;
    }
  }

  @media (max-width: 700px) {
    .spaceText {
      width: 50%;
    }
  }
`;

export const Social = styled.div`
  display: flex;
  gap: 0.75rem;
`;
