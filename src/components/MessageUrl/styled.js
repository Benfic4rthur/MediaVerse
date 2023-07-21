import * as Toast from '@radix-ui/react-toast';
import styled, { keyframes } from 'styled-components';
// "@mui/icons-material": "^5.13.7",

const viewportPadding = "2.5rem"

export const ToastViewport = styled(Toast.Viewport)`
  position: fixed;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  padding: ${viewportPadding};
  gap: 1rem;
  width: 30rem;
  max-width: 100vw;
  margin: 0;
  list-style: none;
  z-index: 2147483647;
  outline: none;
`;

export const ToastRoot = styled(Toast.Root)`
  background-color: hsl(225, 11%, 22%);
  border-radius: 1rem;
  box-shadow: hsl(206 22% 7% / 35%) 0rem 1rem 38px -1rem, hsl(206 22% 7% / 20%) 0rem 1rem 2rem -1.5rem;
  padding: 1.5rem;
  display: grid;
  grid-template-areas: 'title action' 'description action';
  grid-template-columns: auto max-content;
  column-gap: 1.5rem;
  align-items: center;
  justify-content: center;

  &[data-state='open'] {
    animation: slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  &[data-state='closed'] {
    animation: hide 100ms ease-in;
  }
/*
  &[data-swipe='move'] {
    transform: translateX(var(--radix-toast-swipe-move-x));
  } */

  &[data-swipe='cancel'] {
    transform: translateX(0);
    transition: transform 200ms ease-out;
  }

  &[data-swipe='end'] {
    animation: swipeOut 100ms ease-out;
  }
`;

export const hide = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`

export const slideIn = keyframes`
  from {
    transform: translateX(calc(100% + ${viewportPadding}));
  }
  to {
    transform: translateX(0);
  }
`;

export const swipeOut = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(calc(100% + ${viewportPadding}));
  }
`;

export const ToastTitle = styled(Toast.Title)`
  grid-area: title;
  margin-bottom: .5rem;
  font-weight: 500;
  font-size: 2rem;
  color: white;
`;
