import { styled } from 'styled-components';

export const Progress = styled.progress`
  border-radius: 1rem;
  width: min(100%, 30rem);
  border-radius: 5rem;
  overflow: hidden;
  height: 1.5rem;

  &::-webkit-progress-inner-element {
  }

  &::-webkit-progress-bar {
    background-color: ${({ theme }) => theme.color.thirdOpacity03};
  }

  &::-webkit-progress-value {
    background-color: hsl(110, 90%, 30%);
  }
`;

export const Error = styled.p`
  padding: 0.8rem;
  font-size: 1.2rem;
  color: hsl(0, 50%, 50%);
  border-radius: 1rem;
  width: max-content;
  margin: 0 auto;
  background-color: hsl(0, 80%, 90%);
`;

export const ContainerFlex = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  gap: .7rem;

  & .red,
  & > div {
    flex: 1 1 27rem;
    width: 100%;
    min-width: initial;
  }
`;

export const ContainerForm = styled.section`
  height: fit-content;
  width: min(100%, 70rem);
  display: flex;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: .7rem;

  > h1 {
    font-size: 2rem;
    font-weight: bold;
  }
`;

export const Form = styled.form`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.7rem;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

export const ContainerVideo = styled.div`
  background-color: ${({ theme }) => theme.color.fourthHover};
  border-radius: ${({ theme }) => theme.border.radius};
  color: ${({ theme }) => theme.color.fourthBg};
  border: 0.1rem solid ${({ theme }) => theme.color.fourthOpacity};
  font-family: ${({ theme }) => theme.font.family.primary};
  line-height: ${({ theme }) => theme.font.lineHeight};
  padding: 1.5rem;
`;

export const Video = styled.video`
  max-height: 400px;
  width: 100%;
  aspect-ratio: 16 / 9;
  background-color: black;
`;

export const ContainerTags = styled.div`
  display: flex;
  flex-flow: wrap;
  gap: 0.5rem;
  background-color: ${({ theme }) => theme.color.fourthHover};
  border-radius: ${({ theme }) => theme.border.radius};
  color: ${({ theme }) => theme.color.fourthBg};
  border: 0.1rem solid ${({ theme }) => theme.color.fourthOpacity};
  padding: 0.8rem;
  width: 100%;
`;

export const Tag = styled.div`
  background-color: ${({ theme }) => theme.color.third};
  border-radius: ${({ theme }) => theme.border.radius};
  color: ${({ theme }) => theme.color.fourthBg};
  border: 0.1rem solid ${({ theme }) => theme.color.fourthOpacity};
  font-family: ${({ theme }) => theme.font.family.primary};
  line-height: ${({ theme }) => theme.font.lineHeight};
  font-size: 1.3rem;
  display: flex;
  max-width: 100%;
  align-items: center;
  gap: 0.7rem;

  padding-inline: 0.9rem;
  height: 4rem;

  p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const TagUrl = styled.img`
  height: 3rem;
  min-width: 3rem;
  width: 3rem;
  object-fit: cover;
  object-position: center center;
  overflow: hidden;
  border-radius: 0.5rem;
`;

export const ButtonTag = styled.button`
  border-radius: ${({ theme }) => theme.border.radius};
  background-color: ${({ theme }) => theme.color.firstBg};
  font-size: ${({ theme }) => theme.font.size.sm};
  color: ${({ theme }) => theme.color.first};
  height: 2rem;
  width: 2rem;
  display: grid;
  place-items: center;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-left: 5px;

  &:hover {
    background-color: ${({ theme }) => theme.color.thirdBg};
  }
`;

export const NotTags = styled.span`
  padding-left: 1rem;
  font-size: ${({ theme }) => theme.font.size.base};
`;
