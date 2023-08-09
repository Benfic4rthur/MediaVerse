import { useEffect, useLayoutEffect, useState, useMemo } from 'react';
import { where } from 'firebase/firestore';
import { LuEye, LuPlus, LuTag } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import { UseAuthValue } from '../../../context/AuthContext';
import {
  ContainerSpinerLoading,
  CreatePostButton,
  SpinerLoading,
  Subtitle,
  Option,
} from '../../../styles/styledGlobal';
import { GetCollectionValues } from '../../../utils/GetCollectionValues';
import {
  ButtonEvent,
  ContainerDate,
  ContainerHeader,
  ContainerPost,
  ContainerTitlePost,
  CreatePostTitle,
  Post,
  TitlePost,
} from './styled';
import { CreateInput } from '../../../components/CreateInputDash';
import { countCollecVideos } from '../../../hooks/useCountCollecVideos';

export const Dashboard = () => {
  const { userData, applicationTags } = UseAuthValue();
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loader, setLoader] = useState(true);
  const [category, setCategory] = useState('');
  const [videoCounts, setVideoCounts] = useState({});

  useLayoutEffect(() => {
    document.title = 'MediaVerse - Painel de Posts';
  }, []);

  useEffect(() => {
    const func = async (Where = null) => {
      setLoader(true);

      let collectionWhere = Where;
      if (category) {
        collectionWhere = where('category', '==', category);
      }

      const val = await GetCollectionValues('collec', collectionWhere);
      if (val.length > 0) {
        const videoCountPromises = val.map(async post => {
          const videos = await countCollecVideos(post.id);
          return { postId: post.id, count: videos };
        });

        Promise.all(videoCountPromises).then(counts => {
          const newVideoCounts = {};
          counts.forEach(countObj => {
            newVideoCounts[countObj.postId] = countObj.count;
          });
          setVideoCounts(newVideoCounts);
        });

        setFilteredPosts(val);
        setLoader(false);
      } else {
        setVideoCounts({});
        setFilteredPosts([]);
        setLoader(false);
      }
    };

    if (userData.userStatus === 'admin') {
      func();
    } else {
      const Where = where('userId', '==', userData.userId);
      func(Where);
    }
  }, [category, userData.userId, userData.userStatus]);

  const memoizedFilteredPosts = useMemo(() => filteredPosts, [filteredPosts]);
  const memoizedVideoCounts = useMemo(() => videoCounts, [videoCounts]);

  return (
    <div>
      <ContainerHeader>
        <Subtitle>Gerencie Coleções</Subtitle>

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
          <ContainerPost>
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
            {category === '' ? (
              <CreatePostTitle>Selecione uma categoria para ver suas coleções</CreatePostTitle>
            ) : (
              memoizedFilteredPosts?.map(post => (
                <Post key={post.id}>
                  <ContainerTitlePost className='titulo'>
                    <TitlePost title={`Título: ${post.name}`}>
                      Título: {post.name} | Vídeos: {memoizedVideoCounts[post.id] || 0}
                    </TitlePost>
                  </ContainerTitlePost>
                  <ContainerDate>
                    <ButtonEvent as={Link} to={`/dashboard/posts/${post.id}`} title='ver post'>
                      <LuEye />
                    </ButtonEvent>
                  </ContainerDate>
                </Post>
              ))
            )}{' '}
            {!memoizedFilteredPosts?.length && (
              <CreatePostTitle>Não foram encontradas coleções para essa categoria</CreatePostTitle>
            )}
          </ContainerPost>
        </>
      )}
    </div>
  );
};
