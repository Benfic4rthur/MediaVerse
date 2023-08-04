/* eslint-disable import/no-unresolved */
import * as Dialog from '@radix-ui/react-dialog';
import { and, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { LuHeading1, LuX } from 'react-icons/lu';
import { UseAuthValue } from '../../context/AuthContext';
import { useInsertDocument } from '../../hooks/useInsertDocument';
import { Tag } from '../../styles/StyledPostForm';
import { ButtonForm, Form } from '../../styles/formStyled';
import { DialogOverlay, IconButton } from '../../styles/styledDialog';
import { SpinerLoading, Subtitle } from '../../styles/styledGlobal';
import { GetCollectionValues } from '../../utils/GetCollectionValues';
import { CreateInput } from '../CreateInput';
import MessageUrl from '../MessageUrl';
import { ButtonActive, DialogContent, Error as ErrorStyled } from './styled';

export const DialogPlay = ({ children, RenderTag = 0, setRenderTag = () => {}, ...rest }) => {
  const [open, setOpen] = useState(false);
  const [Loader, setLoader] = useState(false);
  const [Error, setError] = useState('');
  const [Name, setName] = useState('');
  const [Collec, setCollec] = useState([]);
  const { insertDocument, response } = useInsertDocument('collec');
  const { userData } = UseAuthValue();
  const Where = and(where('name', '==', Name), where('userId', '==', userData.userId));
  const WhereEmail = where('userId', '==', userData.userId);

  useEffect(() => {
    const func = async () => {
      const val = await GetCollectionValues('collec', WhereEmail);
      console.log(val);
      setCollec(val);
    };

    func();
  }, [RenderTag]);
  // >>>>>>> Stashed changes

  const handleSubmit = async e => {
    e?.preventDefault();
    setLoader(true);
    setError('');

    try {
      if (Name) {
        const val = await GetCollectionValues('collec', Where);

        if (val?.length == 0) {
          await insertDocument({ name: Name, userId: userData.userId });

          setRenderTag(++RenderTag);
        } else {
          setError('Coleção ja existe');
        }
      } else {
        setError('Selecione o nome de uma coleção');
      }

      setLoader(false);
      setOpen(false);
    } catch (error) {
      console.error(error);
      setLoader(false);
      setOpen(false);
    }
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
            <div>
              {Collec?.map(e => (
                <Tag key={e?.id}>{e?.name}</Tag>
              ))}
            </div>

            <Subtitle as={Dialog.Title} className='DialogTitle'>
              Criar coleção
            </Subtitle>

            <Form>
              <CreateInput
                Svg={LuHeading1}
                aria-label='Título'
                type='text'
                name='name'
                value={Name}
                className='red'
                onChange={e => setName(e.target.value)}
                placeholder='Nome para adicionar coleção'
                required
              />
              <ButtonForm type='submit' className='red' onClick={handleSubmit}>
                {Loader ? <SpinerLoading size={18} /> : 'Postar'}
              </ButtonForm>
            </Form>
            {Error && <ErrorStyled>{Error}</ErrorStyled>}
            {response.error && <ErrorStyled>{response.error}</ErrorStyled>}

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
