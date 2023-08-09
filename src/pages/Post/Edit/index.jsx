/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable no-unused-vars */
import { useEffect, useLayoutEffect, useState } from 'react';
import { LuFileVideo, LuHeading1, LuImagePlus, LuLock } from 'react-icons/lu';
import { MdOutlineVideoLibrary } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { CreateInput } from '../../../components/CreateInput';
import { CustomInputTypeFile } from '../../../components/CustomInputTypeFile';
import { ModalCollec } from '../../../components/ModalCollec';
import { UseAuthValue } from '../../../context/AuthContext';
import { countPublicCollecs } from '../../../hooks/useCountCollecs';
import { useFetchDocument } from '../../../hooks/useFetchDocument';
import { useNavigate } from 'react-router-dom';
import { useUpdateDocument } from '../../../hooks/useUpdateDocument';
import {
  ContainerFlex,
  ContainerForm,
  ContainerVideo,
  Error,
  Form as FormStyled,
  Progress,
  Video,
} from '../../../styles/StyledPostForm';
import { ButtonForm, ButtonResetForm, Textaria } from '../../../styles/formStyled';
import { ContainerCenter, Option, SpinerLoading, Subtitle } from '../../../styles/styledGlobal';
import { FetchDocument } from '../../../utils/FetchDocument';
import { IsValidTrueOrFalse } from '../../../utils/IsValidTrueOrFalse';
import { deleteStorageMedia } from '../../../utils/deleteStorageMedia';
import { generateSearchTokens } from '../../../utils/generateSearchTokens';
import { mediaUpload } from '../../../utils/mediaUpload';
import { processSelectedFile } from '../../../utils/processSelectedFile';
import { update } from 'lodash';

export const EditPost = () => {
  const { id: postId } = useParams();
  const { document: post } = useFetchDocument('posts', postId);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const { user } = UseAuthValue();
  const [selectedCollec, setSelectedCollec] = useState({
    name: '',
    id: '',
    userId: '',
  });
  const [selectedCollecInit, setSelectedCollecInit] = useState({
    name: '',
    id: '',
    userId: '',
  });
  const [isPublic, setIsPublic] = useState('false');
  const [formError, setFormError] = useState('');
  const [progressPercent, setProgressPercent] = useState(0);
  const [selectedThumb, setSelectedThumb] = useState('');
  const [selectedVideo, setSelectedVideo] = useState('');
  const navigate = useNavigate();
  const { updateDocument, response } = useUpdateDocument('posts', postId);

  useLayoutEffect(() => {
    document.title = 'MediaVerse - Edição';
  }, []);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setSelectedThumb(post?.thumbURL);
      setSelectedVideo(post?.mediaURL);
      setBody(post.body);
      setIsPublic(post?.isPublic);
      const func = async () => {
        try {
          const collecData = await FetchDocument('collec', post?.collec);
          setSelectedCollec(collecData.data());
          setSelectedCollecInit(collecData.data());
        } catch (error) {
          console.error('Error fetching collection document:', error);
        }
      };
      func();
    }
  }, [post]);

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError('');

    if (IsValidTrueOrFalse(isPublic) === true) {
      const publicValue = await countPublicCollecs(selectedCollec.id);
      if (publicValue >= 3) {
        // setFormError(`Você já postou 3 vídeos públicos na coleção "${selectedCollec?.name}"`);
        setFormError(`Limite de 3 vídeos públicos atingido nesta coleção`);
        return;
      }
    }

    if (!selectedCollec.id) {
      setFormError('Selecione uma coleção');
      return;
    }

    // if (IsValidTrueOrFalse(isPublic) && selectedCollec?.publicPost === 3) {
    //   setFormError(`Você já postou 3 vídeos públicos na coleção "${selectedCollec?.name}"`);
    //   return;
    // }

    try {
      const mediaVideo = document.getElementById('mediaVideo')?.files?.[0];
      const mediaThumb = document.getElementById('mediaThumb')?.files?.[0];

      if (mediaVideo && mediaThumb) {
        setProgressPercent(5);

        mediaUpload(
          mediaThumb,
          null,
          'posts',
          null,
          async ({ mediaURL: thumbURL, name: thumbURLName }) => {
            setProgressPercent(34);
            await deleteStorageMedia('posts', post?.thumbURLName);

            mediaUpload(
              mediaVideo,
              null,
              'posts',
              null,
              async ({ mediaURL, name: mediaURLName }) => {
                setProgressPercent(85);
                await deleteStorageMedia('posts', post?.mediaURLName);

                setProgressPercent(90);
                await savePost(mediaURL, thumbURL, mediaURLName, thumbURLName);

                setProgressPercent(100);
                setProgressPercent(0);
              },
            );
          },
        );
      } else if (mediaVideo) {
        mediaUpload(
          mediaVideo,
          null,
          'posts',
          setProgressPercent,
          async ({ mediaURL, name: mediaURLName }) => {
            await deleteStorageMedia('posts', post?.mediaURLName);

            await savePost(mediaURL, selectedThumb, mediaURLName, document?.thumbURLName);
            setProgressPercent(0);
          },
        );
      } else if (mediaThumb) {
        mediaUpload(
          mediaThumb,
          null,
          'posts',
          setProgressPercent,
          async ({ mediaURL: thumbURL, name: thumbURLName }) => {
            await deleteStorageMedia('posts', post?.thumbURLName);

            await savePost(selectedVideo, thumbURL, document?.mediaURLName, thumbURLName);
            setProgressPercent(0);
          },
        );
      } else {
        setProgressPercent(5);
        await savePost(
          selectedVideo,
          selectedThumb,
          document?.thumbURLName,
          document?.mediaURLName,
        );
        setProgressPercent(100);
        setProgressPercent(0);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function savePost(mediaURL = '', thumbURL = '', mediaURLName = '', thumbURLName = '') {
    const { uid, displayName } = user;
    const postToUpdate = {
      title,
      mediaURL,
      thumbURL,
      mediaURLName,
      thumbURLName,
      body,
      searchTokens: generateSearchTokens(title),
      collec: selectedCollec.id,
      collecName: selectedCollec.name,
      isPublic: IsValidTrueOrFalse(isPublic),
      uid: uid,
      createdBy: displayName,
      createdOn: Date.now().toString(),
      views: post?.views ?? 0,
    };

    try {
      const document = await updateDocument(postId, postToUpdate);
      if (document) navigate(`/post/${postId}`);
    } catch (error) {
      setFormError(error);
    }
  }

  const Reset = () => {
    setTitle(post.title);
    setBody(post.body);
    setSelectedThumb(post?.thumbURL);
    setSelectedVideo(post.mediaURL);
    setSelectedCollec(selectedCollecInit);
    setIsPublic(post?.isPublic);
    setFormError('');
  };

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
                {selectedCollec.name ? selectedCollec.name : 'Adicionar coleção'}
              </CreateInput>
            </ModalCollec>
          </ContainerFlex>

          <ContainerFlex>
            <ButtonResetForm
              onClick={Reset}
              className='red'
              type='reset'
              disabled={progressPercent > 1}
            >
              Resetar
            </ButtonResetForm>
            <ButtonForm className='red' disabled={progressPercent > 1}>
              {progressPercent < 1 ? 'Enviar' : <SpinerLoading size={18} />}
            </ButtonForm>
          </ContainerFlex>
          {progressPercent >= 1 && <Progress value={progressPercent} min='0' max='100' />}
          {formError && <Error>{formError}</Error>}
        </FormStyled>
      </ContainerForm>
    </ContainerCenter>
  );
};
