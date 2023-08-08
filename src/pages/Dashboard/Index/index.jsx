import { where } from 'firebase/firestore';
import { useEffect, useLayoutEffect, useState } from 'react';
import { LuEye, LuPlus } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import { UseAuthValue } from '../../../context/AuthContext';
import {
  ContainerSpinerLoading,
  CreatePostButton,
  SpinerLoading,
  Subtitle,
} from '../../../styles/styledGlobal';
import { GetCollectionValues } from '../../../utils/GetCollectionValues';
import {
  ButtonEvent,
  ContainerCreatePost,
  ContainerDate,
  ContainerHeader,
  ContainerPost,
  ContainerTitlePost,
  CreatePostTitle,
  Post,
  TitlePost,
} from './styled';

export const Dashboard = () => {
  const { userData } = UseAuthValue();
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loader, setLoader] = useState(true);

  useLayoutEffect(() => {
    document.title = 'MediaVerse - Painel de Posts';
  }, []);

  useEffect(() => {
    const func = async (Where = null) => {
      setLoader(true);

      const val = await GetCollectionValues('collec', Where);

      setLoader(false);

      setFilteredPosts(val);
    };

    if (userData.userStatus === 'admin') {
      func();
    } else {
      const Where = where('userId', '==', userData.userId);
      func(Where);
    }
  }, []);

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
          {filteredPosts?.length > 0 ? (
            <ContainerPost>
              {filteredPosts?.map(post => (
                <Post key={post.id}>
                  <ContainerTitlePost className='titulo'>
                    <TitlePost title={`Título: ${post.name}`}>Título: {post.name}</TitlePost>
                  </ContainerTitlePost>
                  <ContainerDate>
                    <ButtonEvent as={Link} to={`/dashboard/posts/${post.id}`} title='ver post'>
                      <LuEye />
                    </ButtonEvent>
                  </ContainerDate>
                </Post>
              ))}
            </ContainerPost>
          ) : (
            <ContainerCreatePost>
              <CreatePostTitle>Não foram encontradas coleções</CreatePostTitle>
            </ContainerCreatePost>
          )}
        </>
      )}
    </div>
  );
};
