import styled, { css } from 'styled-components';
import { SkeletonAnimated } from '../SkeletonPostDetailsHome/styled';

export const Container = styled.a`
  height: fit-content;
  width: 12rem; /* Adjusted width to fit 8 posts per line */
  background-color: ${({ theme }) => theme.color.thirdOpacity03};
  color: ${({ theme }) => theme.color.fourthBg};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  width: 14.8rem;
  padding: 1.5rem;
  padding-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: ${({ theme }) => theme.border.radius};
  box-shadow: 2px 2px 5px ${({ theme }) => theme.color.shadow};
  text-decoration: none;
  transition: 300ms background-color, 300ms color, 300ms text-decoration;

  &:hover {
    background-color: ${({ theme }) => theme.color.firstOpacity};
    color: ${({ theme }) => theme.color.firstHover};
    transform: scale(1.1);
    /* text-decoration: underline; */
  }
`;

const MidiaStyled = css`
  width: 12rem;
  height: 12rem;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.border.radius};
  overflow: hidden;
`;

export const ContainerMidia = styled.div`
  ${SkeletonAnimated}
  ${MidiaStyled}
`;

export const Title = styled.h2`
  ${SkeletonAnimated}
  height: 2rem;
  width: 100%;
`;
