import { LuPlus } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import { UseAuthValue } from '../../context/AuthContext';
import {
  CreatePostButton,
  PostsNotFoundContainer,
  PostsNotFoundTitle,
} from '../../styles/styledGlobal';

export const NoPost = ({ title }) => {
  const { userData } = UseAuthValue();

  return (
    <PostsNotFoundContainer>
      <PostsNotFoundTitle>{title}</PostsNotFoundTitle>
      {(userData.userStatus === 'funcionario' || userData.userStatus === 'admin') && (
        <CreatePostButton as={Link} to='/post/create'>
          Criar postagem <LuPlus size={17} />
        </CreatePostButton>
      )}
    </PostsNotFoundContainer>
  );
};
