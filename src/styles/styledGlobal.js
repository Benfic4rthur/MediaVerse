import { LuLoader2 } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import styled, { css, keyframes } from 'styled-components';

export const containerStyleBody = css`
  background-image: linear-gradient(120.21deg, #888f93 11.18%, #0c6870 74.17%);
  background-repeat: no-repeat;
  background-size: cover;
  padding: 0;
  margin: 0;
  width: 100%;
  font-family: ${({ theme }) => theme.font.family.primary};
  min-height: 100vh;
  height: 100%;
`;

export const ContainerHidden = styled.div`
  height: 100%;
  min-height: 100vh;
  max-width: 100vw;
  width: 100%;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: min-content auto min-content;
`;

export const MaxWidth = css`
  margin: 0 auto;
  height: 100%;
  width: min(100%, 145rem);
`;

export const Main = styled.main`
  ${MaxWidth}
  padding-block: 4rem;
  padding-inline: min(5%, 2rem);
`;

export const ContainerCenter = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

export const CreatePostButton = styled.a`
  background-color: ${({ theme }) => theme.color.first};
  filter: saturate(0.95);
  z-index: 0;

  text-decoration: none;
  color: ${({ theme }) => theme.color.fourth};
  white-space: nowrap;
  font-size: ${({ theme }) => theme.font.size.base};

  border-radius: ${({ theme }) => theme.border.radius};
  box-shadow: 2px 2px 5px ${({ theme }) => theme.color.shadow};

  padding: 1.5rem 3rem;

  display: flex;
  justify-content: center;
  gap: 1rem;
  align-items: center;

  transition: 300ms color, 300ms background-color;

  &:hover {
    background-color: ${({ theme }) => theme.color.firstHover};
  }
`;

export const SearchForm = styled.form`
  width: 100%;
  max-width: 40rem;
  display: grid;
  grid-template-columns: auto 6rem;
  box-shadow: 2px 2px 5px ${({ theme }) => theme.color.shadow};
  border-radius: ${({ theme }) => theme.border.radius};
`;

export const SearchInput = styled.input`
  min-width: 100%;
  border-bottom-left-radius: ${({ theme }) => theme.border.radius};
  border-top-left-radius: ${({ theme }) => theme.border.radius};
  padding: 1.2rem 1.2rem 1.2rem 2.3rem;
  background-color: ${({ theme }) => theme.color.fourth};
`;

export const SearchButton = styled.button`
  font-size: ${({ theme }) => theme.font.size.lg};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-bottom-right-radius: ${({ theme }) => theme.border.radius};
  border-top-right-radius: ${({ theme }) => theme.border.radius};
  background-color: ${({ theme }) => theme.color.fifth};
  color: ${({ theme }) => theme.color.fourth};
`;

export const PostsNotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
`;

export const PostsNotFoundTitle = styled.h3`
  font-size: ${({ theme }) => theme.font.size.lg};
  color: ${({ theme }) => theme.color.fourthBg};
`;

const spinAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const LinkStyled = styled(Link)`
  border-radius: ${({ theme }) => theme.border.radius};
  color: ${({ theme }) => theme.color.first};
  transition: 0.3s color linear;
  &:hover {
    color: ${({ theme }) => theme.color.firstHover};
  }
`;

export const ContainerSpinerLoading = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  place-items: center;
`;

export const SpinerLoading = styled(LuLoader2)`
  animation: ${spinAnimation} 0.9s linear infinite;
`;

// --------------------- //

export const MaxWidthScrollbar = styled.div`
  width: 100%;

  overflow: overlay;

  &::-webkit-scrollbar {
    width: 0.8rem;
    height: 0.8rem;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.color.first};
    border-radius: ${({ theme }) => theme.border.radius};
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.color.firstHover};
  }
`;

export const Title = styled.h2`
  color: ${({ theme }) => theme.color.third};
  font-size: ${({ theme }) => theme.font.size.xl};
  line-height: ${({ theme }) => theme.font.lineHeight};
  font-family: ${({ theme }) => theme.font.family.primary};
  font-weight: ${({ theme }) => theme.font.weight.medium};
`;

export const Subtitle = styled.h2`
  color: ${({ theme }) => theme.color.fourthOpacity};
  font-size: clamp(
    ${({ theme }) => theme.font.size.lgs},
    5vw,
    ${({ theme }) => theme.font.size.lg}
  );
  line-height: ${({ theme }) => theme.font.lineHeight};
  font-family: ${({ theme }) => theme.font.family.primary};
  font-weight: ${({ theme }) => theme.font.weight.medium};
`;

export const ButtonProportions = styled.button`
  border-radius: ${({ theme }) => theme.border.radius};
  height: 5.6rem;
  display: flex;
  justify-content: center;
  line-height: ${({ theme }) => theme.font.lineHeight};
  cursor: pointer;

  align-items: center;
`;

export const Button = styled(ButtonProportions)`
  width: 100%;
  border-radius: ${({ theme }) => theme.border.radius};
  background-color: ${({ theme }) => theme.color.first};
  color: ${({ theme }) => theme.color.firstHover};
  font-size: ${({ theme }) => theme.font.size.base};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  font-family: ${({ theme }) => theme.font.family.primary};

  :focus {
    outline: 2px solid ${({ theme }) => theme.color.fourth};
    outline-offset: 3px;
  }
`;

export const ButtonSmall = styled.button`
  height: 4.8rem;
  width: 100%;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.color.first};

  color: ${({ theme }) => theme.color.firstHover};
  font-size: ${({ theme }) => theme.font.size.base};
  font-weight: ${({ theme }) => theme.font.weight.regular};
  font-family: ${({ theme }) => theme.font.family.primary};

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
`;
