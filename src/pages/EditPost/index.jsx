/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable no-unused-vars */
import { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CreateInput } from '../../components/CreateInput';

import { UseAuthValue } from '../../context/AuthContext';
import { useFetchDocument } from '../../hooks/useFetchDocument';
import { useUpdateDocument } from '../../hooks/useUpdateDocument';

import { LuFileVideo, LuHeading1, LuImagePlus, LuPlus, LuX } from 'react-icons/lu';

import { CustomInputTypeFile } from '../../components/CustomInputTypeFile';
import { ButtonForm, Textaria } from '../../styles/formStyled';
import {
  ButtonTag,
  ContainerFlex,
  ContainerForm,
  ContainerTags,
  ContainerVideo,
  Error,
  Form as FormStyled,
  NotTags,
  Progress,
  Tag,
  Video,
} from '../../styles/StyledPostForm';
import { ContainerCenter, SpinerLoading, Subtitle } from '../../styles/styledGlobal';
import { generateSearchTokens } from '../../utils/generateSearchTokens';
import { mediaUpload } from '../../utils/mediaUpload';
import { processSelectedFile } from '../../utils/processSelectedFile';

const EditPost = () => {
  const { id } = useParams();
  const { document: post, loading } = useFetchDocument('posts', id);
  const [title, setTitle] = useState('');
  const [mediaURL, setMediaURL] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState([]);
  const { applicationTags } = UseAuthValue();
  const [tagsList, setTagsList] = useState(applicationTags);
  const [formError, setFormError] = useState('');
  const [progressPercent, setProgressPercent] = useState(0);
  const [selectedThumb, setSelectedThumb] = useState('');
  const [selectedVideo, setSelectedVideo] = useState('');

  useLayoutEffect(() => {
    document.title = 'MediaVerse- Edição';
  }, []);

  function removeInitialValuesTags(params, initArray) {
    return params.reduce((acc, tag) => {
      return (acc = acc.filter(e => e !== tag));
    }, initArray);
  }

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setMediaURL();
      setSelectedThumb(post?.thumbURL);
      setSelectedVideo(post.mediaURL);
      setBody(post.body);

      const reduce = removeInitialValuesTags(post.tags, applicationTags);

      setTags(post.tags);
      setTagsList(reduce);
    }
  }, [post]);

  const { user } = UseAuthValue();
  const navigate = useNavigate();
  const { updateDocument, response } = useUpdateDocument('posts');

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError('');

    try {
      const mediaVideo = document.getElementById('mediaVideo')?.files?.[0];
      const mediaThumb = document.getElementById('mediaThumb')?.files?.[0];

      if (mediaVideo && mediaThumb) {
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
      } else if (mediaVideo) {
        mediaUpload(mediaVideo, setProgressPercent, async mediaURL => {
          await savePost(mediaURL, selectedThumb);
        });
      } else if (mediaThumb) {
        mediaUpload(mediaThumb, setProgressPercent, async mediaURL => {
          await savePost(selectedVideo, mediaURL);
        });
      } else {
        setProgressPercent(5);
        await savePost(selectedVideo, selectedThumb);
        setProgressPercent(100);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function savePost(VideoURL, ThumbURL) {
    const { uid, displayName } = user;
    const postToUpdate = {
      title,
      mediaURL: VideoURL,
      thumbURL: ThumbURL,
      body,
      searchTokens: generateSearchTokens(title),
      tags,
      uid: uid,
      createdBy: displayName,
      createdOn: Date.now().toString(),
      views: post?.views ?? 0,
    };

    await updateDocument(id, postToUpdate);

    navigate('/');
  }

  const Reset = () => {
    setTitle(post.title);
    setBody(post.body);
    setSelectedThumb(post?.thumbURL);
    setSelectedVideo(post.mediaURL);

    const reduce = removeInitialValuesTags(post.tags, applicationTags);

    setTags(post.tags);
    setTagsList(reduce);
  };

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
        <Subtitle>Editando post: {post?.title}</Subtitle>
        <FormStyled onSubmit={handleSubmit}>
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
              type='file'
              onChange={event => setSelectedThumb(processSelectedFile(event)?.url)}
              className='red'
              placeholder='Substituir Thumb atual'
              Adicionar
              aria-label='adicione um novo arquivo de imagem para ser utilizado como Thumb atual'
              id='mediaThumb'
              accept='image/*'
            />
            <CustomInputTypeFile
              Svg={LuFileVideo}
              onChange={event => setSelectedVideo(processSelectedFile(event)?.url)}
              type='file'
              className='red'
              placeholder='Substituir Video atual'
              aria-label='adicione um novo arquivo para ubstituir Vídeo atual'
              id='mediaVideo'
              accept='video/* '
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
            placeholder='Descrição...'
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
              <NotTags>Adicione Tags</NotTags>
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
            <ButtonForm onClick={Reset} className='red' type='reset' disabled={progressPercent > 1}>
              Resetar
            </ButtonForm>
            <ButtonForm className='red' disabled={progressPercent > 1}>
              {progressPercent < 1 ? 'Enviar' : <SpinerLoading size={18} />}
            </ButtonForm>
          </ContainerFlex>
          {progressPercent >= 1 && <Progress value={progressPercent} min='0' max='100' />}
          {(response.error || formError) && <Error>{response.error || formError}</Error>}
        </FormStyled>
      </ContainerForm>
    </ContainerCenter>
  );
};

export default EditPost;

() => {
  return (
    <div>
      <input type='file' name='' id='' />
    </div>
  );
};
