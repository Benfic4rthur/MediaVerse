import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useEffect, useRef, useState } from 'react';
import { LuTag } from 'react-icons/lu';
import { MdOutlineTextFields } from 'react-icons/md';
import { RxFilePlus } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';
import { CreateInput } from '../../components/CreateInput';
import { UseAuthValue } from '../../context/AuthContext';
import { storage } from '../../firebase/config';
import { useInsertDocument } from '../../hooks/useInsertDocument';
import { ContainerFlex, ContainerForm, Error, Form, Progress } from './styled.js';

import JoditEditor from 'jodit-react';
import { ButtonForm } from '../../styles/formStyled';
import { ContainerCenter, SpinerLoading, Subtitle } from '../../styles/styledGlobal';
const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [, setMediaURL] = useState('');
  const [progressPercent, setProgressPercent] = useState(0);
  const [tags, setTags] = useState('');
  const [formError, setFormError] = useState('');
  const { user } = UseAuthValue();
  const editor = useRef(null);
  const [body, setBody] = useState('');

  const config = {
    readonly: false,
    heigth: 600,
    width: 750,
    placeholder: 'Compartilhe seu conhecimento aqui...', // "" desejado
    shouldPreserveActiveTab: true,
  };

  useEffect(() => {
    // console.log(editor.current.value, {body});
    const conteudoEditor = editor.current.value;
    setBody(conteudoEditor);
  }, [body]);

  const { insertDocument, response } = useInsertDocument('posts');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setFormError('');

    const mediaFileInput = document.getElementById('mediaFileInput');
    const mediaFile = mediaFileInput?.files[0];

    if (!mediaFile) {
      setFormError('Selecione uma imagem ou vídeo.');
      return;
    }

    try {
      const mediaStorageRef = ref(storage, `posts/${mediaFile.name}`);
      const mediaUploadTask = uploadBytesResumable(mediaStorageRef, mediaFile);

      mediaUploadTask.on(
        'state_changed',
        snapshot => {
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setProgressPercent(progress);
        },
        error => {
          console.error(error);
        },
        () => {
          getDownloadURL(mediaUploadTask.snapshot.ref).then(downloadURL => {
            setMediaURL(downloadURL);
            savePost(downloadURL);
          });
        },
      );
    } catch (error) {
      console.error(error);
    }
  };

  const resetForm = () => {
    setTitle('');
    setMediaURL('');
    setBody('');
    setTags('');
  };

  const savePost = mediaURL => {
    const post = {
      title,
      mediaURL,
      body,
      searchTokens: generateSearchTokens(title), // Adiciona os tokens de busca
      tags: tags.split(',').map(tag => tag.trim()),
      uid: user.uid,
      createdBy: user.displayName,
    };

    insertDocument(post);

    navigate('/');
  };

  useEffect(() => {
    document.title = 'MediaVerse- Novo Post';
  }, []);

  const generateSearchTokens = title => {
    const tokens = title.split(' ');
    return tokens;
  };

  if (formError) return null;

  return (
    <ContainerCenter>
      <ContainerForm>
        <Subtitle>Criar novo post</Subtitle>
        <Form onSubmit={handleSubmit}>
          <ContainerFlex>
            <CreateInput
              Svg={MdOutlineTextFields}
              aria-label='Título'
              type='text'
              name='title'
              value={title}
              className='red'
              onChange={e => setTitle(e.target.value)}
              placeholder='Pense em um título de fácil entendimento...'
              required
            />
            <CreateInput
              Svg={RxFilePlus}
              type='file'
              className='red'
              aria-label='adicione arquivos de Imagem ou Vídeo'
              id='mediaFileInput'
              accept='image/*, video/*'
              required
            />
          </ContainerFlex>
          <ContainerFlex>
            <JoditEditor
              ref={editor}
              value={body}
              config={config}
              onBlur={newContent => setBody(newContent)} // preferred to use only this option to update the content for performance reasons
            />
          </ContainerFlex>
          <ContainerFlex>
            <CreateInput
              Svg={LuTag}
              aria-label={'Insira suas tags separadas por vírgula'}
              type='text'
              className='red'
              name='tags'
              value={tags}
              onChange={e => setTags(e.target.value)}
              placeholder='Insira suas tags separadas por vírgula...'
              required
            />
          </ContainerFlex>
          <ContainerFlex>
            <ButtonForm
              className='red'
              type='reset'
              onClick={resetForm}
              disabled={progressPercent > 1}
            >
              Limpar
            </ButtonForm>
            <ButtonForm className='red' disabled={progressPercent > 1}>
              {progressPercent < 1 ? 'Postar' : <SpinerLoading size={18} />}
            </ButtonForm>
          </ContainerFlex>
          {progressPercent >= 1 && <Progress value={50} min='0' max='100' />}
          {(response.error || formError) && <Error>{response.error || formError}</Error>}
        </Form>
      </ContainerForm>
    </ContainerCenter>
  );
};

export default CreatePost;
