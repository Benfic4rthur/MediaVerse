import { styled, keyframes } from 'styled-components';

export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 10rem;
  width: 100%;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.color.fourth};
  background: ${({ theme }) => theme.color.firstHover};

  img {
    width: 5rem;
  }

  .link {
    text-decoration: none;
    color: white;
    font-size: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const Social = styled.div`
  display: flex;
  gap: 1rem;
`;

// export const ContainerFooter = styled.footer`
//   background: ${({ theme }) => theme.color.firstHover};
//   width: 100%;
// `;
