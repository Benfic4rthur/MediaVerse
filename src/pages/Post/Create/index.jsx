import { useLayoutEffect, useState } from 'react';
import { LuFileVideo, LuHeading1, LuImagePlus, LuLock } from 'react-icons/lu';
import { MdOutlineVideoLibrary } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { CreateInput } from '../../../components/CreateInput';
import { CustomInputTypeFile } from '../../../components/CustomInputTypeFile';
import { ModalCollec } from '../../../components/ModalCollec';
import { UseAuthValue } from '../../../context/AuthContext';
import { countPublicCollecs } from '../../../hooks/useCountCollecs';
import { useInsertDocument } from '../../../hooks/useInsertDocument';
import { useUpdateCollec } from '../../../hooks/useUpdateCollec';
import {
  ContainerFlex,
  ContainerForm,
  ContainerVideo,
  Error,
  Form,
  Progress,
  Video,
} from '../../../styles/StyledPostForm';
import { ButtonForm, ButtonResetForm, Textaria } from '../../../styles/formStyled';
import { ContainerCenter, Option, SpinerLoading, Subtitle } from '../../../styles/styledGlobal';
import { IsValidTrueOrFalse } from '../../../utils/IsValidTrueOrFalse';
import { generateSearchTokens } from '../../../utils/generateSearchTokens';
import { mediaUpload } from '../../../utils/mediaUpload';
import { processSelectedFile } from '../../../utils/processSelectedFile';

