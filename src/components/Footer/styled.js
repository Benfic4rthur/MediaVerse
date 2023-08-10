import styled from 'styled-components';
import { MaxWidth } from '../../styles/styledGlobal';

export const Footer = styled.footer`
  height: 7.5rem;
  color: white;
  width: 100%;
  background-color: ${({ theme }) => theme.color.fifth};
  font-size: 1.2rem;
  text-align: center;
  display: flex;
  padding-inline: min(4vw, 3rem);
`;

export const ContainerMaxWidth = styled.div`
  justify-content: ${props => (!props?.$justify ? 'center ' : 'space-between')};

  ${MaxWidth}
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: ${props => (!props?.$justify ? 'center ' : 'space-between')};

  gap: 0.4rem;
`;

export const LinkImgFooter = styled.a`
  min-height: 2.2rem;
  display: block;
  padding: 0.3rem;
  padding-bottom: 0rem;
  border-radius: ${({ theme }) => theme.border.radius};
`;

export const ImgFooter = styled.img`
  min-height: 2.2rem;
  width: 2.4rem;
`;

export const NavLinkStyled = styled.a`
  text-decoration: none;
  color: white;
  font-size: 2.2rem;
  display: flex;
  justify-content: end;
  text-decoration: none;
  transition: 300ms color;
  padding: 0.5rem;
  border-radius: 3rem;
  background-color: ${({ theme }) => theme.color.first};

  &:hover {
    color: ${({ theme }) => theme.color.fifth};
    transform: translateY(0.5rem);
  }
`;

export const NavLinkWhatsapp = styled(NavLinkStyled)`
  position: fixed;
  z-index: 100;
  bottom: 2.3rem;
  border-radius: 3rem;
  font-size: 2.2rem;
  background-color: ${({ theme }) => theme.color.first};
  transform: rotate(40deg);
  animation: ${({ theme }) => theme.animation.balancinho} 1s alternate infinite;
`;

export const ContainerLink = styled.div`
  display: flex;
  flex-direction: row-reverse;
  gap: 0.5rem;
  position: relative;
`;

export const Invesible = styled(NavLinkStyled)`
  opacity: 0;
  visibility: hidden;
`;
