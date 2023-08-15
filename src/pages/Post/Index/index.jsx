import { useEffect, useState } from 'react';
import { LuEye, LuShare, LuUser } from 'react-icons/lu';
import { useParams } from 'react-router-dom';
import { DialogDemo } from '../../../components/ModalShare';
import { Sidebar } from '../../../components/Sidebar';
import { useFetchDocument } from '../../../hooks/useFetchDocument';
import { useIncrementViews } from '../../../hooks/useIncrementViews';
import { ContainerSpinerLoading, SpinerLoading } from '../../../styles/styledGlobal';
import { FetchTags } from '../../../utils/FetchTags';
import { getElapsedTime } from '../../../utils/getElapsedTime';
import {
  Author,
  Body,
  Container,
  ContainerInfo,
  ContainerMain,
  LinkShare,
  SpaceShare,
  Title,
  VideoStyled,
} from './styled';
import { useNavigate } from 'react-router-dom';

export const Post = () => {
  const { id } = useParams();
  const [tagsVal, setTagsVal] = useState([]);
  const { document: post } = useFetchDocument('posts', id);
  const { loading, error } = useIncrementViews('posts', id);
  const videoNavigate = useNavigate();
  const shareUrl = window.location.href;
  const shareTitle = `Veja este vídeo sobre "${post?.title}" `;
  const [videoEnded, setVideoEnded] = useState(false); // Estado para rastrear se o vídeo acabou
  const [postPosition, setPostPosition] = useState(0);
  const [lastVideo, setLastVideo] = useState(false);

  useEffect(() => {
    document.title = `MediaVerse - ${post?.title ?? 'Posts'}`;
  }, [post]);

  useEffect(() => {
    const fetchTag = async () => {
      setTagsVal(await FetchTags('posts', post?.collec));
      setPostPosition(post?.position);
    };

    fetchTag();
  }, [post]);

  if (loading) {
    return (
      <ContainerSpinerLoading>
        <SpinerLoading size={45} />
      </ContainerSpinerLoading>
    );
  }

  if (error) {
    return <div>Ocorreu um erro ao carregar o post: {error}</div>;
  }

  const elapsedTime = post ? getElapsedTime(post.createdOn) : '';

  const handleVideoEnd = () => {
    setVideoEnded(true); // Atualiza o estado quando o vídeo acabar
    setTimeout(() => {
      videoRedirect();
      setVideoEnded(false);
    }, 3000);
  };

  const videoRedirect = () => {
    const index = tagsVal.reduce((acc, e) => {
      return e.position == Number(postPosition) + 1 ? e : acc;
    }, 0);
    if (index?.id) {
      videoNavigate(`/post/${index?.id}`);
    } else {
      setLastVideo(true);
      setTimeout(() => {
        videoNavigate('/');
      }, 3000);
    }
  };

  return (
    <ContainerMain>
      <Container>
        {post && (
          <>
            {!videoEnded ? (
              <VideoStyled
                src={post.mediaURL}
                alt={post.title}
                title={post.title}
                poster={post?.thumbURL ? post?.thumbURL : ''}
                preload='none'
                onContextMenu={e => e.preventDefault()}
                controlsList='nodownload'
                controls
                onEnded={handleVideoEnd}
              />
            ) : lastVideo === true ? (
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: 500,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  background: 'rgba(0, 0, 0, 0.5)',
                  borderRadius: 10,
                  flexDirection: 'column',
                  gap: 10,
                }}
              >
                <p style={{ color: 'white', fontSize: '24px' }}>
                  Parabéns, você concluiu o curso {post.collecName}
                </p>
              </div>
            ) : (
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: 500,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  background: 'rgba(0, 0, 0, 0.5)',
                  borderRadius: 10,
                  flexDirection: 'column',
                  gap: 10,
                }}
              >
                <SpinerLoading size={45} style={{ color: 'white' }} />
                <p style={{ color: 'white', fontSize: '24px' }}>Carregando próximo vídeo...</p>
              </div>
            )}

            <Title>{post.title}</Title>
            <ContainerInfo>
              <Author>
                <LuUser size={16} />
                {post.createdBy}
              </Author>
              <SpaceShare>
                <DialogDemo $width={'4rem'} $height={'4rem'} shareUrl={shareUrl} title={shareTitle}>
                  <LinkShare>
                    <LuShare size={18} />
                    Compartilhar
                  </LinkShare>
                </DialogDemo>
                <Author>
                  <LuEye size={16} />
                  {post.views} visualizações • {elapsedTime}
                </Author>
              </SpaceShare>
            </ContainerInfo>
            <Body>{post.body}</Body>
          </>
        )}
      </Container>
      <Sidebar tagsVal={tagsVal} />
    </ContainerMain>
  );
};