export const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [progressPercent, setProgressPercent] = useState(0);
  const [body, setBody] = useState('');
  const [isPublic, setIsPublic] = useState('false');
  const [selectedCollec, setSelectedCollec] = useState({
    name: '',
    id: '',
    userId: '',
    publicPost: 0,
  }); // Novo estado para tag selecionada
  const { user } = UseAuthValue();
  const [formError, setFormError] = useState('');
  const [selectedThumb, setSelectedThumb] = useState('');
  const [selectedVideo, setSelectedVideo] = useState('');
  const [resetThumbPlaceholder, setResetThumbPlaceholder] = useState(false);
  const [resetVideoPlaceholder, setResetVideoPlaceholder] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const { updateCollec, response: responseCollec } = useUpdateCollec('collec');

  useLayoutEffect(() => {
    document.title = 'MediaVerse - Novo Post';
  }, []);

  const { insertDocument, response } = useInsertDocument('posts');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError('');

    if (!selectedCollec.id) {
      setFormError('Selecione uma coleção');
      return;
    }

    if (IsValidTrueOrFalse(isPublic) === true) {
      const publicValue = await countPublicCollecs(selectedCollec.id);
      if (publicValue >= 3) {
        setFormError(`Limite de 3 vídeos públicos atingido nesta coleção`);
        return;
      }
    }

    const mediaVideo = document.getElementById('mediaVideo')?.files?.[0];
    const mediaThumb = document.getElementById('mediaThumb')?.files?.[0];

    if (!mediaVideo) {
      setFormError('Selecione um vídeo.');
      return;
    }

    if (!mediaThumb) {
      setFormError('Selecione uma imagem.');
      return;
    }

    try {
      setProgressPercent(5);
      mediaUpload(
        mediaThumb,
        null,
        'posts',
        null,
        async ({ mediaURL: thumbURL, name: thumbURLName }) => {
          setProgressPercent(34);
          mediaUpload(mediaVideo, null, 'posts', null, async ({ mediaURL, name: mediaURLName }) => {
            setProgressPercent(90);

            await savePost(mediaURL, thumbURL, mediaURLName, thumbURLName);

            setProgressPercent(100);
            setProgressPercent(0);
          });
        },
      );
    } catch (error) {
      console.error(error);
      setProgressPercent(0);
    }
  }

  async function savePost(mediaURL = '', thumbURL = '', mediaURLName = '', thumbURLName = '') {
    // eslint-disable-next-line no-unused-vars
    const { id, name, publicPost, userId } = selectedCollec;

    const post = {
      title,
      mediaURL,
      thumbURL,
      mediaURLName,
      thumbURLName,
      body,
      searchTokens: generateSearchTokens(title),
      collec: id,
      collecName: name,
      isPublic: IsValidTrueOrFalse(isPublic),
      uid: user.uid,
      createdBy: user.displayName,
      createdOn: Date.now().toString(),
      views: 0,
    };

    const Document = await insertDocument(post);

    if (Document) navigate(`/post/${Document?.id}`);
  }

  const Reset = () => {
    setTitle('');
    setBody('');
    setSelectedThumb('');
    setSelectedVideo('');
    setSelectedCollec({});
    setIsPublic('false');
    setFormError('');
    setResetThumbPlaceholder(prevState => !prevState);
    setResetVideoPlaceholder(prevState => !prevState);
  };


  return (
    <ContainerCenter>
      <ContainerForm>
        <Subtitle>Criar novo post</Subtitle>
        <Form onSubmit={handleSubmit}>
          <input type='hidden' name='uid' value={user.uid} />
          <input type='hidden' name='createdBy' value={user.displayName} />
          <CreateInput
            Svg={LuHeading1}
            aria-label='Pense em um título de fácil entendimento...'
            type='text'
            name='title'
            value={title}
            className='red'
            onChange={e => setTitle(e.target.value)}
            placeholder='Pense em um título de fácil entendimento...'
            required
          />
          <ContainerFlex>
            <CustomInputTypeFile
              Svg={LuImagePlus}
              onChange={event => setSelectedThumb(processSelectedFile(event)?.url)}
              resetPlaceholder={resetThumbPlaceholder}
              className='red'
              placeholder='Adicionar Thumb'
              initialPlaceholder='Adicionar Thumb'
              aria-label='adicione arquivos de imagem para ser utilizado como Thumb'
              name='thumb'
              id='mediaThumb'
              accept='image/*'
              required
            />
            <CustomInputTypeFile
              Svg={LuFileVideo}
              onChange={event => setSelectedVideo(processSelectedFile(event)?.url)}
              resetPlaceholder={resetVideoPlaceholder}
              placeholder='Adicionar Vídeo'
              initialPlaceholder='Adicionar Vídeo'
              className='red'
              name='video'
              aria-label='adicione arquivos de Vídeo'
              id='mediaVideo'
              accept='video/*'
              required
            />
          </ContainerFlex>
          {selectedVideo && (
            <ContainerVideo>
              <Video
                controls={true}
                poster={selectedThumb ? selectedThumb : ''}
                src={selectedVideo}
                preload='metadata'
              >
                <track src='captions_en.vtt' kind='captions' label='english_captions' />
              </Video>
            </ContainerVideo>
          )}

          <Textaria
            aria-label='Descrição'
            name='body'
            value={body}
            onChange={e => setBody(e.target.value)}
            placeholder='Compartilhe seu conhecimento aqui...'
            required
          />

          <ContainerFlex>
            <CreateInput
              Svg={LuLock}
              as='select'
              className='red'
              value={isPublic}
              onChange={event => {
                setIsPublic(event.target.value);
              }}
              title='define se a postagem vai ser publica ou privada'
              aria-label='define se a postagem vai ser publica ou privada'
            >

              <Option value={'false'}>Privado</Option>
              <Option value={'true'}>Publico</Option>
            </CreateInput>
            <ModalCollec
              RenderTag={selectedCollec}
              className='red'
              setSelectedCollec={setSelectedCollec}
            >
              <CreateInput Svg={MdOutlineVideoLibrary} as='div' type='button'>
                {selectedCollec?.name ? selectedCollec?.name : 'Adicionar coleção'}
              </CreateInput>
            </ModalCollec>
          </ContainerFlex>

          <ContainerFlex>
            <ButtonResetForm
              className='red'
              type='reset'
              onClick={Reset}
              disabled={progressPercent > 1}
            >
              Limpar
            </ButtonResetForm>
            <ButtonForm className='red' disabled={progressPercent > 1}>
              {progressPercent < 1 ? 'Postar' : <SpinerLoading size={18} />}
            </ButtonForm>
          </ContainerFlex>
          {progressPercent >= 1 && <Progress value={progressPercent} min='0' max='100' />}
          {(responseCollec.error || response.error || formError) && (
            <Error>{response.error || formError || responseCollec.error}</Error>
          )}
        </Form>
      </ContainerForm>
    </ContainerCenter>
  );
};
