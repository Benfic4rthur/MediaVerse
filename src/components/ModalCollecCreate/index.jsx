/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
import * as Dialog from '@radix-ui/react-dialog';
import { and, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { LuTag, LuTrash, LuX, LuImagePlus } from 'react-icons/lu';
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
import { mediaUpload } from '../../utils/mediaUpload';
import { CustomInputTypeFile } from '../CustomInputTypeFile';
import { processSelectedFile } from '../../utils/processSelectedFile';
import { deleteStorageMedia } from '../../utils/deleteStorageMedia';
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
  const [selectedThumbModal, setSelectedThumbModal] = useState('');
  const [resetThumbPlaceholderModal, setResetThumbPlaceholderModal] = useState(false);
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

    const mediaThumb = document.getElementById('mediaThumbModal')?.files?.[0];

    if (!mediaThumb) {
      setError('Selecione uma imagem.');
      setLoader(false);
      return;
    }
    try {
      await mediaUpload(
        mediaThumb,
        null,
        'collec',
        null,
        async ({ mediaURL: thumbURL, name: thumbURLName }) => {
          if (!category) {
            setError('Selecione uma categoria');
          } else if (Name) {
            const val = await GetCollectionValues('collec', Where);

            if (val?.length === 0) {
              try {
                const newCollec = {
                  name: Name,
                  userId: userData.userId,
                  category,
                  publicPost: 0,
                  mediaURL: thumbURL,
                  thumbName: thumbURLName,
                };
                const vall = await insertDocument(newCollec);

                await UpdateDocument('collec', vall.id, { id: vall.id });
                setReload(e => ++e);
              } catch (error) {
                console.error('Error saving collection:', error);
                setError('Erro ao salvar coleção');
              }
            } else {
              setError('Coleção já existe');
            }
          } else {
            setError('Selecione o nome de uma coleção');
          }

          setLoader(false);
          setOpen(false);
        },
      );
    } catch (error) {
      console.error('Erro ao tentar submeter:', error);
      setLoader(false);
    }
  };

  const handleDelete = async e => {
    const confirmDelete = window.confirm(`Tem certeza que deseja excluir a coleção ${e.name}?`);
    if (confirmDelete) {
      deleteStorageMedia('collec', e?.thumbName);
      const val = await deleteDocument(e.id, e.name);
      setReload(e => ++e);
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
    setCategory('');
    setResetThumbPlaceholderModal(prevState => !prevState);
    setLoader(false);
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
                title='define a categoria da postagem'
                aria-label='define a categoria da postagem'
              >
                <Option value={''}>Selecionar categoria</Option>

                {applicationTags.map((e, i) => (
                  <Option key={`${e}${i}`} value={e}>
                    {e}
                  </Option>
                ))}
              </CreateInput>
              <CustomInputTypeFile
                Svg={LuImagePlus}
                onChange={event => setSelectedThumbModal(processSelectedFile(event)?.url)}
                resetPlaceholder={resetThumbPlaceholderModal}
                className='red'
                placeholder='Adicione uma thumb na coleção'
                initialPlaceholder='Adicione uma thumb na coleção'
                aria-label='adicione arquivos de imagem para ser utilizado como Thumb'
                name='thumbModal'
                id='mediaThumbModal'
                accept='image/*'
                required
              />
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
    </>
  );
};
