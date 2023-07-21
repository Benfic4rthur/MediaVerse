import styled, { css, keyframes } from 'styled-components';

export const ContainerPost = styled.div`
  min-height: 32.32rem;
  width: min(100%, 36rem);
  padding: 3rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  border-radius: ${({ theme }) => theme.border.radius};
  background-color: ${({ theme }) => theme.color.thirdOpacity03};
  box-shadow: 2px 2px 5px ${({ theme }) => theme.color.shadow};
  transition: 300ms background-color;
  text-decoration: none;
  border: 1px solid ${({ theme }) => theme.color.fourthOpacity};
`;

const MidiaStyled = css`
  width: 100%;
  height: 18rem;
  overflow: hidden;
  object-fit: cover;
  object-position: center center;
  border-radius: ${({ theme }) => theme.border.radius};
`;

const skeletonKey = keyframes`
  0% {
    background-position: -250%;
  }

  100% {
    background-position: 250%;
  }
`;

export const SkeletonAnimated = css`
  animation: ${skeletonKey} 2s ease-in-out infinite;
  animation-delay: 0.2s;
  background-image: linear-gradient(90deg, transparent, hsla(225, 11%, 32%, 0.2), transparent);
  background-color: ${({ theme }) => theme.color.firstOpacity};
  background-size: 190%;
  background-repeat: no-repeat;
  border-radius: ${({ theme }) => theme.border.radius};
  width: 100%;
`;

export const ContainerMidia = styled.div`
  display: inline-block;
  min-height: 18rem;
  ${SkeletonAnimated}
  border-radius: 4px;
  margin-bottom: 4px;
  margin-top: ${props => props.marginTop || '0'};
  ${MidiaStyled}
`;

export const Tag = styled.div`
  padding: 0.6rem 1.2rem;
  width: fit-content;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.color.fourthBg};
  border-radius: ${({ theme }) => theme.border.radius};
  background-color: ${({ theme }) => theme.color.firstOpacity};
  height: 27px;
`;

export const Title = styled.div`
  ${SkeletonAnimated}
  height: 1.8rem;
`;

export const Author = styled.div`
  ${SkeletonAnimated}
  height: 1.4rem;
`;

export const ContainerTag = styled.div`
  ${SkeletonAnimated}
  height: 2.5rem;
`;
