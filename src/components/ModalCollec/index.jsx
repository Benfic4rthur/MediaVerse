/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
import * as Dialog from '@radix-ui/react-dialog';
import { and, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { LuImagePlus, LuTag, LuTrash, LuX } from 'react-icons/lu';
import { MdOutlineAddBox, MdOutlineLibraryAdd } from 'react-icons/md';
import { CustomInputTypeFile } from '../../components/CustomInputTypeFile';
import { UseAuthValue } from '../../context/AuthContext';
import { useDeleteCollec } from '../../hooks/useDeleteCollec';
import { useInsertDocument } from '../../hooks/useInsertDocument';
import { ButtonForm, ButtonResetForm, Form, SvgStyled } from '../../styles/formStyled';
import { DialogOverlay, IconButton } from '../../styles/styledDialog';
import { Option, SpinerLoading, Subtitle } from '../../styles/styledGlobal';
import { GetCollectionValues } from '../../utils/GetCollectionValues';
import { UpdateDocument } from '../../utils/UpdateDocument';
import { generateSearchTokens } from '../../utils/generateSearchTokens';
import { mediaUpload } from '../../utils/mediaUpload';
import { processSelectedFile } from '../../utils/processSelectedFile';
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
  const [selectedThumbModal, setSelectedThumbModal] = useState('');
  const [resetThumbPlaceholderModal, setResetThumbPlaceholderModal] = useState(false);
  const { userData, applicationTags } = UseAuthValue();
  const Where = and(
    where('name', '==', Name),
    where('userId', '==', userData.userId),
    where('category', '==', category),
  );
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

    if (!Name) {
      setError('Insira o nome de uma coleção');
      setLoader(false);
      setOpen(true);
      return;
    }

    if (!category) {
      setError('Selecione uma categoria');
      setLoader(false);
      setOpen(true);
      return;
    }

    if (!mediaThumb) {
      setError('Selecione uma imagem.');
      setLoader(false);
      setOpen(true);
      return;
    }

    try {
      const val = await GetCollectionValues('collec', Where);

      const existingCollection = val.find(
        collection =>
          collection.name === Name &&
          collection.category === category &&
          collection.userId === userData.userId,
      );

      if (!existingCollection) {
        await mediaUpload(
          mediaThumb,
          null,
          'collec',
          null,
          async ({ mediaURL: thumbURL, name: thumbURLName }) => {
            try {
              const newCollec = {
                name: Name,
                userId: userData.userId,
                searchTokens: generateSearchTokens(Name),
                category,
                mediaURL: thumbURL,
                thumbName: thumbURLName,
              };
              const vall = await insertDocument(newCollec);

              await UpdateDocument('collec', vall.id, { id: vall.id });
              setReload(e => ++e);

              if (category && Name && mediaThumb) {
                handleReset();
              }
              setLoader(false);
            } catch (error) {
              console.error('Error saving collection:', error);
              setLoader(false);
              setError('Erro ao salvar coleção');
            }
          },
        );
      } else {
        setError('Coleção já existe');
        setLoader(false);
        setOpen(true);
      }
    } catch (error) {
      console.error('Erro ao tentar submeter:', error);
      setLoader(false);
    }
  };
  const handleDelete = async e => {
    const confirmDelete = window.confirm(`Tem certeza que deseja excluir a coleção ${e.name}?`);
    if (confirmDelete) {
      const val = await deleteDocument(e.id, e.name, e.thumbName);
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

  const screenWidth =
    window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

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
              {screenWidth <= 496 && (
                <>
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
                    <Option value={''}>{'         '}Selecionar categoria</Option>

                    {applicationTags.map((e, i) => (
                      <Option key={`${e}${i}`} value={e}>
                        {e}
                      </Option>
                    ))}
                  </CreateInput>
                </>
              )}
              {screenWidth > 496 && (
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
              )}
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
              <IconButton aria-label='Close' onClick={() => handleReset()}>
                <LuX />
              </IconButton>
            </Dialog.Close>
          </DialogContent>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};
