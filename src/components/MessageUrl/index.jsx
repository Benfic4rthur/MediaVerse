/* eslint-disable import/no-unresolved */
import * as Toast from '@radix-ui/react-toast';

import { ToastRoot, ToastTitle, ToastViewport } from './styled';
import './styles.css';

const MessageUrl = ({ open, setOpen }) => {
  return (
    <Toast.Provider swipeDirection='left'>
      <ToastRoot className='ToastRoot' open={open} onOpenChange={setOpen}>
        <ToastTitle>Url Copiada</ToastTitle>
      </ToastRoot>
      <ToastViewport />
    </Toast.Provider>
  );
};

export default MessageUrl;
