/* eslint-disable import/no-unresolved */
import * as Dialog from '@radix-ui/react-dialog';
import { and, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { LuTag, LuTrash, LuX } from 'react-icons/lu';
import { MdOutlineAddBox, MdOutlineLibraryAdd } from 'react-icons/md';
import { UseAuthValue } from '../../context/AuthContext';
import { useDeleteCollec } from '../../hooks/useDeleteCollec';
import { useInsertDocument } from '../../hooks/useInsertDocument';
import { ButtonForm, ButtonResetForm, Form, SvgStyled } from '../../styles/formStyled';
import { DialogOverlay, IconButton } from '../../styles/styledDialog';
import { Option, SpinerLoading, Subtitle } from '../../styles/styledGlobal';
import { GetCollectionValues } from '../../utils/GetCollectionValues';
import { UpdateDocument } from '../../utils/UpdateDocument';
import { CreateInput } from '../CreateInput';
import {
  ButtonActive,
  ButtonEvent,
  ContainerBetween,
  ContainerTag,
  DialogContent,
  Error as ErrorStyled,
  Tag,
  TextTag,
} from './styled';

export const ModalCollec = ({ children, RenderTag, setSelectedCollec = () => {}, ...rest }) => {
  const [open, setOpen] = useState(false);
  const [Loader, setLoader] = useState(false);
  const [Reload, setReload] = useState(0);
  const [Error, setError] = useState('');
  const [Name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [Collec, setCollec] = useState([]);
  const { insertDocument, response } = useInsertDocument('collec');
  const { userData, applicationTags } = UseAuthValue();
  const Where = and(where('name', '==', Name), where('userId', '==', userData.userId));
  const { deleteDocument } = useDeleteCollec();

  useEffect(() => {
    const func = async Where => {
      try {
        const val = await GetCollectionValues('collec', Where);
        setCollec(val);
      } catch (error) {
        console.error(error);
      }
    };

    if (userData.userStatus === 'admin') {
      func();
    } else {
      const Where = where('userId', '==', userData.userId);
      func(Where);
    }
  }, [RenderTag, Reload]);

  const handleSubmit = async e => {
    e?.preventDefault();
    setLoader(true);
    setError('');

    try {
      if (!category) {
        setError('Selecione uma categoria');
      } else if (Name) {
        const val = await GetCollectionValues('collec', Where);

        if (val?.length == 0) {
          const vall = await insertDocument({
            name: Name,
            userId: userData.userId,
            publicPost: 0,
            category,
          });

          await UpdateDocument('collec', vall.id, { id: vall.id });
          setReload(e => ++e);
        } else {
          setError('Coleção ja existe');
        }
      } else {
        setError('Selecione o nome de uma coleção');
      }

      setLoader(false);
    } catch (error) {
      console.error(error);
      setLoader(false);
    }
  };

  const handleDelete = async e => {
    const confirmDelete = window.confirm(`Tem certeza que deseja excluir a coleção ${e.name}?`);
    if (confirmDelete) {
      const val = await deleteDocument(e.id, e.name);
      // Atualize o estado 'Collec' se a exclusão for bem-sucedida
      if (val) {
        const updatedCollec = Collec.filter(item => item.id !== e.id);
        setCollec(updatedCollec);
      } else {
        alert(`Não é possível excluir a coleção. Existem posts associados a "${e.name}".`);
      }
    }
  };
  const handleReset = () => {
    setName('');
    setError('');
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
              Coleções Disponíveis
            </Subtitle>
            <ContainerTag>
              {Collec?.map(e => (
                <Tag key={e?.id}>
                  <SvgStyled
                    as={MdOutlineAddBox}
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      setSelectedCollec(e);
                      setOpen(e => !e);
                    }}
                  />
                  <ContainerBetween>
                    <TextTag>{e?.name}</TextTag>
                    <ButtonEvent
                      className='delete'
                      title='deleter coleção'
                      aria-label='deleter coleção'
                      onClick={() => {
                        handleDelete(e);
                        setSelectedCollec({});
                      }}
                    >
                      <LuTrash style={{ cursor: 'pointer' }} /> {/* Ícone de lixeira */}
                    </ButtonEvent>
                  </ContainerBetween>
                </Tag>
              ))}
            </ContainerTag>

            <Subtitle as={Dialog.Title} className='DialogTitle'>
              Criar coleção
            </Subtitle>

            <Form>
              <CreateInput
                Svg={MdOutlineLibraryAdd}
                aria-label='Título'
                type='text'
                name='name'
                value={Name}
                className='red'
                onChange={e => setName(e.target.value)}
                placeholder='Nome para adicionar coleção'
                required
              />
              <CreateInput
                Svg={LuTag}
                as='select'
                className='red'
                value={category}
                onChange={event => {
                  setCategory(event.target.value);
                }}
                title='define se a postagem vai ser publica ou privada'
                aria-label='define se a postagem vai ser publica ou privada'
              >
                <Option value={''}>Selecionar categoria</Option>

                {applicationTags.map((e, i) => (
                  <Option key={`${e}${i}`} value={e}>
                    {e}
                  </Option>
                ))}
              </CreateInput>
              <ButtonResetForm type='button' className='red' onClick={handleReset}>
                Reset
              </ButtonResetForm>
              <ButtonForm type='submit' className='red' onClick={handleSubmit}>
                {Loader ? <SpinerLoading size={18} /> : 'Salvar'}
              </ButtonForm>
            </Form>
            {Error && <ErrorStyled>{Error}</ErrorStyled>}
            {response.error && <ErrorStyled>{response.error}</ErrorStyled>}

            <Dialog.Close asChild>
              <IconButton aria-label='Close' onClick={() => setError('')}>
                <LuX />
              </IconButton>
            </Dialog.Close>
          </DialogContent>
        </Dialog.Portal>
      </Dialog.Root>
      {/* <MessageUrl open={open} setOpen={setOpen} /> */}
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
