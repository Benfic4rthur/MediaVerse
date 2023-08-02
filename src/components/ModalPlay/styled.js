/* eslint-disable import/no-named-as-default */
import { Content } from '@radix-ui/react-dialog';
import styled from 'styled-components';
import { Error as ErrorStyled } from '../../styles/formStyled';
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

  &:hover {
    background-color: ${({ theme }) => theme.color.firstHover};
    transform: scale(1.05);
  }
`;

export const Error = styled(ErrorStyled)`
  width: fit-content;
  margin: 0 auto;
`;
