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

export const Post = () => {
  const { id } = useParams();
  const [tagsVal, setTagsVal] = useState([]);
  const { document: post } = useFetchDocument('posts', id);
  const { loading, error } = useIncrementViews('posts', id);

  const shareUrl = window.location.href;
  const shareTitle = `Veja este vídeo sobre "${post?.title}" `;

  useEffect(() => {
    document.title = `MediaVerse - ${post?.title ?? 'Posts'}`;
  }, [post]);

  useEffect(() => {
    const fetchTag = async () => {
      setTagsVal(await FetchTags('posts', post?.collec));
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

  return (
    <ContainerMain>
      <Container>
        {post && (
          <>
            <VideoStyled
              src={post.mediaURL}
              alt={post.title}
              title={post.title}
              poster={post?.thumbURL ? post?.thumbURL : ''}
              preload='none'
              onContextMenu={e => e.preventDefault()}
              controlsList='nodownload'
              controls
            />
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
