import { where } from 'firebase/firestore';
import { useEffect, useLayoutEffect, useState } from 'react';
import { LuEdit, LuEye, LuPlus, LuTrash2 } from 'react-icons/lu';
import { Link, useParams } from 'react-router-dom';
import { IoArrowBackCircle } from 'react-icons/io5';
import { DialogDemo } from '../../../components/Modal';
import {
  ContainerSpinerLoading,
  CreatePostButton,
  SpinerLoading,
  Subtitle,
} from '../../../styles/styledGlobal';
import { DeleteDocument } from '../../../utils/DeleteDocument';
import { GetCollectionValues } from '../../../utils/GetCollectionValues';
import { deleteStorageMedia } from '../../../utils/deleteStorageMedia';
import {
  ButtonEvent,
  ContainerButtonEvent,
  ContainerCreatePost,
  ContainerDate,
  ContainerDialog,
  ContainerHeader,
  ContainerPost,
  ContainerTitlePost,
  CreatePostTitle,
  Deta,
  MediaPreview,
  Post,
  TitlePost,
  Views,
  CreateCollecButton,
} from './styled';

export const DashboardPost = () => {
  const [posts, setPosts] = useState([]);
  const [reloader, setReloader] = useState(0);
  const [loader, setLoader] = useState(true);
  const { id } = useParams();

  const dateFormat = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' });

  useEffect(() => {
    const func = async () => {
      try {
        const Where = where('collec', '==', id);

        setLoader(true);
        const data = await GetCollectionValues('posts', Where);
        setPosts(data);
        setLoader(false);
      } catch (error) {
        console.error(error);
        setLoader(false);
      }
    };
    func();
  }, [id, reloader]);

  useLayoutEffect(() => {
    document.title = 'MediaVerse - Painel de Posts';
  }, []);

  const DeteleMedia = async postData => {
    try {
      // parte responsavel por apagar os arquivos da Storage e da Firestore Database
      await Promise.all([
        DeleteDocument('posts', postData.id),
        deleteStorageMedia('posts', postData?.thumbURLName),
        deleteStorageMedia('posts', postData?.mediaURLName),
      ]);
      setReloader(e => ++e);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <ContainerHeader>
        <Subtitle>Gerencie os posts deste curso </Subtitle>

        <CreatePostButton as={Link} to='/post/create'>
          Criar Post <LuPlus size={17} />
        </CreatePostButton>
      </ContainerHeader>

      {loader ? (
        <ContainerSpinerLoading>
          <SpinerLoading size={45} />
        </ContainerSpinerLoading>
      ) : (
        <>
          {posts?.length > 0 ? (
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
                    <TitlePost title={`Título: ${post.title}`}>
                      Título: {post.title} | Coleção {post.collecName}
                    </TitlePost>
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
          ) : (
            <ContainerCreatePost>
              <CreatePostTitle>Não foram encontrados posts nesta coleção.</CreatePostTitle>
              <CreateCollecButton as={Link} to={`/dashboard/${id}`}>
                <IoArrowBackCircle size={20} /> Voltar para painel de cursos
              </CreateCollecButton>
            </ContainerCreatePost>
          )}
        </>
      )}
    </div>
  );
};
