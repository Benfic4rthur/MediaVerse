import { NavLink } from 'react-router-dom';
import { styled } from 'styled-components';
import { MaxWidth } from '../../styles/styledGlobal';

export const Header = styled.header`
  height: 7rem;
  padding: 0 2rem;
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 10px 0px;
  background-color: ${({ theme }) => theme.color.fifth};
`;

export const ContainerMaxWidth = styled.div`
  ${MaxWidth}
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

//   test
//
// export const Ttt = styled.div`
//   display: flex;
//   overflow: visible;
//   width: 100%;
//   height: 100%;
//   justify-content: space-between;
//   background-color: red;
//   align-items: center;
// `;

export const NavLinkLogo = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.7rem;
  height: min-content;
  text-decoration: none;
  border-radius: ${({ theme }) => theme.border.radius};
`;

export const Logo = styled.img`
  height: 4rem;
  margin-top: 0.6rem;
  margin-right: 0.1rem;
  text-decoration: none;
`;

export const UserName = styled.span`
  color: rgb(255, 255, 255);
  font-size: 2.5rem;
  color: white;

  font-weight: bold;

  @media (max-width: 900px) {
    color: rgb(255, 255, 255);
    font-size: 1.9rem;
    color: white;

    font-weight: bold;
    margin-bottom: 0;
  }
`;

export const Nav = styled.nav`
  height: fit-content;
  width: fit-content;
  position: relative;
  min-height: 100%;
  display: flex;

  @media (max-width: 900px) {
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

  @media (max-width: 900px) {
    display: flex;
  }

  &:hover {
    color: ${({ theme }) => theme.color.fourth};
    background-color: ${({ theme }) => theme.color.third};
  }
`;

export const ContainerAdaptiveMenu = styled.section`
  display: flex;
  gap: 5rem;
  flex-flow: row;
  width: fit-content;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s ease, width 0.3s ease, height 0.3s ease, visibility 0.1s ease;

  .link {
    padding: 1.75rem 0;
  }

  @media (max-width: 900px) {
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

export const NavLinkStyled = styled(NavLink)`
  text-decoration: none;
  color: ${({ theme }) => theme.color.fourthOpacity};
  font-size: ${({ theme }) => theme.font.size.base};
  padding: 0.5rem;
  border-radius: ${({ theme }) => theme.border.radius};
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s background-color, 0.3s color;

  &.active {
    background-color: ${({ theme }) => theme.color.firstOpacity};
    color: ${({ theme }) => theme.color.first};
  }

  &.active:hover,
  &:hover {
    color: ${({ theme }) => theme.color.fourth};
    background-color: ${({ theme }) => theme.color.third};
  }

  & span {
    display: none;
  }

  @media (max-width: 900px) {
    width: 100%;
    padding: 1.3rem;
    font-size: ${({ theme }) => theme.font.size.base};
    display: flex;
    gap: 0.5rem;
    border-radius: 0;

    & span {
      display: inline;
    }
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
  @media (max-width: 900px) {
    margin-right: 0.5rem;
    display: flex;
    z-index: 1;
  }
`;
