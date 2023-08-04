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
  white-space: nowrap;
  height: fit-content;
  border-radius: ${({ theme }) => theme.border.radius};
  background-color: transparent;

  &:hover {
    transform: scale(1.03);
  }
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
export const Tag = styled.div`
  background-color: ${({ theme }) => theme.color.third};
  border-radius: ${({ theme }) => theme.border.radius};
  color: ${({ theme }) => theme.color.first};
  border: 0.1rem solid ${({ theme }) => theme.color.fourthOpacity};
  font-family: ${({ theme }) => theme.font.family.primary};
  line-height: ${({ theme }) => theme.font.lineHeight};
  font-size: ${({ theme }) => theme.font.size.sm};
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-inline: .9rem;
  justify-content: space-between;
  height: 4rem;
  margin-bottom: .5rem;
`;