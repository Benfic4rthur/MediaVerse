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
  width: 85px;
  height: 85px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.color.firstOpacity};
`;

export const ContainerButtonAvatar = styled.section`
  display: flex;
  flex-flow: row wrap;
  gap: 1rem;
  justify-content: center;
`;

export const ButtonAvatar = styled.button`
  width: 85px;
  height: 85px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.color.firstOpacity};
  overflow: hidden;
  cursor: pointer;
`;

export const ImageAvatar = styled.img`
  width: 100%;
  height: 100%;
`;

export const ContainerProgressPercent = styled.div`
  width: 100%;
  height: fit-content;
  display: grid;
  place-items: center;
`;

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
`;
