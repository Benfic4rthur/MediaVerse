import { LuEye, LuShare, LuUser } from 'react-icons/lu';
import { useParams } from 'react-router-dom';
import { useFetchDocument } from '../../../hooks/useFetchDocument';
import { ContainerSpinerLoading, SpinerLoading } from '../../../styles/styledGlobal';
import {
  Author,
  Body,
  Container,
  ContainerInfo,
  ContainerMain,
  // ContainerTag,
  LinkShare,
  SpaceShare,
  // Tag,
  Title,
  VideoStyled,
} from './styled';

import { useEffect, useState } from 'react';
import { DialogDemo } from '../../../components/ModalShare';
import { Sidebar } from '../../../components/Sidebar';
import { useIncrementViews } from '../../../hooks/useIncrementViews';
import { FetchTags } from '../../../utils/FetchTags';
import { getElapsedTime } from '../../../utils/getElapsedTime';

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
      setTagsVal(await FetchTags('posts', post?.tags));
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
  // const arrayLength = Array.from({ length: 10 }).map((_, i) => i);

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
            {/* {post?.tags?.length > 0 && (
              <ContainerTag>
                {post?.tags?.map(tag => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </ContainerTag>
            )} */}
          </>
        )}
      </Container>
      <Sidebar tagsVal={tagsVal} />
    </ContainerMain>
  );
};
