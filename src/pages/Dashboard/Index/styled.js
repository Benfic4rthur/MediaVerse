import { styled } from 'styled-components';
export const ContainerHeader = styled.section`
  display: flex;
  z-index: 0;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  margin: 0 auto;
  padding-bottom: 2rem;

  @media (max-width: 1250px) {
    width: 100%;
  }
`;
export const ContainerCreatePost = styled.div`
  display: flex;
  height: 100%;
  width: 80%;
  margin: 0 auto;
  flex-direction: column;
  gap: 1.5rem;
  box-shadow: 0.2rem 0.2rem 0.5rem ${({ theme }) => theme.color.shadow};
  background-color: ${({ theme }) => theme.color.secondBg};
  padding: 1.5rem 1rem;
  border-radius: ${({ theme }) => theme.border.radius};

  @media (max-width: 1250px) {
    width: 100%;
  }
`;

export const CreatePostTitle = styled.h2`
  display: inline-block;
  width: fit-content;
  margin: 0 auto;
  font-size: 1.6rem;
  color: ${({ theme }) => theme.color.fourthOpacity};
  padding-bottom: 5rem;
  @media screen and (max-width: 400px) {
    font-size: 1rem;
  }
`;

export const ContainerPost = styled.section`
  display: flex;
  height: 100%;
  width: 80%;
  margin: 0 auto;

  flex-direction: column;
  gap: 1.5rem;
  box-shadow: 0.2rem 0.2rem 0.5rem ${({ theme }) => theme.color.shadow};
  background-color: ${({ theme }) => theme.color.secondBg};
  padding: 1.5rem 1rem;
  border-radius: ${({ theme }) => theme.border.radius};

  @media (max-width: 1250px) {
    width: 100%;
  }
`;

export const Post = styled.div`
  display: grid;
  grid-template-areas: 'Dialog Title Date Event';
  grid-template-columns: min-content 1fr min-content min-content;
  grid-template-rows: 1fr;
  align-items: center;
  border: 0.1rem solid ${({ theme }) => theme.color.fourthOpacity};
  gap: 1rem;
  padding: 1rem 1.5rem;
  box-shadow: 0.2rem 0.2rem 0.5rem ${({ theme }) => theme.color.shadow};
  background-color: ${({ theme }) => theme.color.thirdOpacity03};
  border-radius: 0.5rem;
  transition: 200ms linear background-color;

  &:hover {
    background-color: ${({ theme }) => theme.color.third};
  }

  /* @media (max-width: 65rem) {
    grid-template-columns: auto min-content;
    grid-template-rows: min-content auto min-content;
    grid-template-areas:
      'Dialog Event'
      'Title Title'
      'Date Date';
  } */
`;

export const ContainerToggle = styled.div`
  display: flex;
  flex-flow: row;
  gap: 1rem;
`;

export const ContainerFormToggle = styled.form`
  display: flex;
  flex-flow: row;
  gap: 1rem;

  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

export const TitleToggle = styled.h3`
  font-family: ${({ theme }) => theme.font.family.roboto};
  font-weight: 500;
  color: ${({ theme }) => theme.color.fourth};
  font-size: ${({ theme }) => theme.font.size.sm};
  align-items: center;
  flex-direction: column;
  cursor: default;
`;

export const ContainerDialog = styled.div`
  grid-area: Dialog;
  width: min-content;
  height: min-content;
`;

export const ContainerTitlePost = styled.div`
  grid-area: Title;
  display: grid;
  flex-flow: column;
  gap: 1rem;
  align-items: flex-start;
`;

export const ContainerDate = styled.div`
  grid-area: Date;
  display: flex;
  flex-flow: column;
  gap: 1.3rem;
  flex: 1 1;
  align-items: flex-start;
  @media (max-width: 65rem) {
    flex-flow: row;
    justify-content: space-between;
  }
`;

export const ContainerButtonEvent = styled.section`
  grid-area: Event;
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

export const TitlePost = styled.h3`
  font-family: ${({ theme }) => theme.font.family.roboto};
  font-weight: 500;
  color: ${({ theme }) => theme.color.fourth};
  font-size: ${({ theme }) => theme.font.size.sm};
  align-items: center;
  flex-direction: column;
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  cursor: default;
`;

export const Author = styled(TitlePost)`
  cursor: default;
`;

export const Deta = styled.p`
  font-size: ${({ theme }) => theme.font.size.xs};
  color: ${({ theme }) => theme.color.fourthOpacity};
  padding-right: 1rem;
  cursor: default;
`;

export const Views = styled.p`
  font-size: ${({ theme }) => theme.font.size.xs};
  color: ${({ theme }) => theme.color.fourthOpacity};
  display: flex;
  align-items: center;
  gap: 0.2rem;
  cursor: default;
`;

export const ContainerMediaPreview = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 1rem;
  overflow: hidden;
  cursor: pointer;
  background-color: ${({ theme }) => theme.color.firstOpacity};

  &:hover {
    transform: scale(1.05);
  }
`;

export const MediaPreview = styled.img`
  width: 100%;
  height: 100%;
  object-position: center center;
  object-fit: cover;
  transform: scale(1.06);
`;

export const InputRadial = styled.input`
  height: min-content;
  border-radius: 50%;
`;

export const ButtonEvent = styled.button`
  display: flex;
  background-color: ${({ theme }) => theme.color.fourthHover};
  font-size: ${({ theme }) => theme.font.size.base};
  color: ${({ theme }) => theme.color.fourth};
  min-width: 3rem;
  width: 3rem;
  height: 3rem;
  justify-content: center;
  align-items: center;
  box-shadow: 0.2rem 0.2rem 0.5rem ${({ theme }) => theme.color.shadow};
  border-radius: ${({ theme }) => theme.border.radius};
  cursor: pointer;
  transition: 300ms color, 300ms background-color;
  &:hover {
    color: ${({ theme }) => theme.color.fourthOpacity};
    background-color: ${({ theme }) => theme.color.firstOpacity};
  }

  &.delete:hover {
    color: ${({ theme }) => theme.color.error};
    background-color: ${({ theme }) => theme.color.third};
  }
`;
export const Container = styled.div`
  position: relative;
  height: fit-content;
  z-index: 0;
  width: 100%;
  border-radius: ${({ theme }) => theme.border.radius};
`;

export const CreateCollecButton = styled.button`
  background-color: ${({ theme }) => theme.color.first};
  filter: saturate(0.95);
  width: 15rem;
  /* margin-top: -1.5rem; */

  text-decoration: none;
  color: ${({ theme }) => theme.color.fourth};
  white-space: nowrap;
  font-size: ${({ theme }) => theme.font.size.sm};
  cursor: pointer;

  border-radius: ${({ theme }) => theme.border.radius};
  box-shadow: 2px 2px 5px ${({ theme }) => theme.color.shadow};

  padding: 1.2rem 2rem;

  display: flex;
  justify-content: center;
  gap: 1rem;
  align-items: center;

  transition: 300ms color, 300ms background-color;

  &:hover {
    background-color: ${({ theme }) => theme.color.firstHover};
  }
`;

export const ContainerPostHeader = styled.div`
  justify-content: space-between;
  display: flex;
`;
