import styled, { css, keyframes } from 'styled-components';

const animate = keyframes`
    0% {
        transform: translateY(100px);
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

export const ContainerPost = styled.a`
  animation: ${animate} 0.5s ease-in-out;
  width: min(100%, 34rem);
  height: fit-content;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  border-radius: ${({ theme }) => theme.border.radius};
  background-color: ${({ theme }) => theme.color.thirdOpacity03};
  box-shadow: 0.2rem 0.2rem 0.5rem ${({ theme }) => theme.color.shadow};
  transition: 300ms background-color;
  text-decoration: none;
  border: 0.1rem solid ${({ theme }) => theme.color.fourthOpacity};
  &:hover {
    background-color: ${({ theme }) => theme.color.third};
  }
`;

const MidiaStyled = css`
  width: 100%;
  height: 16rem;
  overflow: hidden;
  object-fit: cover;
  object-position: center center;
  transition: 300ms transform;
  position: relative;

  border-radius: ${({ theme }) => theme.border.radius};
  &:hover {
    transform: scale(1.03);
  }
`;

export const ContainerMidia = styled.div`
  background-color: ${({ theme }) => theme.color.firstOpacity};
  ${MidiaStyled}
`;

export const Image = styled.img`
  ${MidiaStyled}
`;

export const Video = styled.video`
  ${MidiaStyled}
`;

export const Tag = styled.div`
  padding: 0.6rem 1.2rem;
  width: fit-content;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.color.first};
  border-radius: ${({ theme }) => theme.border.radius};
  background-color: ${({ theme }) => theme.color.firstOpacity};
  height: 2.7rem;

  &:hover {
    background-color: ${({ theme }) => theme.color.shadow};
    color: ${({ theme }) => theme.color.fourthOpacity};
  }
`;

export const ContainerTag = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 0.5rem;
  overflow-y: scroll;
  height: 2.7rem;
  &::-webkit-scrollbar {
    width: 1rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.color.fourthOpacity};
    border-radius: 1rem;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
  &::-webkit-scrollbar-track:hover {
    background-color: ${({ theme }) => theme.color.third};
  }
`;

export const Title = styled.h2`
  font-size: ${({ theme }) => theme.font.size.base};
  color: ${({ theme }) => theme.color.fourthOpacity};
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  justify-content: space-between;

  div {
    display: flex;
    align-items: center;
    gap: 5px;
  }
`;
export const Author = styled.h3`
  font-size: ${({ theme }) => theme.font.size.xs};
  color: ${({ theme }) => theme.color.fourthOpacity};
`;

export const ContainerDeta = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Deta = styled.p`
  font-size: ${({ theme }) => theme.font.size.sm};
  color: ${({ theme }) => theme.color.fourth};
  font-weight: 700;
  position: absolute;
  bottom: 0rem;
  right: 0;
  background-image: linear-gradient( hsl(260, 0%, 0%, 0),hsl(260, 0%, 0%, .3), hsl(260, 0%, 0%, .6), hsl(260, 0%, 0%, .9));
  width: 100%;
  text-align: end;
  padding-right: .5rem;
  padding-top: .5rem;
  z-index: 1;
`;
