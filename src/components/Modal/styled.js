import { Content, Overlay } from '@radix-ui/react-dialog';
import styled from 'styled-components';
import { DialogContentStyled } from '../../styles/styledDialog';

export const DialogOverlay = styled(Overlay)`
  background-color: rgba(0 0 0 / 0.5);
  position: fixed;
  inset: 0;
  z-index: 2;
  animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
`;

export const DialogContent = styled(DialogContentStyled)``;

export const DialogDescription = styled(Content)`
  width: 30rem;
  height: 10rem;
  background: white;
  padding: 3rem;
  border-radius: 0.4rem;
`;
export const Image = styled.img`
  width: 100%;
`;

export const Video = styled.video`
  height: 400px;
  width: 100%;
  background-color: black;
`;

export const ButtonActive = styled.button`
  min-width: ${props => (props.$width ? props.$width : '3rem')};
  height: ${props => (props.$height ? props.$height : '3rem')};
  overflow: hidden;
  border-radius: 0.5rem;
`;
