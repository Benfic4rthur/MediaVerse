import { Content, Overlay } from '@radix-ui/react-dialog';
import { styled } from 'styled-components';

export const DialogContentStyled = styled(Content)`
  background-color: ${({ theme }) => theme.color.secondBg};
  position: fixed;
  border-radius: 0.6rem;
  position: fixed;
  display: grid;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 60rem;
  max-height: 85vh;
  overflow: auto;
  padding: 2.5rem;
  animation: both 150ms cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 2;

  .DialogTitle {
    color: ${({ theme }) => theme.color.fourth};
  }

  &::-webkit-scrollbar {
    width: 0.8rem;
    height: 0.8rem;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.color.firstOpacity};
    border-radius: ${({ theme }) => theme.border.radius};
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.color.firstHover};
  }
`;

export const DialogOverlay = styled(Overlay)`
  background-color: rgba(0 0 0 / 0.5);
  position: fixed;
  inset: 0;
  z-index: 2;
  animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
`;

export const IconButton = styled.button`
  border-radius: 100%;
  height: 2.5rem;
  width: 2.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: red;
  position: absolute;
  top: 1rem;
  right: 1rem;

  &:hover {
    background-color: ${({ theme }) => theme.color.firstOpacity};
  }
`;
