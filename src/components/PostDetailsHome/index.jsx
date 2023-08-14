import { where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GetCollectionValues } from '../../utils/GetCollectionValues';
import { Author, ContainerDeta, ContainerMidia, ContainerPost, Deta, Image, Title } from './styled';

export const PostDetailsHome = ({ post, to }) => {
  const [date, setDate] = useState();
  const [postId, setPostId] = useState('');
  const [Size, setSize] = useState(0);
  const limiteCaracteres = 40;
  // eslint-disable-next-line no-unused-vars
  const [posts, setPosts] = useState([]);
  const title =
    post.name.length > limiteCaracteres
      ? `${post.name.substring(0, limiteCaracteres)}...`
      : post.name;

  useEffect(() => {
    const fetchPosts = async () => {
      const Where = where('collec', '==', post.id);
      const val = await GetCollectionValues('posts', Where);

      // Ordenar por ordem decrescente de createdAt
      const sortedPosts = val.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);

      setPosts(sortedPosts.reverse()); // Revertendo a ordem dos posts

      setPostId(sortedPosts?.[0]?.id);
      setSize(sortedPosts.length);
    };

    fetchPosts();
  }, [post]);

  useEffect(() => {
    const objectDate = new Date(post?.createdAt?.seconds * 1000).toLocaleDateString('pt-BR');

    setDate(objectDate);
  }, [post]);

  return (
    <>
      {Size > 0 && (
        <ContainerPost as={Link} to={`${to}${postId}`}>
          {post.mediaURL && (
            <ContainerMidia>
              <Image src={post.mediaURL} alt={post.title} title={post.title} />
              <Deta title={'Postado em ' + date}>{date}</Deta>
            </ContainerMidia>
          )}
          <Title aria-label={post.title} title={post.title}>
            {title}
          </Title>
          <ContainerDeta>
            <Author>{post.category}</Author>
            <Author>{Size > 1 ? `${Size} Aulas` : `${Size} Aula`}</Author>
          </ContainerDeta>
        </ContainerPost>
      )}
    </>
  );
};
//codigo antigo
// import { where } from 'firebase/firestore';
// import { useEffect, useLayoutEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { GetCollectionValues } from '../../utils/GetCollectionValues';
// import { Author, ContainerDeta, ContainerMidia, ContainerPost, Deta, Image, Title } from './styled';

// export const PostDetailsHome = ({ post, to }) => {
//   const [date, setDate] = useState();
//   const [postId, setPostId] = useState('');
//   const [Size, setSize] = useState(0);
//   const limiteCaracteres = 40;
//   const title =
//     post.name.length > limiteCaracteres
//       ? `${post.name.substring(0, limiteCaracteres)}...`
//       : post.name;

//   useLayoutEffect(() => {
//     const objectDate = new Date(post?.createdAt?.seconds * 1000).toLocaleDateString('pt-BR');

//     setDate(objectDate);
//   }, []);

//   useEffect(() => {
//     const func = async () => {
//       const Where = where('collec', '==', post.id);
//       const val = await GetCollectionValues('posts', Where);

//       setPostId(val?.[0]?.id);
//       setSize(val.length);
//     };

//     func();
//   }, [post]);

//   return (
//     <>
//     {Size > 0 && (
//       <ContainerPost as={Link} to={`${to}${postId}`}>
//         {post.mediaURL && (
//           <ContainerMidia>
//             <Image src={post.mediaURL} alt={post.title} title={post.title} />
//             <Deta title={'Postado em ' + date}>{date}</Deta>
//           </ContainerMidia>
//         )}
//         <Title aria-label={post.title} title={post.title}>
//           {title}
//         </Title>
//         <ContainerDeta>
//           <Author>{post.category}</Author>
//           <Author>{Size > 1 ? `${Size} Aulas` : `${Size} Aula`}</Author>
//         </ContainerDeta>
//       </ContainerPost>
//     )}
//   </>
//   );
// };
