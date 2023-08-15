/* eslint-disable import/no-unresolved */
import * as Dialog from '@radix-ui/react-dialog';
import { LuX } from 'react-icons/lu';
import { DialogContent, ButtonActive, SpaceUrl, SpaceIconsShare, ContainerCopy, Success } from './styled';
import { AiOutlineFacebook, AiOutlineTwitter, AiOutlineWhatsApp } from 'react-icons/ai';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share';
import { DialogOverlay, IconButton } from '../../styles/styledDialog';
import { useState } from 'react';

export const DialogDemo = ({ children, shareUrl, title, ...rest }) => {
  const [ open, setOpen ] = useState(false);
  const handleCopyUrl = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        setOpen(true);
        console.log('URL copiado com sucesso!');
        setTimeout(() => {
          setOpen(false);
        }, 2000)
      })
      .catch(error => {
        console.error('Erro ao copiar o URL:', error);
      });
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
              <WhatsappShareButton url={shareUrl} title={title} socialmedia='whatsapp'>
                <AiOutlineWhatsApp
                  size={58}
                  color='#fff'
                  style={{ background: '#047b16', borderRadius: '15px' }}
                />
              </WhatsappShareButton>
              <FacebookShareButton url={shareUrl} title={title} socialmedia='facebook'>
                <AiOutlineFacebook
                  size={58}
                  color='#fff'
                  style={{ background: '#3b5998', borderRadius: '15px' }}
                />
              </FacebookShareButton>
              <TwitterShareButton url={shareUrl} title={title} socialmedia='twitter'>
                <AiOutlineTwitter
                  size={58}
                  color='#fff'
                  style={{ background: '#00acee', borderRadius: '15px' }}
                />
              </TwitterShareButton>
            </SpaceIconsShare>
            {open ? <Success>Link copiado!</Success> : null}
            <ContainerCopy>
              <ButtonActive
                onClick={() => {
                  handleCopyUrl();
                }}
                style={{ width: '20%', padding: '0.5rem 5rem' }}
              >
                Copiar URL
              </ButtonActive>
              <SpaceUrl value={shareUrl} readOnly />
            </ContainerCopy>

            <Dialog.Close asChild>
              <IconButton aria-label='Close' onClick={() => setOpen(false)}>
                <LuX />
              </IconButton>
            </Dialog.Close>
          </DialogContent>
        </Dialog.Portal>
      </Dialog.Root>
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
