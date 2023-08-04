import { useEffect, useLayoutEffect, useState } from 'react';
import { LuFileVideo, LuHeading1, LuImagePlus} from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import { CreateInput } from '../../components/CreateInput';
import { UseAuthValue } from '../../context/AuthContext';
import { useInsertDocument } from '../../hooks/useInsertDocument';
import {
  ContainerFlex,
  ContainerForm,
  ContainerTags,
  ContainerVideo,
  Error,
  Form,
  Progress,
  Video,
} from '../../styles/StyledPostForm';
import { GetCollectionValues } from '../../utils/GetCollectionValues';
import { where } from 'firebase/firestore';
import { CustomInputTypeFile } from '../../components/CustomInputTypeFile';
import { DialogPlay } from '../../components/ModalPlay';
import { ButtonForm, Textaria } from '../../styles/formStyled';
import { ContainerCenter, SpinerLoading, Subtitle } from '../../styles/styledGlobal';
import { generateSearchTokens } from '../../utils/generateSearchTokens';
import { mediaUpload } from '../../utils/mediaUpload';
import { processSelectedFile } from '../../utils/processSelectedFile';
import { ContainerRow } from './styled';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [progressPercent, setProgressPercent] = useState(0);
  const [body, setBody] = useState('');
  const [colecs, setColecs] = useState([]);
  const [selectedColec, setSelectedColec] = useState(''); // Novo estado para tag selecionada
  const { user, userData } = UseAuthValue();

  const [formError, setFormError] = useState('');
  const [selectedThumb, setSelectedThumb] = useState('');
  const [selectedVideo, setSelectedVideo] = useState('');

  useLayoutEffect(() => {
    document.title = 'MediaVerse - Novo Post';
  }, []);

  const { insertDocument, response } = useInsertDocument('posts');
  const navigate = useNavigate();

  const handleColecChange = (event) => {
    setSelectedColec(event.target.value);
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
      let ThumbURL = '';
      let VideoURL = '';

      setProgressPercent(5);
      mediaUpload(mediaThumb, 'posts', null, async ({ mediaURL }) => {
        setProgressPercent(34);
        ThumbURL = mediaURL;
        mediaUpload(mediaVideo, 'posts', null, async ({ mediaURL }) => {
          setProgressPercent(90);
          VideoURL = mediaURL;
          await savePost(VideoURL, ThumbURL);
          setProgressPercent(100);
          setProgressPercent(0);
        });
      });
    } catch (error) {
      console.error(error);
      setProgressPercent(0);
    }
  }

  function resetForm() {
    setTitle('');
    setBody('');
    setSelectedThumb(null);
    setSelectedVideo(null);
  }

  async function savePost(VideoURL, ThumbURL) {
    const post = {
      title,
      mediaURL: VideoURL,
      thumbURL: ThumbURL,
      body,
      searchTokens: generateSearchTokens(title),
      colecs : selectedColec,
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
      setColecs(val);
    };

    func();
  }, [selectedColec]); // Atualize para monitorar selectedTag ao invés de RenderTag

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

          <ContainerRow>
            <ContainerTags>
              <select value={selectedColec} onChange={handleColecChange}>
                <option value=''>Selecione uma Coleção</option>
                {colecs.map((e, i) => (
                  <option key={i} value={e?.name}>
                    {e?.name}
                  </option>
                ))}
              </select>
            </ContainerTags>
            <DialogPlay RenderTag={selectedColec} setRenderTag={setSelectedColec}>
              <ButtonForm type='button' className='red' disabled={progressPercent > 1}>
                Adicionar coleção
              </ButtonForm>
            </DialogPlay>
          </ContainerRow>
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
