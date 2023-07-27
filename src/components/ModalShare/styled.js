/* eslint-disable import/no-named-as-default */
import { Content, Overlay } from '@radix-ui/react-dialog';
import styled from 'styled-components';

export const DialogOverlay = styled(Overlay)`
  background-color: rgba(0 0 0 / 0.5);
  position: fixed;
  inset: 0;
  z-index: 2;
  animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
`;

export const DialogContent = styled(Content)`
  background: ${({ theme }) => theme.color.firstBg};
  border-radius: 0.6rem;
  position: fixed;
  display: grid;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: min(100%, 50rem);
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

export const DialogDescription = styled(Content)`
  height: 10rem;
  background: white;
  padding: 3rem;
  border-radius: 0.4rem;
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

export const Image = styled.img`
  width: 100%;
`;

export const Video = styled.video`
  height: 400px;
  width: 100%;
  background-color: black;
`;

export const ButtonActive = styled.button`
  text-decoration: none;
  color: #ffffff;
  font-size: 2.5rem;
  display: flex;
  text-decoration: none;
  transition: 300ms color;
  padding: 0.5rem;
  border-radius: 50px;
  background-color: ${({ theme }) => theme.color.first};
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: ${({ theme }) => theme.font.size.sm};
  transition: transform 200ms linear, background-color 200ms linear;
  white-space: nowrap;

  &:hover {
    background-color: ${({ theme }) => theme.color.firstHover};
    transform: scale(1.05);
  }
`;

export const SpaceUrl = styled.input`
  width: 100%;
  border-radius: 1rem;
  padding: 10px;
  background-color: ${({ theme }) => theme.color.firstOpacity};
  color: ${({ theme }) => theme.color.fourth};
`;

export const SpaceIconsShare = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-block: 4.5rem;
  gap: 1.6rem;
`;

export const ContainerCopy = styled.div`
  display: flex;
  gap: 2rem;
`;
