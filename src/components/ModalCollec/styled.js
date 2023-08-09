import { Content } from '@radix-ui/react-dialog';
import styled from 'styled-components';
import { ButtonForm, Error as ErrorStyled } from '../../styles/formStyled';
import { DialogContentStyled } from '../../styles/styledDialog';

export const DialogContent = styled(DialogContentStyled)`
  width: min(95%, 46rem);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: 85vh;
`;

export const DialogDescription = styled(Content)`
  height: 10rem;
  background: white;
  padding: 3rem;
  border-radius: 0.4rem;
`;

export const ButtonActive = styled.button`
  background-color: transparent;
  border-radius: ${({ theme }) => theme.border.radius};
`;

export const DialogButtonForm = styled(ButtonForm)`
  background-color: ${({ theme }) => theme.color.firstNav};

  &:hover {
    background-color: ${({ theme }) => theme.color.firstHover};
  }
`;

export const Error = styled(ErrorStyled)`
  width: fit-content;
  margin: 0 auto;
`;

export const ContainerTag = styled.div`
  max-height: 20rem;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Tag = styled.div`
  background-color: ${({ theme }) => theme.color.firstOpacity};
  color: ${({ theme }) => theme.color.fourthOpacity};
  border-radius: ${({ theme }) => theme.border.radius};
  border: 0.1rem solid ${({ theme }) => theme.color.fourthOpacity};
  display: grid;
  grid-template-columns: min-content 1fr;
  align-items: center;
  gap: 1rem;
  padding-inline: 0.9rem;
  min-height: 3.85rem;
  /* flex: 1 1 4rem; */
  transition: 300ms background-color linear, 300ms color linear;

  &:hover {
    background-color: ${({ theme }) => theme.color.thirdOpacity03};
  }
`;

export const ContainerBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: max-content;
`;

export const TextTag = styled.p`
  font-family: ${({ theme }) => theme.font.family.primary};
  line-height: ${({ theme }) => theme.font.lineHeight};
  font-size: ${({ theme }) => theme.font.size.sm};
`;

export const ButtonEvent = styled.button`
  display: flex;
  background-color: ${({ theme }) => theme.color.fourthHover};
  font-size: ${({ theme }) => theme.font.size.base};
  color: ${({ theme }) => theme.color.fourth};
  width: 2.6rem;
  height: 2.6rem;
  justify-content: center;
  align-items: center;
  box-shadow: 0.2rem 0.2rem 0.5rem ${({ theme }) => theme.color.shadow};
  border-radius: ${({ theme }) => theme.border.radius};
  cursor: pointer;
  transition: 300ms color, 300ms background-color;

  &:hover {
    color: ${({ theme }) => theme.color.fourthOpacity};
    background-color: ${({ theme }) => theme.color.third};
  }

  &.delete:hover {
    color: ${({ theme }) => theme.color.error};
    background-color: ${({ theme }) => theme.color.thirdBg};
  }
`;
