import { useLayoutEffect, useState } from 'react';
import { LuFileVideo, LuHeading1, LuImagePlus, LuPlus, LuTag, LuX } from 'react-icons/lu';

import { useNavigate } from 'react-router-dom';
import { CreateInput } from '../../components/CreateInput';
import { UseAuthValue } from '../../context/AuthContext';
import { useInsertDocument } from '../../hooks/useInsertDocument';
import {
  ButtonTag,
  ContainerFlex,
  ContainerForm,
  ContainerTags,
  ContainerVideo,
  Error,
  Form,
  NotTags,
  Progress,
  Tag,
  Video,
} from '../../styles/StyledPostForm';

import { CustomInputTypeFile } from '../../components/CustomInputTypeFile';
import { ButtonForm, Textaria } from '../../styles/formStyled';
import { ContainerCenter, SpinerLoading, Subtitle } from '../../styles/styledGlobal';
import { generateSearchTokens } from '../../utils/generateSearchTokens';
import { mediaUpload } from '../../utils/mediaUpload';
import { processSelectedFile } from '../../utils/processSelectedFile';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [progressPercent, setProgressPercent] = useState(0);
  const [body, setBody] = useState('');
  const [tags, setTags] = useState([]);
  const { applicationTags } = UseAuthValue();
  const [tagsList, setTagsList] = useState(applicationTags);
  const [formError, setFormError] = useState('');
  const [selectedThumb, setSelectedThumb] = useState('');
  const [selectedVideo, setSelectedVideo] = useState('');

  const { user } = UseAuthValue();

  const { insertDocument, response } = useInsertDocument('posts');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError('');

    const mediaVideo = document.getElementById('mediaVideo')?.files?.[0];
    const mediaThumb = document.getElementById('mediaThumb')?.files?.[0];

    // console.log(mediaThumb);

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
      mediaUpload(mediaThumb, null, async mediaURL => {
        setProgressPercent(34);
        ThumbURL = mediaURL;
        mediaUpload(mediaVideo, null, async mediaURL => {
          setProgressPercent(90);
          VideoURL = mediaURL;
          await savePost(VideoURL, ThumbURL);
          setProgressPercent(100);
        });
      });
    } catch (error) {
      console.error(error);
    }
  }

  function resetForm() {
    setTitle('');
    setBody('');
    setTagsList(applicationTags);
    setTags([]);
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
      tags,
      uid: user.uid,
      createdBy: user.displayName,
      createdOn: Date.now().toString(),
      views: 0,
    };

   const Document =   await insertDocument(post);

    if (Document) navigate(`/posts/${Document?.id}`);
  }

  useLayoutEffect(() => {
    document.title = 'MediaVerse- Novo Post';
  }, []);

  if (formError) return null;

  function EditTags(tag, addArr, removeArr) {
    const add = [...addArr, tag];
    const remove = removeArr.filter(e => e !== tag);
    return [add, remove];
  }

  function RemoveTagArr(tag) {
    const [add, remove] = EditTags(tag, tagsList, tags);

    setTags(remove);
    setTagsList(add);
  }

  function AddTagArr(tag) {
    const [add, remove] = EditTags(tag, tags, tagsList);

    setTags(add);
    setTagsList(remove);
  }

  return (
    <ContainerCenter>
      <ContainerForm>
        <Subtitle>Criar novo post</Subtitle>
        <Form onSubmit={handleSubmit}>
          <input type='hidden' name='uid' value={user.uid} />
          <input type='hidden' name='createdBy' value={user.displayName} />
          <CreateInput
            Svg={LuHeading1}
            aria-label='Título'
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

          <ContainerTags>
            {tags.length > 0 ? (
              tags?.map((e, i) => (
                <Tag key={i}>
                  {e}
                  <ButtonTag type='button' onClick={() => RemoveTagArr(e)}>
                    <LuX />
                  </ButtonTag>
                </Tag>
              ))
            ) : (
              <NotTags>
                <LuTag style={{ marginBottom: '-2px', fontWeight: 'bold' }} /> Adicione Tags
              </NotTags>
            )}
          </ContainerTags>
          <ContainerTags>
            {tagsList?.map((e, i) => (
              <Tag key={i}>
                {e}
                <ButtonTag type='button' onClick={() => AddTagArr(e)}>
                  <LuPlus />
                </ButtonTag>
              </Tag>
            ))}
          </ContainerTags>
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
