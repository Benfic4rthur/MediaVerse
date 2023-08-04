import { NavLink } from 'react-router-dom';
import { css, styled } from 'styled-components';
import { MaxWidth } from '../../styles/styledGlobal';

export const Header = styled.header`
  height: 7rem;
  padding: 0 2rem;
  z-index: 1;
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

export const NavLinkLogo = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.7rem;
  z-index: 2;
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
  /* color: ${({ theme }) => theme.color.first}; */
  background: linear-gradient(to bottom, rgb(111, 135, 236), rgb(86, 112, 234), rgb(61, 91, 231));
  -webkit-background-clip: text;
  color: transparent;
  font-family: ${({ theme }) => theme.font.family.second};
  /* font-size: clamp(1.9rem, 3vw, 2.8rem); */
  font-size: 1.7rem;
  margin-top: 1.1rem;
  margin-left: -.5rem;
`;

export const Nav = styled.nav`
  width: fit-content;
  height: 100%;
  position: relative;
  min-height: 100%;
  display: flex;
  padding: 1rem 0;

  @media (max-width: 1000px) {
    position: absolute;
    right: 0;
    top: 0;
    gap: 1rem;
    z-index: 1;
    align-items: end;
    flex-direction: column;
  }
`;

export const ContainerMenu = styled.section`
  height: 100%;
  display: flex;

  gap: 1rem;
  position: relative;
  flex-flow: row;
  width: fit-content;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s ease, width 0.3s ease, height 0.3s ease, visibility 0.1s ease;
`;

export const ContainerAdaptiveMenu = styled.div`
  position: absolute;
  top: 0rem;
  right: 0;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  align-items: end;
`;

// export const Cont = styled.div`
//   position: relative;
//   top: 0rem;
//   right: 0;
//   display: flex;
//   flex-direction: column;
//   gap: 0.6rem;
//   align-items: end;

//   @media (min-width: 1000px) {
//     transition: transform 0.3s ease, width 0.3s ease, height 0.3s ease, visibility 0.1s ease;
//     position: absolute;
//     gap: 0.8rem;
//     flex-flow: column;
//     border-end-end-radius: ${({ theme }) => theme.border.radius};
//     border-end-start-radius: ${({ theme }) => theme.border.radius};

//     transform-origin: top right;
//     transform: scaleY(0);
//     visibility: hidden;
//   }
// `;

export const RowMenu = styled.section`
  display: flex;
  gap: 1rem;
  z-index: 1;
  flex-flow: row;
  width: fit-content;

  justify-content: center;
  align-items: center;
  @media (max-width: 1000px) {
    padding-bottom: 1rem;
    gap: 0.8rem;
    flex-flow: column;
    border-end-end-radius: ${({ theme }) => theme.border.radius};
    border-end-start-radius: ${({ theme }) => theme.border.radius};

    transform-origin: top right;
    transform: scaleY(0);
    visibility: hidden;
  }
`;

export const Menu = styled.div`
  width: ${props => (props.$expanded ? '24rem' : '4rem')};
  height: ${props => (props.$expanded ? '100%' : 0)};
  border-end-end-radius: ${({ theme }) => theme.border.radius};
  background-color: ${({ theme }) => theme.color.fifth};

  padding-bottom: 1rem;
  display: flex;
  gap: 0.8rem;
  flex-flow: column;
  border-end-start-radius: ${({ theme }) => theme.border.radius};
  transition: transform 0.3s ease, width 0.3s ease, height 0.3s ease, visibility 0.1s ease;
  transform: ${props => (props.$expanded ? 'scaleY(1)' : 'scaleY(0)')};
  transform-origin: top right;
  visibility: ${props => (props.$expanded ? 'visible' : 'hidden')};
`;

export const NavLinkStyled = styled(NavLink)`
  text-decoration: none;
  color: ${({ theme }) => theme.color.fourthOpacity};
  font-size: ${({ theme }) => theme.font.size.base};
  padding: 0.5rem;
  border-radius: ${({ theme }) => theme.border.radius};
  display: flex;
  white-space: nowrap;
  justify-content: center;
  align-items: center;
  transition: 0.3s background-color, 0.3s color;
  width: 100%;
  padding: 1.3rem;
  font-size: ${({ theme }) => theme.font.size.base};
  display: flex;
  gap: 0.5rem;
  border-radius: 0;

  &.active {
    background-color: ${({ theme }) => theme.color.firstOpacity};
    color: ${({ theme }) => theme.color.first};
  }

  &.active:hover,
  &:hover {
    color: ${({ theme }) => theme.color.fourth};
    background-color: ${({ theme }) => theme.color.third};
  }
`;

const HiddenNavLink = css`
  position: absolute;
  transform-origin: top right;
  transform: scaleY(0);
  visibility: hidden;
`;

const a1 = "660px"
const a2 = "750px"
const a3 = "870px"
const a4 = "1020px"
const a5 = "1100px"

export const NavLinkRowMenu = styled(NavLinkStyled)`
  border-radius: ${({ theme }) => theme.border.radius};

  &.a1 {
    @media (max-width: ${a1}) {
      ${HiddenNavLink}
    }
  }
  &.a2 {
    @media (max-width: ${a2}) {
      ${HiddenNavLink}
    }
  }
  &.a3 {
    @media (max-width: ${a3}) {
      ${HiddenNavLink}
    }
  }
  &.a4 {
    @media (max-width: ${a4}) {
      ${HiddenNavLink}
    }
  }
  /* &.a5 {
    @media (max-width: ${a5}) {
      ${HiddenNavLink}
    }
  } */
`;

export const NavLinkMenuExpanded = styled(NavLinkStyled)`
  &.a1 {
    @media (min-width: ${a1}) {
      ${HiddenNavLink}
    }
  }
  &.a2 {
    @media (min-width: ${a2}) {
      ${HiddenNavLink}
    }
  }
  &.a3 {
    @media (min-width: ${a3}) {
      ${HiddenNavLink}
    }
  }
  &.a4 {
    @media (min-width: ${a4}) {
      ${HiddenNavLink}
    }
  }
  /* &.a5 {
    @media (min-width: ${a5}) {
      ${HiddenNavLink}
    }
  } */
`;

export const ButtonMenuExpanded = styled.button`
  min-height: 5rem;
  min-width: 5rem;
  border-radius: 50%;
  overflow: hidden;
  background-color: ${({ theme }) => theme.color.firstOpacity};
  color: ${({ theme }) => theme.color.first};
  cursor: pointer;
  transition: 0.3s background-color, 0.3s color;
  display: flex;
  z-index: 1;

  &:hover {
    color: ${({ theme }) => theme.color.fourth};
    background-color: ${({ theme }) => theme.color.third};
  }

  &.hidden {
    visibility: hidden;
  }
`;
