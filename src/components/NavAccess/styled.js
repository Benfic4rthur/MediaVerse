import { styled } from 'styled-components';

export const Navbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) => theme.color.firstHover};
  max-width: 88rem;
  padding: 1rem 2rem;
  margin: auto;
  border-radius: 10px;

  div {
    display: flex;
    gap: 5rem;
  }
  .link {
    text-decoration: none;
    color: ${({ theme }) => theme.color.fourthOpacity};
  }
  .link:hover {
    transition: 1s;
    transform: scale(1.15);
  }

  img {
    width: 8rem;
  }
`;
