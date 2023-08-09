import { where } from 'firebase/firestore';
import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { LuEye, LuPlus, LuTag, LuTrash } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import { CreateInput } from '../../../components/CreateInputDash';
import { UseAuthValue } from '../../../context/AuthContext';
import { ModalCollec } from '../../../components/ModalCollecCreate';
import { countCollecVideos } from '../../../hooks/useCountCollecVideos';

import {
  ContainerSpinerLoading,
  // CreatePostButton,
  Option,
  SpinerLoading,
  Subtitle,
} from '../../../styles/styledGlobal';
import { GetCollectionValues } from '../../../utils/GetCollectionValues';
import {
  ButtonEvent,
  ContainerButtonEvent,
  ContainerHeader,
  ContainerPost,
  ContainerTitlePost,
  CreatePostTitle,
  Post,
  TitlePost,
  MediaPreview,
  CreateCollecButton,
  ContainerPostHeader,
} from './styled';
// import { countCollecVideos } from '../../../hooks/useCountCollecVideos';
import { useDeleteCollec } from '../../../hooks/useDeleteCollec';

export const Dashboard = () => {
  const { userData, applicationTags } = UseAuthValue();
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loader, setLoader] = useState(true);
  const [category, setCategory] = useState('');
  const [videoCounts, setVideoCounts] = useState({});
  const { deleteDocument } = useDeleteCollec();

  useLayoutEffect(() => {
    document.title = 'MediaVerse - Painel de Coleções';
  }, []);

  useEffect(() => {
    const func = async (Where = null) => {
      let collectionWhere = Where;
      if (category) {
        collectionWhere = where('category', '==', category);
      }

      const val = await GetCollectionValues('collec', collectionWhere);

      if (val.length > 0) {
        const videoCountPromises = val.map(async post => {
          const videos = await countCollecVideos(post?.id);

          return { [post?.id]: videos };
        });

        const counts = await Promise.all(videoCountPromises);

        const newVideoCounts = Object.assign(...counts);

        setVideoCounts(newVideoCounts);
        setFilteredPosts(val);
        setLoader(false);
      } else {
        setVideoCounts({});
        setFilteredPosts([]);
        setLoader(false);
      }
    };

    if (userData.userStatus === 'admin') {
      setLoader(true);
      func();
    } else {
      setLoader(true);

      const Where = where('userId', '==', userData.userId);
      func(Where);
    }
  }, [category, userData.userId, userData.userStatus]);

  const memoizedFilteredPosts = useMemo(() => filteredPosts, [filteredPosts]);
  const memoizedVideoCounts = useMemo(() => videoCounts, [videoCounts]);

  const handleDelete = async (id, name, thumbName) => {
    const confirmDelete = window.confirm(`Tem certeza que deseja excluir a coleção ${name}?`);
    if (confirmDelete) {
      const val = await deleteDocument(id, name, thumbName);
      // Atualize o estado 'Collec' se a exclusão for bem-sucedida

      if (val) {
        setFilteredPosts(filteredPosts.filter(post => post.id !== id));
      } else {
        alert(`Não é possível excluir a coleção. Existem posts associados a "${name}".`);
      }
    }
  };

  return (
    <div>
      <ContainerHeader>
        <Subtitle>Gerencie Coleções</Subtitle>
        <ModalCollec
              className='red'
            >
              <CreateCollecButton as='div' type='button' style={{ cursor: 'pointer' }}>
                Criar Coleção <LuPlus size={17} />
              </CreateCollecButton>
            </ModalCollec>
        {/* <CreatePostButton as={Link} to='/post/create'>
          Criar Post <LuPlus size={17} />
        </CreatePostButton> */}
      </ContainerHeader>

      <ContainerPost>
        <ContainerPostHeader>
        <CreateInput
          Svg={LuTag}
          as='select'
          className='red'
          value={category}
          onChange={event => {
            setCategory(event.target.value);
          }}
          title='define a categoria'
          aria-label='define a categoria'
        >
          <Option value={''}>Selecione a Categoria</Option>
          {applicationTags.map((e, i) => (
            <Option key={`${e}${i}`} value={e}>
              {e}
            </Option>
          ))}
        </CreateInput>
        {/* <ModalCollec
              className='red'
            >
              <CreateCollecButton as='div' type='button' style={{ cursor: 'pointer' }}>
                Criar Coleção <LuPlus size={17} />
              </CreateCollecButton>
            </ModalCollec> */}
            </ContainerPostHeader>
        {loader ? (
          <ContainerSpinerLoading>
            <SpinerLoading size={45} />
          </ContainerSpinerLoading>
        ) : (
          <>
            {category === '' && !loader ? (
              <CreatePostTitle>Selecione uma categoria para ver suas coleções</CreatePostTitle>
            ) : (
              memoizedFilteredPosts?.map(post => (
                <Post key={post.id}>
                  <MediaPreview src={post.mediaURL} alt={post.name} />
                  <ContainerTitlePost className='titulo'>
                    <TitlePost title={`Título: ${post.name}`}>
                      Título: {post.name} | Vídeos: {memoizedVideoCounts[post.id] || 0}
                    </TitlePost>
                  </ContainerTitlePost>
                  <ContainerButtonEvent>
                    <ButtonEvent as={Link} to={`/dashboard/posts/${post.id}`} title='ver post'>
                      <LuEye />
                    </ButtonEvent>
                    <ButtonEvent
                      className='delete'
                      title='deleter coleção'
                      aria-label='deleter coleção'
                      onClick={() => {
                        handleDelete(post.id, post.name, post.thumbName);
                      }}
                    >
                      <LuTrash style={{ cursor: 'pointer' }} /> {/* Ícone de lixeira */}
                    </ButtonEvent>
                  </ContainerButtonEvent>
                </Post>
              ))
            )}
          </>
        )}
        {!memoizedFilteredPosts?.length && (
          <CreatePostTitle>Não foram encontradas coleções para essa categoria</CreatePostTitle>
        )}
      </ContainerPost>
    </div>
  );
};
