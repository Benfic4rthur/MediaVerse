import { Link } from 'react-scroll';
import { styled } from 'styled-components';

export const Header = styled.header`
  position: fixed;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  width: 95%;
  z-index: 1;
`;

export const Navbar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) => theme.color.firstNav};
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
`;

export const Nav = styled.nav`
  height: fit-content;
  width: fit-content;
  position: relative;
  min-height: 100%;
  display: flex;

  @media (max-width: 800px) {
    position: absolute;
    right: 2rem;
    top: 0;
    width: fit-content;
    height: fit-content;
    gap: 1rem;
    z-index: 10;
    align-items: end;
    flex-direction: column;
    padding-top: 1.15rem;
  }
`;

export const ButtonMenuExpanded = styled.button`
  font-size: 2rem;
  padding: 0.6rem;
  border-radius: ${({ theme }) => theme.border.radius};
  background-color: ${({ theme }) => theme.color.firstHover};
  color: ${({ theme }) => theme.color.first};
  cursor: pointer;
  display: none;
  margin-right: 0.5rem;
  transition: 0.3s background-color, 0.3s color;

  @media (max-width: 800px) {
    display: flex;
  }

  &:hover {
    color: ${({ theme }) => theme.color.fourth};
    background-color: ${({ theme }) => theme.color.third};
  }
`;

export const ContainerAdaptiveMenu = styled.section`
  display: flex;
  gap: 1.5rem;
  flex-flow: row;
  width: fit-content;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s ease, width 0.3s ease, height 0.3s ease, visibility 0.1s ease;

  @media (max-width: 800px) {
    background-color: ${({ theme }) => theme.color.firstHover};
    padding: 1rem 0;
    gap: 0.8rem;
    flex-flow: column;
    border-end-end-radius: ${({ theme }) => theme.border.radius};
    border-end-start-radius: ${({ theme }) => theme.border.radius};

    width: ${props => (props.$expanded ? '24rem' : '4rem')};
    height: ${props => (props.$expanded ? '100%' : 0)};
    transform-origin: top right;
    transform: ${props => (props.$expanded ? 'scaleY(1)' : 'scaleY(0)')};
    visibility: ${props => (props.$expanded ? 'visible' : 'hidden')};
  }
`;

export const MobileMenuToggle = styled.button`
  font-size: 2rem;
  padding: 0.6rem;
  border-radius: ${({ theme }) => theme.border.radius};
  background-color: ${({ theme }) => theme.color.firstOpacity};
  color: ${({ theme }) => theme.color.first};
  cursor: pointer;
  display: none;
  margin-right: 0.5rem;
  transition: 0.3s background-color, 0.3s color;

  &:hover {
    color: ${({ theme }) => theme.color.fourth};
    background-color: ${({ theme }) => theme.color.third};
  }

  display: none;
  @media (max-width: 800px) {
    margin-right: 0.5rem;
    display: flex;
    z-index: 1;
  }
`;

export const LinkScroll = styled(Link)`
  width: 100%;
  font-size: ${({ theme }) => theme.font.size.base};
  text-align: center;
  text-decoration: none;
  white-space: nowrap;
  color: ${({ theme }) => theme.color.fourth};
  padding: 1rem 1.5rem;
  border-radius: 1rem;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    transform: translateY(0.3rem);
    transition: transform 0.3s ease;
  }

  @media (max-width: 800px) {
    padding-block: 1.5rem;
    border-radius: 0;
    transition: background-color 0.3s linear;

    &:hover {
      background-color: ${({ theme }) => theme.color.firstOpacity};
    }
  }
`;

export const LogoLinkScroll = styled(Link)`
  width: 4rem;
  cursor: pointer;
  border-radius: 1rem;
  padding-inline: 0.5rem;
  animation: ${({ theme }) => theme.animation.coracao} 3s infinite alternate;

  & img {
    width: 100%;
  }
`;
