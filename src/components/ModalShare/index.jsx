/* eslint-disable import/no-unresolved */
import * as Dialog from '@radix-ui/react-dialog';
import { LuX } from 'react-icons/lu';
import {
  DialogContent,
  DialogOverlay,
  IconButton,
  ButtonActive,
  SpaceUrl,
  SpaceIconsShare,
  ContainerCopy,
} from './styled';
import { AiOutlineFacebook, AiOutlineTwitter, AiOutlineWhatsApp } from 'react-icons/ai';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share';
import MessageUrl from '../MessageUrl';
import { useState } from 'react';

const handleCopyUrl = () => {
  navigator.clipboard
    .writeText(window.location.href)
    .then(() => {
      console.log('URL copiado com sucesso!');
    })
    .catch(error => {
      console.error('Erro ao copiar o URL:', error);
    });
};

// const [open, setOpen] = useState(false);

export const DialogDemo = ({ children, shareUrl, title, ...rest }) => {
  const [open, setOpen] = useState(false);
  const handleButtonClick = () => {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 3000); // Fecha o toast após 3 segundos
  };
  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <ButtonActive {...rest}>{children}</ButtonActive>
        </Dialog.Trigger>
        <Dialog.Portal>
          <DialogOverlay />
          <DialogContent>
            <Dialog.Title className='DialogTitle'>Compartilhar URL</Dialog.Title>

            <Dialog.Description className='DialogDescription'></Dialog.Description>
            <SpaceIconsShare>
              <WhatsappShareButton url={shareUrl} title={title} socialMedia='whatsapp'>
                <AiOutlineWhatsApp
                  size={68}
                  color='#fff'
                  style={{ background: '#047b16', borderRadius: '15px' }}
                />
              </WhatsappShareButton>
              <FacebookShareButton url={shareUrl} title={title} socialMedia='facebook'>
                <AiOutlineFacebook
                  size={68}
                  color='#fff'
                  style={{ background: '#3b5998', borderRadius: '15px' }}
                />
              </FacebookShareButton>
              <TwitterShareButton url={shareUrl} title={title} socialMedia='twitter'>
                <AiOutlineTwitter
                  size={68}
                  color='#fff'
                  style={{ background: '#00acee', borderRadius: '15px' }}
                />
              </TwitterShareButton>
            </SpaceIconsShare>

            <ContainerCopy>
              <ButtonActive
                onClick={() => {
                  handleCopyUrl();
                  handleButtonClick();
                }}
                style={{ width: '20%', padding: '0.5rem 5rem' }}
              >
                Copiar URL
              </ButtonActive>
              <SpaceUrl value={shareUrl}></SpaceUrl>
            </ContainerCopy>

            <Dialog.Close asChild>
              <IconButton aria-label='Close'>
                <LuX />
              </IconButton>
            </Dialog.Close>
          </DialogContent>
        </Dialog.Portal>
      </Dialog.Root>
      <MessageUrl open={open} setOpen={setOpen} />
    </>
  );
};

/* <fieldset className='Fieldset'>
            <label className='Label' htmlFor='name'>
              Name
            </label>
            <input className='Input' id='name' defaultValue='Pedro Duarte' />
          </fieldset>
          <fieldset className='Fieldset'>
            <label className='Label' htmlFor='username'>
              Username
            </label>
            <input className='Input' id='username' defaultValue='@peduarte' />
          </fieldset> */

/* <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
            <Dialog.Close asChild>
              <button className='Button green'>Save changes</button>
            </Dialog.Close>
          </div> */
