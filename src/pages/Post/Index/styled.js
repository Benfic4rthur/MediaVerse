/* eslint-disable import/no-named-as-default */
import styled, { css, keyframes } from 'styled-components';

const animate = keyframes`
    0% {
        transform: translateX(-100px);
        opacity: 0;
    }
    50%{
        opacity: .3;
    }
    100%{
        transform: translateX(0px);
        opacity: 1;
    }
`;

export const ContainerMain = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
  gap: 2rem;

  @media (max-width: 1080px) {
    gap: 4rem;
    flex-flow: column;
  }
`;

export const ContainerSidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 35%;

  @media (max-width: 1080px) {
    width: 100%;
  }
`;

export const Container = styled.div`
  margin: 0 auto;
  display: flex;
  flex-flow: column;
  width: 100%;
  gap: 1rem;
`;

export const MidiaStyled = css`
  /* width: ${props => (props.$vertical ? 'initial' : 'min(100%, 75rem)')}; */
  /* min-height: ${props => (props.$vertical ? '100%' : 'initial')}; */
  width: 100%;
  max-height: 50rem;
  object-fit: contain;
  box-shadow: 0.3rem 0.3rem 1rem 0.3rem ${({ theme }) => theme.color.shadow};
  border-radius: 1rem;
  margin: 0 auto;
  color: ${({ theme }) => theme.color.fourthOpacity};
  background-color: ${({ theme }) => theme.color.fourthBg};
  animation: ${animate} 0.5s ease-in-out;
`;

export const ImageStyled = styled.img`
  ${MidiaStyled}
`;

export const VideoStyled = styled.video`
  ${MidiaStyled}
`;

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.font.size.xl};
  font-family: ${({ theme }) => theme.font.family.robotoSlab};
  color: ${({ theme }) => theme.color.fourth};
  padding: 1rem;
`;

export const ContainerTag = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
`;

export const ContainerInfo = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
`;

export const Tag = styled.p`
  font-size: ${({ theme }) => theme.font.size.sm};
  white-space: nowrap;
  padding: 0.6rem;
  border-radius: ${({ theme }) => theme.border.radius};
  background-color: ${({ theme }) => theme.color.third};
  width: fit-content;
  box-shadow: 0.2rem 0.2rem 0.5rem ${({ theme }) => theme.color.shadow};
  text-transform: lowercase;
  color: ${({ theme }) => theme.color.fourth};

  &:hover {
    background-color: ${({ theme }) => theme.color.firstOpacity};
    color: ${({ theme }) => theme.color.fourth};
  }
`;

export const Body = styled.p`
  font-size: ${({ theme }) => theme.font.size.sm};
  line-height: ${({ theme }) => theme.font.lineHeight};
  color: ${({ theme }) => theme.color.fourth};
  text-align: justify;
  white-space: pre-wrap;
  padding-block: 1.5rem;
  text-indent: 1.2rem;
  border-radius: 0.5rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  background-color: ${({ theme }) => theme.color.firstOpacity};
  min-height: 75px;
  box-shadow: 0.2rem 0.2rem 0.5rem ${({ theme }) => theme.color.shadow};
  padding: 15px;
`;

export const Author = styled.p`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  font-size: ${({ theme }) => theme.font.size.sm};
  color: ${({ theme }) => theme.color.fourth};
`;

export const Views = styled.p`
  padding: 0.6rem;
  border-radius: ${({ theme }) => theme.border.radius};
  background-color: ${({ theme }) => theme.color.thirdOpacity03};
  width: fit-content;
  box-shadow: 0.2rem 0.2rem 0.5rem ${({ theme }) => theme.color.shadow};
  text-transform: lowercase;
  font-size: ${({ theme }) => theme.font.size.sm};
  color: ${({ theme }) => theme.color.fourth};
  align-items: center;
  display: flex;
`;
export const NavLinkStyled = styled.a`
  text-decoration: none;
  color: white;
  font-size: 2.5rem;
  display: flex;
  text-decoration: none;
  transition: 300ms color;
  padding: 0.5rem;
  border-radius: 50px;
  background-color: ${({ theme }) => theme.color.first};
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: ${({ theme }) => theme.font.size.sm};
  transition: transform 200ms linear, background-color 200ms linear;

  &:hover {
    background-color: ${({ theme }) => theme.color.firstHover};
    transform: scale(1.05);
  }
`;

export const LinkShare = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 2px;
`;

export const SpaceShare = styled.div`
  display: flex;
  gap: 1rem;
`;
export const VideoStyledBlockDownload = styled(VideoStyled)`
/* Impede o menu de contexto (três pontinhos) nos controles de vídeo */
pointer-events: none;
`;