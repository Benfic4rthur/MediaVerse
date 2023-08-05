import { where } from 'firebase/firestore';
import { useEffect, useLayoutEffect, useState } from 'react';
import { LuFileVideo, LuHeading1, LuImagePlus } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import { CreateInput } from '../../components/CreateInput';
import { CustomInputTypeFile } from '../../components/CustomInputTypeFile';
import { DialogPlay } from '../../components/ModalPlay';
import { UseAuthValue } from '../../context/AuthContext';
import { useInsertDocument } from '../../hooks/useInsertDocument';
import {
  ContainerFlex,
  ContainerForm,
  ContainerVideo,
  Error,
  Form,
  Progress,
  Video,
} from '../../styles/StyledPostForm';
import { ButtonForm, Textaria } from '../../styles/formStyled';
import { ContainerCenter, SpinerLoading, Subtitle } from '../../styles/styledGlobal';
import { GetCollectionValues } from '../../utils/GetCollectionValues';
import { generateSearchTokens } from '../../utils/generateSearchTokens';
import { mediaUpload } from '../../utils/mediaUpload';
import { processSelectedFile } from '../../utils/processSelectedFile';
import { DialogButtonForm } from '../../components/ModalPlay/styled';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [progressPercent, setProgressPercent] = useState(0);
  const [body, setBody] = useState('');
  const [collec, setCollec] = useState([]);
  const [selectedCollec, setSelectedCollec] = useState(''); // Novo estado para tag selecionada
  const { user, userData } = UseAuthValue();

  const [formError, setFormError] = useState('');
  const [selectedThumb, setSelectedThumb] = useState('');
  const [selectedVideo, setSelectedVideo] = useState('');

  useLayoutEffect(() => {
    document.title = 'MediaVerse - Novo Post';
  }, []);

  const { insertDocument, response } = useInsertDocument('posts');
  const navigate = useNavigate();

  const handleCollecChange = event => {
    setSelectedCollec(event.target.value);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError('');

    const mediaVideo = document.getElementById('mediaVideo')?.files?.[0];
    const mediaThumb = document.getElementById('mediaThumb')?.files?.[0];

    if (!mediaVideo) {
      setFormError('Selecione um vídeo.');
      return;
    }

    if (!mediaThumb) {
      setFormError('Selecione uma image.');
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

  function resetForm() {
    setTitle('');
    setBody('');
    setSelectedCollec('');
    setSelectedThumb(null);
    setSelectedVideo(null);
  }

  async function savePost(mediaURL = '', thumbURL = '', mediaURLName = '', thumbURLName = '') {
    const post = {
      title,
      mediaURL,
      thumbURL,
      mediaURLName,
      thumbURLName,
      body,
      searchTokens: generateSearchTokens(title),
      collec: selectedCollec,
      uid: user.uid,
      createdBy: user.displayName,
      createdOn: Date.now().toString(),
      views: 0,
    };

    const Document = await insertDocument(post);

    if (Document) navigate(`/posts/${Document?.id}`);
  }

  useEffect(() => {
    const func = async () => {
      const Where = where('userId', '==', userData.userId);

      const val = await GetCollectionValues('collec', Where);
      setCollec(val);
    };

    func();
  }, [selectedCollec]); // Atualize para monitorar selectedTag ao invés de RenderTag

  if (formError) return null;

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
              className='red'
              placeholder='Adicionar thumb'
              aria-label='adicione arquivos de imagem para ser utilizado como Thumb'
              name='thumb'
              id='mediaThumb'
              accept='image/*'
              required
            />
            <CustomInputTypeFile
              Svg={LuFileVideo}
              onChange={event => setSelectedVideo(processSelectedFile(event)?.url)}
              placeholder='Adicionar Video'
              className='red'
              name='video'
              aria-label='adicione arquivos de Vídeo'
              id='mediaVideo'
              accept='video/* '
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
              as='select'
              className='red'
              value={selectedCollec}
              onChange={handleCollecChange}
            >
              
              <option value=''>Selecione uma Coleção</option>
              <hr />
              {collec.map((e, i) => (
                <option key={i} value={e?.id}>
                  {e?.name}
                </option>
              ))}
            </CreateInput>
            <DialogPlay RenderTag={selectedCollec} className='red' setRenderTag={setSelectedCollec}>
              <DialogButtonForm type='button' disabled={progressPercent > 1}>
                Adicionar coleção
              </DialogButtonForm>
            </DialogPlay>
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
          {progressPercent >= 1 && <Progress value={progressPercent} min='0' max='100' />}
          {(response.error || formError) && <Error>{response.error || formError}</Error>}
        </Form>
      </ContainerForm>
    </ContainerCenter>
  );
};

export default CreatePost;
