/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable no-unused-vars */
import { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CreateInput } from '../../../components/CreateInput';
import { UseAuthValue } from '../../../context/AuthContext';
import { useFetchDocument } from '../../../hooks/useFetchDocument';
import { useUpdateDocument } from '../../../hooks/useUpdateDocument';
import { useUpdateCollec } from '../../../hooks/useUpdateCollec';
import { LuFileVideo, LuHeading1, LuImagePlus, LuLock } from 'react-icons/lu';
import { MdOutlineVideoLibrary } from 'react-icons/md';
import { CustomInputTypeFile } from '../../../components/CustomInputTypeFile';
import { DialogPlay } from '../../../components/ModalPlay';
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
import { ContainerCenter, SpinerLoading, Subtitle } from '../../../styles/styledGlobal';
import { GetCollectionValues } from '../../../utils/GetCollectionValues';
import { IsValidTrueOrFalse } from '../../../utils/IsValidTrueOrFalse';
import { deleteStorageMedia } from '../../../utils/deleteStorageMedia';
import { generateSearchTokens } from '../../../utils/generateSearchTokens';
import { mediaUpload } from '../../../utils/mediaUpload';
import { processSelectedFile } from '../../../utils/processSelectedFile';
import { where } from 'firebase/firestore';

export const EditPost = () => {
  const { id : postId } = useParams();
  const { document: post, loading } = useFetchDocument('posts', postId);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const { user } = UseAuthValue();
  const [selectedCollec, setSelectedCollec] = useState({
    name: '',
    id: '',
    userId: '',
    publicPost: 0,
  });
  const [selectedCollecInit, setSelectedCollecInit] = useState({
    name: '',
    id: '',
    userId: '',
    publicPost: 0,
  });
  const [isPublic, setIsPublic] = useState('false');
  const [formError, setFormError] = useState('');
  const [progressPercent, setProgressPercent] = useState(0);
  const [selectedThumb, setSelectedThumb] = useState('');
  const [selectedVideo, setSelectedVideo] = useState('');
  const { updateDocument, response } = useUpdateDocument('posts');
  const { updateCollec } = useUpdateCollec('collec');

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
          const collecData = await GetCollectionValues('collec', where('id', '==', post?.collec));
          if (collecData.length > 0) {
            setSelectedCollec(collecData[0]);
            setSelectedCollecInit(collecData[0]);
          } else {
            console.error('Collection document not found');
          }
        } catch (error) {
          console.error('Error fetching collection document:', error);
        }
      };
      func();
    }
  }, [post]);


  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    setFormError('');

    if (!selectedCollec.id) {
      setFormError('Selecione uma coleção');
      return;
    }

    if (IsValidTrueOrFalse(isPublic) && selectedCollec?.publicPost === 3) {
      setFormError('Só é possível publicar 3 vídeos publicos ');
      return;
    }

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
    const { id, name, publicPost, userId } = selectedCollec;
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

    const Document = await updateDocument(postId, postToUpdate);
    
    if (isPublic !== post?.isPublic && post.collec === selectedCollec.id) { // Verifica se o valor foi alterado
      if (IsValidTrueOrFalse(isPublic)) {
        await updateCollec(id, { publicPost: publicPost + 1 });
      } else {
        await updateCollec(id, { publicPost: publicPost === 0 ? 0 : publicPost - 1 });
      }
    }
    else if (isPublic === post?.isPublic && post.collec !== selectedCollec.id) {
      if (IsValidTrueOrFalse(isPublic)) {
        await updateCollec(post.collec, { publicPost: publicPost === 0 ? 0 : publicPost - 1 });
        await updateCollec(id, {  publicPost: publicPost + 1 });
      } else {
        await updateCollec(post.collec, { publicPost: publicPost === 0 ? 0 : publicPost - 1 });
      }
    } else if ( isPublic !== post?.isPublic && post.collec !== selectedCollec.id) {
      if (IsValidTrueOrFalse(isPublic)) {
        await updateCollec(id, { publicPost: publicPost + 1 });
        await updateCollec(post.collec, { publicPost: publicPost === 0 ? 0 : publicPost - 1 });
      } else {
        await updateCollec(post.collec, { publicPost: publicPost === 0 ? 0 : publicPost - 1 });
      }
    }
    
    if (Document) navigate(`/post/${postId}`);
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
              <option value={"false"}>Privado</option>
              <hr />
              <option value={"true"}>Publico</option>
            </CreateInput>
            <DialogPlay
              RenderTag={selectedCollec}
              className='red'
              setSelectedCollec={setSelectedCollec}
            >
              <CreateInput Svg={MdOutlineVideoLibrary} as='div' type='button'>
                {selectedCollec.name ? selectedCollec.name : 'Adicionar coleção'}
              </CreateInput>
            </DialogPlay>
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
          {(response.error || formError) && <Error>{response.error || formError}</Error>}
        </FormStyled>
      </ContainerForm>
    </ContainerCenter>
  );
};
