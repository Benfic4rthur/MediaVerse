/* eslint-disable no-irregular-whitespace */
/* eslint-disable import/no-unresolved */
/* eslint-disable jsx-a11y/media-has-caption */
import { useEffect, useLayoutEffect, useState } from 'react';
import { LuEdit, LuEye, LuPlus, LuTrash2 } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import { DialogDemo } from '../../components/Modal';
import { UseAuthValue } from '../../context/AuthContext';
import { useDeleteDocument } from '../../hooks/useDeleteDocument';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { useUserInfo } from '../../hooks/userName';
import { CreatePostButton, Subtitle } from '../../styles/styledGlobal';
import {
  Author,
  ButtonEvent,
  ContainerButtonEvent,
  ContainerCreatePost,
  ContainerDate,
  ContainerDialog,
  ContainerHeader,
  ContainerPost,
  ContainerTitlePost,
  ContainerToggle,
  CreatePostTitle,
  Deta,
  MediaPreview,
  Post,
  TitlePost,
  TitleToggle,
  Views,
} from './styled';

const Dashboard = () => {
  const { user } = UseAuthValue();
  const uid = user.uid;
  const userEmail = user ? user.email : '';
  const { userStatus } = useUserInfo(userEmail);

  const { documents: posts } = useFetchDocuments('posts', null, uid);
  const { documents: postsadm } = useFetchDocuments('posts');
  const dateFormat = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' });
  const { deleteDocument } = useDeleteDocument('posts');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchAll, setSearchAll] = useState(true);

  useLayoutEffect(() => {
    document.title = 'Genuine Sistemas - Painel de Posts';
  }, []);

  useEffect(() => {
    const sortedPostsAd = postsadm?.filter(
      post => !post.tags.includes('aprendendo-o-sistema'),
    );
    
    const postTags = postsadm?.filter(post => post.tags.includes('aprendendo-o-sistema'));

    const valueAd = searchAll ? sortedPostsAd : postTags

    setFilteredPosts(userStatus === 'admin' ? valueAd : posts);
  }, [posts, postsadm, searchAll]);

  return (
    <div>
      <ContainerHeader>
        <Subtitle>
          {userStatus === 'admin' ? 'Gerencie todas as postagens' : 'Gerencie os seus posts'}
        </Subtitle>

        <CreatePostButton as={Link} to='/create-post'>
          Criar Post <LuPlus size={17} />
        </CreatePostButton>
      </ContainerHeader>

      {filteredPosts?.length === 0 ? (
        <ContainerCreatePost>
          <CreatePostTitle>Não foram encontrados posts</CreatePostTitle>
        </ContainerCreatePost>
      ) : filteredPosts?.length > 0 && userStatus === 'admin' ? (
        <ContainerPost>
          {
            <ContainerToggle as='form' action=''>
              <ContainerToggle>
                <input
                  type='radio'
                  name='fav_language'
                  id='Conteudo'
                  checked={searchAll}
                  onClick={() => setSearchAll(true)}
                />
                <TitleToggle as='label' htmlFor='Conteudo'>
                  Todo Conteúdo
                </TitleToggle>
              </ContainerToggle>
              <span />
              <ContainerToggle>
                <input
                  type='radio'
                  name='fav_language'
                  id='Sistema'
                  checked={!searchAll}
                  onClick={() => setSearchAll(false)}
                />
                <TitleToggle as='label' htmlFor='Sistema'>
                  Aprendendo o Sistema
                </TitleToggle>
              </ContainerToggle>
            </ContainerToggle>
          }
          {filteredPosts.map(post => (
            <Post key={post.id}>
              {post.mediaURL && (
                <ContainerDialog>
                  <DialogDemo
                    $width={'4rem'}
                    $height={'4rem'}
                    mediaURL={post.mediaURL}
                    className='media'
                  >
                    {post.mediaURL.includes('.mp4') || post.mediaURL.includes('.webm') ? (
                      <MediaPreview
                        as='video'
                        src={post.mediaURL}
                        alt={post.title}
                        poster={post.thumbURL ? post.thumbURL : ''}
                        preload='none'
                      />
                    ) : (
                      <MediaPreview
                        src={post.mediaURL}
                        alt={post.title}
                        poster={post.thumbURL ? post.thumbURL : ''}
                        preload='none'
                      />
                    )}
                  </DialogDemo>
                </ContainerDialog>
              )}
              <ContainerTitlePost className='titulo'>
                <TitlePost title={`Título: ${post.title}`}>Título: {post.title}</TitlePost>
                <Author title={`Autor: ${post.createdBy}`}>Autor: {post.createdBy}</Author>
              </ContainerTitlePost>
              <ContainerDate className='data'>
                <Views title='Quantidade de visualizações'>
                  <LuEye /> {post.views}
                </Views>
                <Deta title='Data de criação'>
                  {dateFormat.format(new Date(Number(post.createdOn)))}
                </Deta>
              </ContainerDate>
              <ContainerButtonEvent>
                <ButtonEvent as={Link} to={`/posts/${post.id}`} title='ver post'>
                  <LuEye />
                </ButtonEvent>
                <ButtonEvent as={Link} to={`/posts/editpost/${post.id}`} title='editar post'>
                  <LuEdit />
                </ButtonEvent>
                <ButtonEvent
                  className='delete'
                  onClick={() =>
                    window.confirm('Tem certeza que deseja excluir?')
                      ? deleteDocument(post.id)
                      : null
                  }
                  title='excluir post'
                >
                  <LuTrash2 />
                </ButtonEvent>
              </ContainerButtonEvent>
            </Post>
          ))}
        </ContainerPost>
      ) : (
        <ContainerPost>
          {filteredPosts?.map(post => (
            <Post key={post.id}>
              {post.mediaURL && (
                <ContainerDialog>
                  <DialogDemo
                    $width={'4rem'}
                    $height={'4rem'}
                    mediaURL={post.mediaURL}
                    className='media'
                  >
                    {post.mediaURL.includes('.mp4') || post.mediaURL.includes('.webm') ? (
                      <MediaPreview
                        as='video'
                        src={post.mediaURL}
                        alt={post.title}
                        poster={post.thumbURL ? post.thumbURL : ''}
                        preload='none'
                      />
                    ) : (
                      <MediaPreview
                        src={post.mediaURL}
                        alt={post.title}
                        poster={post.thumbURL ? post.thumbURL : ''}
                        preload='none'
                      />
                    )}
                  </DialogDemo>
                </ContainerDialog>
              )}
              <ContainerTitlePost className='titulo'>
                <TitlePost title={`Título: ${post.title}`}>Título: {post.title}</TitlePost>
              </ContainerTitlePost>
              <ContainerDate className='data'>
                <Views title='Quantidade de visualizações'>
                  <LuEye /> {post.views}
                </Views>
                <Deta title='Data de criação'>
                  {dateFormat.format(new Date(Number(post.createdOn)))}
                </Deta>
              </ContainerDate>
              <ContainerButtonEvent>
                <ButtonEvent as={Link} to={`/posts/${post.id}`} title='ver post'>
                  <LuEye />
                </ButtonEvent>
                <ButtonEvent as={Link} to={`/posts/editpost/${post.id}`} title='editar post'>
                  <LuEdit />
                </ButtonEvent>
                <ButtonEvent
                  className='delete'
                  onClick={() =>
                    window.confirm('Tem certeza que deseja excluir?')
                      ? deleteDocument(post.id)
                      : null
                  }
                  title='excluir post'
                >
                  <LuTrash2 />
                </ButtonEvent>
              </ContainerButtonEvent>
            </Post>
          ))}
        </ContainerPost>
      )}
    </div>
  );
};

export default Dashboard;
