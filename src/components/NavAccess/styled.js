import { keyframes, styled } from 'styled-components';

const coracao = keyframes`
  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.2);
  }
`;

export const Navbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) => theme.color.firstHover};
  max-width: 88rem;
  padding: 1rem 2rem;
  margin: auto;
  border-radius: 15px;
  transition: transform 0.5s ease;
  div {
    display: flex;
    gap: 5rem;
  }
  .link {
    text-decoration: none;
    color: white;
  }
  .link:hover {
    transition: 0.5s;
    transform: translateY(0.5rem); /* Altere o valor conforme necessário */
  }

  img {
    width: 3rem;
    animation: ${coracao} 5s linear infinite;
  }
`;
