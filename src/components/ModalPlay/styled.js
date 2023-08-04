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
