import * as Dialog from '@radix-ui/react-dialog';
import { LuX } from 'react-icons/lu';
import { DialogContent, DialogOverlay, IconButton, Image, Video,ButtonActive } from './styled';

export const DialogDemo = ({ children, mediaURL, ...rest }) => (
  <>
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <ButtonActive {...rest}>{children}</ButtonActive>
      </Dialog.Trigger>
      <Dialog.Portal>
        <DialogOverlay />
        <DialogContent>
          <Dialog.Title className='DialogTitle'>Preview da mídia</Dialog.Title>

          <Dialog.Description className='DialogDescription'></Dialog.Description>

          {mediaURL.includes('.mp4') || mediaURL.includes('.webm') ? (
            <Video
              controls
              src={mediaURL}
              // style={{ width: 35, maxHeight: 35 }}
            />
          ) : (
            <Image
              src={mediaURL}
              alt={'title'}
              // style={{ width: 35, maxHeight: 35 }}
            />
          )}

          <Dialog.Close asChild>
            <IconButton aria-label='Close'>
              <LuX />
            </IconButton>
          </Dialog.Close>
        </DialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  </>
);

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
