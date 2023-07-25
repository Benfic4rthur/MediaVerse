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
export const Header = styled.header`
  position: fixed;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
`;

export const Navbar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) => theme.color.firstHover};
  max-width: 88rem;
  padding: 1rem 2rem;
  margin: auto;
  border-radius: 15px;
  transition: transform 0.3s ease;
  div {
    display: flex;
    gap: 5rem;
  }
  .link {
    transition: transform 0.3s ease;
    text-decoration: none;
    color: white;
  }
  .link:hover {
    transform: translateY(0.3rem);
  }

  img {
    width: 3rem;
    animation: ${coracao} 5s linear infinite;
  }
`;
