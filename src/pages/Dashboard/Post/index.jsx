import { useEffect, useLayoutEffect, useState } from 'react';
import { LuEdit, LuEye, LuPlus, LuTrash2 } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import { DialogDemo } from '../../../components/Modal';
import { UseAuthValue } from '../../../context/AuthContext';
import { useDeleteDocument } from '../../../hooks/useDeleteDocument';
import { useFetchDocuments } from '../../../hooks/useFetchDocuments';
import { CreatePostButton, Subtitle } from '../../../styles/styledGlobal';
import { deleteStorageMedia } from '../../../utils/deleteStorageMedia';
import {
  Author,
  ButtonEvent,
  ContainerButtonEvent,
  ContainerCreatePost,
  ContainerDate,
  ContainerDialog,
  ContainerFormToggle,
  ContainerHeader,
  ContainerPost,
  ContainerTitlePost,
  ContainerToggle,
  CreatePostTitle,
  Deta,
  InputRadial,
  MediaPreview,
  Post,
  TitlePost,
  TitleToggle,
  Views,
} from './styled';

export const DashboardPost = () => {
  const { user, userData } = UseAuthValue();
  const uid = user.uid;

  const { documents: posts } = useFetchDocuments('posts', null, uid);
  const { documents: postsadm } = useFetchDocuments('posts');
  const dateFormat = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' });
  const { deleteDocument } = useDeleteDocument('posts');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchAll, setSearchAll] = useState(true);

  useLayoutEffect(() => {
    document.title = 'MediaVerse - Painel de Posts';
  }, []);

  useEffect(() => {
    const sortedPostsAd = postsadm?.filter(post => !post?.colecs?.includes('promotional'));

    const postTags = postsadm?.filter(post => post?.colecs?.includes('promotional'));

    const valueAd = searchAll ? sortedPostsAd : postTags;

    setFilteredPosts(userData.userStatus === 'admin' ? valueAd : posts);
  }, [posts, postsadm, searchAll]);

  const DeteleMedia = async postData => {
    try {
      // parte responsavel por apagar os arquivos da Storage e da Firestore Database
      await Promise.all([
        deleteDocument(postData.id),
        deleteStorageMedia('posts', postData?.thumbURLName),
        deleteStorageMedia('posts', postData?.mediaURLName),
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <ContainerHeader>
        <Subtitle>
          {userData.userStatus === 'admin'
            ? 'Gerencie todas as postagens'
            : 'Gerencie os seus posts'}
        </Subtitle>

        <CreatePostButton as={Link} to='/post/create'>
          Criar Post <LuPlus size={17} />
        </CreatePostButton>
      </ContainerHeader>
      {postsadm?.length > 0 && userData.userStatus === 'admin' && (
        <ContainerPost>
          {
            <ContainerFormToggle as='form' action=''>
              <ContainerToggle as='label' htmlFor='Conteudo'>
                <InputRadial
                  type='radio'
                  name='fav_language'
                  id='Conteudo'
                  defaultChecked={true}
                  onClick={() => setSearchAll(true)}
                />
                <TitleToggle>Todo Conteúdo</TitleToggle>
              </ContainerToggle>
              <span />
              <ContainerToggle as='label' htmlFor='Sistema'>
                <InputRadial
                  type='radio'
                  name='fav_language'
                  id='Sistema'
                  onClick={() => setSearchAll(false)}
                />
                <TitleToggle>Promocional</TitleToggle>
              </ContainerToggle>
            </ContainerFormToggle>
          }
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
                <ButtonEvent as={Link} to={`/post/${post.id}`} title='ver post'>
                  <LuEye />
                </ButtonEvent>
                <ButtonEvent as={Link} to={`/post/edit/${post.id}`} title='editar post'>
                  <LuEdit />
                </ButtonEvent>
                <ButtonEvent
                  className='delete'
                  onClick={() =>
                    window.confirm('Tem certeza que deseja excluir?') ? DeteleMedia(post) : null
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

      {posts?.length > 0 && userData.userStatus !== 'admin' && (
        <ContainerPost>
          {posts?.map(post => (
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
                <ButtonEvent as={Link} to={`/post/${post.id}`} title='ver post'>
                  <LuEye />
                </ButtonEvent>
                <ButtonEvent as={Link} to={`/post/edit/${post.id}`} title='editar post'>
                  <LuEdit />
                </ButtonEvent>
                <ButtonEvent
                  className='delete'
                  onClick={() =>
                    window.confirm('Tem certeza que deseja excluir?') ? DeteleMedia(post) : null
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

      {postsadm?.length === 0 && userData.userStatus === 'admin' && (
        <ContainerCreatePost>
          <CreatePostTitle>Não foram encontrados posts</CreatePostTitle>
        </ContainerCreatePost>
      )}

      {posts?.length === 0 && userData.userStatus !== 'admin' && (
        <ContainerCreatePost>
          <CreatePostTitle>Não foram encontrados posts</CreatePostTitle>
        </ContainerCreatePost>
      )}
    </div>
  );
};
