import { Content } from '@radix-ui/react-dialog';
import styled from 'styled-components';
import { DialogContentStyled } from '../../styles/styledDialog';

export const DialogContent = styled(DialogContentStyled)`
  max-width: 50rem;
  gap: 1.6rem;
`;

export const DialogDescription = styled(Content)`
  width: 30rem;
  height: 10rem;
  background: white;
  padding: 3rem;
  border-radius: 0.4rem;
`;

export const ButtonActive = styled.button`
  width: 100%;
  background-color: transparent;
  border-radius: 1rem;
`;
