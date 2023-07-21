import { styled } from 'styled-components';

export const ContainerCreatePost = styled.div`
  gap: 1rem;
  flex-direction: column;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const CreatePostTitle = styled.h2`
  display: inline-block;
  width: fit-content;
`;

export const ContainerCard = styled.section`
  display: flex;
  height: 100%;
  flex-direction: column;
  gap: 1.5rem;
  box-shadow: 2px 2px 5px ${({ theme }) => theme.color.shadow};
  background-color: ${({ theme }) => theme.color.secondBg};
  padding: 1.5rem 1rem;
  border-radius: ${({ theme }) => theme.border.radius};
`;

export const Card = styled.div`
  align-items: center;
  gap: 1rem;
  padding: 1.5rem 2.5rem;
  box-shadow: 2px 2px 5px ${({ theme }) => theme.color.shadow};
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: ${props =>
    props.deleted ? 'hsla(0, 100%, 50%, .3)' : props.theme.color.thirdOpacity03};
  cursor: default;
  transition: 200ms linear background-color;

  &:hover {
    background-color: ${props =>
      props.deleted ? 'hsla(0, 100%, 35%, .3)' : props.theme.color.secondBg};
  }

  display: grid;
  gap: 0.5rem;
  justify-content: center;
  width: 100%;

  grid-template-columns: 1fr 1fr;
  grid-template-rows: min-content 1fr;
  grid-template-areas: 'init date' 'edit edit';

  @media (min-width: 900px) {
    grid-template-columns: 1fr ;
    grid-template-rows: min-content 1fr min-content;
    grid-template-areas: 'init edit date';
  }
`;

export const TitlePost = styled.h3`
  font-family: ${({ theme }) => theme.font.family.roboto};
  font-weight: 500;
  color: ${({ theme }) => theme.color.fourth};
  font-size: ${({ theme }) => theme.font.size.base};
  align-items: center;
  flex-direction: column;

  white-space: nowrap;
  overflow: hidden;
  width: 100%;
`;

export const Author = styled(TitlePost)`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  align-items: center;

  *.date {
    display: block;
    flex: 1 1;
    width: 30px;
  }
`;

export const ContRow = styled.div`
  align-items: center;
  gap: 0.5rem;
  flex-flow: row;
`;

export const ContRowInit = styled(ContRow)`
  grid-area: init;
  display: flex;
  width: 100%;
`;
export const ContRowDate = styled(ContRow)`
  grid-area: date;
  justify-content: flex-end;
  display: flex;
  width: 100%;
`;

export const ContRowEdit = styled(ContRow)`
  grid-area: edit;
  display: flex;
  justify-content: space-evenly;
  width: 100%;
`;

export const ContainerTitlePost = styled.div`
  flex: 1 1;
  display: flex;
  gap: 1rem;
  align-items: center;
  width: 100%;
  max-width: min-content;
`;

export const MediaPreview = styled.img`
  width: 3rem;
  height: 3rem;
  object-fit: cover;
  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

export const ContainerButtonEvent = styled.section`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

export const ContainerHeader = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-bottom: 3rem;
`;
export const UserLoggedBall = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${props => (props.logged ? 'green' : props.theme.color.first)};
  display: inline-block;
  margin-bottom: 1px;
  box-shadow: 2px 2px 5px ${({ theme }) => theme.color.fourthBg};
  cursor: pointer;
`;
export const ButtonEvent = styled.button`
  display: flex;
  background-color: ${({ theme }) => theme.color.fourthHover};
  font-size: ${({ theme }) => theme.font.size.base};
  color: ${({ theme }) => theme.color.fourth};
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
`;
