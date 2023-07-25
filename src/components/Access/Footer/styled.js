import { styled } from 'styled-components';

export const Footer = styled.div`
  display: flex;
  padding-inline: .5rem;
  align-items: center;
  gap: 1rem;
  justify-content: space-around;
  height: 10rem;
  width: 100%;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.color.fourth};
  background: ${({ theme }) => theme.color.firstHover};

  img {
    width: 3.8rem;
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
`;

export const Social = styled.div`
  display: flex;
  gap: 1rem;
`;
