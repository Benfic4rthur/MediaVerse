import { LuPlus } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import { UseAuthValue } from '../../context/AuthContext';
import {
  CreatePostButton,
  PostsNotFoundContainer,
  PostsNotFoundTitle,
} from '../../styles/styledGlobal';

export const NoPost = ({ title }) => {
  const { userStatus } = UseAuthValue();

  return (
    <PostsNotFoundContainer>
      <PostsNotFoundTitle>{title}</PostsNotFoundTitle>
      {(userStatus === 'funcionario' || userStatus === 'admin') && (
        <CreatePostButton as={Link} to='/create-post'>
          Criar postagem <LuPlus size={17} />
        </CreatePostButton>
      )}
    </PostsNotFoundContainer>
  );
};
