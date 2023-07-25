import {
  LuEye,
  // LuShare,
  LuUser,
} from 'react-icons/lu';
import { useParams } from 'react-router-dom';
import { useFetchDocument } from '../../hooks/useFetchDocument';
import { ContainerSpinerLoading, SpinerLoading } from '../../styles/styledGlobal';
import {
  Author,
  Body,
  Container,
  ContainerInfo,
  ContainerMain,
  // LinkShare,
  // NavLinkStyled,
  SpaceShare,
  Title,
  VideoStyled,
} from '../Post/styled';

import { useEffect, useState } from 'react';
import { Sidebar } from '../../components/Sidebar';
import { useIncrementViews } from '../../hooks/useIncrementViews';
import { FetchTags } from '../../utils/FetchTags';
import { getElapsedTime } from '../../utils/getElapsedTime';

const Learning = () => {
  const { id } = useParams();
  const [tagsVal, setTagsVal] = useState([]);
  // const [Loading, setLoading] = useState(false);
  const { document: post } = useFetchDocument('posts', id);
  const { loading, error } = useIncrementViews('posts', id);

  useEffect(() => {
    document.title = `MediaVerse - ${post?.title ?? 'Posts'}`;
  }, [post]);

  useEffect(() => {
    const fetchTag = async () => {
      setTagsVal(await FetchTags('posts', ['aprendendo-o-sistema']));
    };

    fetchTag();
  }, [post]);

  useEffect(() => {
    console.log(tagsVal);
  }, [tagsVal]);

  // const handleCopyUrl = () => {
  //   if (post) {
  //     navigator.clipboard
  //       .writeText(window.location.href)
  //       .then(() => {
  //         console.log('URL copiado com sucesso!');
  //       })
  //       .catch(error => {
  //         console.error('Erro ao copiar o URL:', error);
  //       });
  //   }
  // };

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
                {/* <NavLinkStyled onClick={handleCopyUrl} title={'Compartilhar link'} target='_blank'>
                  <LinkShare>
                    <LuShare size={20} />
                    Compartilhar
                  </LinkShare>
                </NavLinkStyled> */}
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

export default Learning;
