import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';
import { LuLock, LuMail, LuX } from 'react-icons/lu';
import { ButtonForm, Form } from '../../styles/formStyled';
import { CreateInput } from '../CreateInput';
import { ButtonActive, DialogContent } from './styled';
import { DialogOverlay, IconButton } from '../../styles/styledDialog';
import { Subtitle } from '../../styles/styledGlobal';

export const DialogCurrent = ({
  children,
  ValueEmail,
  ValuePassword,
  loading = false,
  setValueEmail = () => {},
  setValuePassword = () => {},
  formSubmitFunction = () => {},
  ...rest
}) => {
  const [open, setOpen] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    formSubmitFunction?.(e);
    setOpen(false);
  };

  return (
    <>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild>
          <ButtonActive {...rest}>{children}</ButtonActive>
        </Dialog.Trigger>
        <Dialog.Portal>
          <DialogOverlay />
          
          <DialogContent>
            <Subtitle as={Dialog.Title} className='DialogTitle'>
              Confirme sua identidade:
            </Subtitle>
            <Form onSubmit={handleSubmit}>
              <CreateInput
                Svg={LuMail}
                aria-label='E-mail do usuário'
                type='email'
                name='email'
                required
                placeholder='E-mail'
                value={ValueEmail}
                onChange={e => setValueEmail?.(e.target.value)}
                autoComplete='off'
              />
              <CreateInput
                Svg={LuLock}
                aria-label='Nova senha'
                type='password'
                name='password'
                placeholder='Senha'
                value={ValuePassword}
                onChange={e => setValuePassword?.(e.target.value)}
                autoComplete='off'
              />

              <ButtonForm type='submit'>{loading ? 'Aguarde...' : 'Enviar'}</ButtonForm>
            </Form>

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
