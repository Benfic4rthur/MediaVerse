/* eslint-disable no-irregular-whitespace */
/* eslint-disable import/no-unresolved */
/* eslint-disable jsx-a11y/media-has-caption */
import { useLayoutEffect } from 'react';
import { LuEdit, LuEye, LuPlus, LuTrash2 } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import { DialogDemo } from '../../components/Modal';
import { UseAuthValue } from '../../context/AuthContext';
import { useDeleteDocument } from '../../hooks/useDeleteDocument';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
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
  CreatePostTitle,
  Deta,
  MediaPreview,
  Post,
  TitlePost,
  Views,
} from './styled';

const Dashboard = () => {
  const {user, userData } = UseAuthValue();
  const uid = user.uid;

  const { documents: posts } = useFetchDocuments('posts', null, uid);
  const { documents: postsadm } = useFetchDocuments('posts');
  const dateFormat = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' });
  const { deleteDocument } = useDeleteDocument('posts');

  useLayoutEffect(() => {
    document.title = 'MediaVerse- Painel de Posts';
  }, []);

  return (
    <div>
      <ContainerHeader>
        <Subtitle>
          {userData.userStatus === 'admin' ? 'Gerencie Todas as postagens' : 'Gerencie os seus posts'}
        </Subtitle>
        <CreatePostButton as={Link} to='/create-post'>
          Criar Post <LuPlus size={17} />
        </CreatePostButton>
      </ContainerHeader>

      {userData.userStatus === 'admin' ? (
        <>
          {postsadm && postsadm.length === 0 && (
            <ContainerCreatePost>
              <CreatePostTitle>Não foram encontrados posts</CreatePostTitle>
            </ContainerCreatePost>
          )}
          {postsadm?.length > 0 && (
            <ContainerPost>
              {postsadm.map(post => (
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
                            preload='metadata'
                          />
                        ) : (
                          <MediaPreview src={post.mediaURL} alt={post.title} />
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
          )}
        </>
      ) : (
        <>
          {posts && posts.length === 0 && (
            <ContainerCreatePost>
              <CreatePostTitle>Não foram encontrados posts</CreatePostTitle>
            </ContainerCreatePost>
          )}
          {posts?.length > 0 && (
            <ContainerPost>
              {posts.map(post => (
                <Post key={post.id}>
                  <ContainerTitlePost>
                    <>
                      {post.mediaURL && (
                        <DialogDemo mediaURL={post.mediaURL}>
                          {post.mediaURL.includes('.mp4') || post.mediaURL.includes('.webm') ? (
                            <MediaPreview
                              as='video'
                              src={post.mediaURL}
                              alt={post.title}
                              preload='metadata'
                            />
                          ) : (
                            <MediaPreview src={post.mediaURL} alt={post.title} />
                          )}
                        </DialogDemo>
                      )}
                    </>
                    <TitlePost>
                       |  Título: {post.title}  |  Postado:{' '}
                      {dateFormat.format(new Date(Number(post.createdOn)))}
                    </TitlePost>
                  </ContainerTitlePost>
                  <ContainerButtonEvent>
                    <ButtonEvent as={Link} to={`/posts/${post.id}`}>
                      <LuEye />
                    </ButtonEvent>
                    <ButtonEvent as={Link} to={`/posts/editpost/${post.id}`}>
                      <LuEdit />
                    </ButtonEvent>
                    <ButtonEvent
                      className='delete'
                      onClick={() =>
                        window.confirm('Tem certeza que deseja excluir?')
                          ? deleteDocument(post.id)
                          : null
                      }
                    >
                      <LuTrash2 />
                    </ButtonEvent>
                  </ContainerButtonEvent>
                </Post>
              ))}
            </ContainerPost>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;

// /* eslint-disable no-irregular-whitespace */
// /* eslint-disable import/no-unresolved */
// /* eslint-disable jsx-a11y/media-has-caption */
// import { useEffect } from 'react';
// import { LuEdit, LuEye, LuPlus, LuTrash2 } from 'react-icons/lu';
// import { Link } from 'react-router-dom';
// import { DialogDemo } from '../../components/Modal';
// import { UseAuthValue } from '../../context/AuthContext';
// import { useDeleteDocument } from '../../hooks/useDeleteDocument';
// import { useFetchDocuments } from '../../hooks/useFetchDocuments';
// import { useUserInfo } from '../../hooks/userName';
// import { CreatePostButton, Subtitle } from '../../styles/styledGlobal';
// import {
//   Author,
//   ButtonEvent,
//   ContainerButtonEvent,
//   ContainerCreatePost,
//   ContainerHeader,
//   ContainerPost,
//   ContainerTitlePost,
//   CreatePostTitle,
//   MediaPreview,
//   Post,
//   TitlePost,
// } from './styled';

// const Dashboard = () => {
// =======
// const ddDashboard = () => {
// >>>>>>> Stashed changes
//   const { user } = UseAuthValue();
//   const uid = user.uid;
//   const userEmail = user ? user.email : '';
//   const { userData.userStatus } = useUserInfo(userEmail);

//    const { documents: posts } = useFetchDocuments('posts', null, uid);
//   const { documents: postsadm } = useFetchDocuments('posts');

//   const { deleteDocument } = useDeleteDocument('posts');

//   useEffect(() => {
//     document.title = 'MediaVerse- Dashboard';
//   }, []);

//   return (
//     <div>

//       <ContainerHeader>
//         <Subtitle>
//           {userData.userStatus === 'admin' ? 'Gerencie Todas as postagens' : 'Gerencie os seus posts'}
//         </Subtitle>
//         <CreatePostButton as={Link} to='/create-post'>
//           Criar Post <LuPlus size={17} />
//         </CreatePostButton>
//       </ContainerHeader>

//       {userData.userStatus === 'admin' ? (
//         <>
//           {postsadm && postsadm.length === 0 && (
//             <ContainerCreatePost>
//               <CreatePostTitle>Não foram encontrados posts</CreatePostTitle>
//             </ContainerCreatePost>
//           )}
//           {postsadm?.length > 0 && (
//             <ContainerPost>
//               {postsadm.map(post => (
//                 <Post key={post.id}>
//                   <ContainerTitlePost>
//                     <>
//                                           {post.mediaURL && (
//                         <DialogDemo mediaURL={post.mediaURL}>
//                           {post.mediaURL.includes('.mp4') || post.mediaURL.includes('.webm') ? (
//                      <MediaPreview
//                        as='video'
//                               src={post.mediaURL}
//                               alt={post.title}
//                             />
//                           ) : (
//                             <MediaPreview
//                               src={post.mediaURL}
//                               alt={post.title}
//                             />
//                             )}
//                         </DialogDemo>
//                       )}
//                     </>
//                     <TitlePost> |  Título: {post.title}</TitlePost>
//                   </ContainerTitlePost>
//                   <Author>|  Autor: {post.createdBy}</Author>

//                   <ContainerButtonEvent>
//                     <ButtonEvent as={Link} to={`/posts/${post.id}`}>
//                       <LuEye />
//                     </ButtonEvent>
//                     <ButtonEvent as={Link} to={`/posts/editpost/${post.id}`}>
//                       <LuEdit />
//                     </ButtonEvent>
//                     <ButtonEvent
//                       className='delete'
//                       onClick={() =>
//                         window.confirm('Tem certeza que deseja excluir?')
//                           ? deleteDocument(post.id)
//                           : null
//                         }
//                         >
//                       <LuTrash2 />
//                     </ButtonEvent>
//                   </ContainerButtonEvent>
//                 </Post>
//               ))}
//             </ContainerPost>
//           )}
//         </>
//       ) : (
//         <>
//           {posts && posts.length === 0 && (
//             <ContainerCreatePost>
//               <CreatePostTitle>Não foram encontrados posts</CreatePostTitle>
//             </ContainerCreatePost>
//           )}
//           {posts?.length > 0 && (
//             <ContainerPost>
//               {posts.map(post => (
//                 <Post key={post.id}>
//                   <ContainerTitlePost>
//                     <>
//                       {post.mediaURL && (
//                         <DialogDemo mediaURL={post.mediaURL}>
//                           {post.mediaURL.includes('.mp4') || post.mediaURL.includes('.webm') ? (
//                             <MediaPreview
//                               as='video'
//                               src={post.mediaURL}
//                               alt={post.title}
//                             />
//                           ) : (
//                             <MediaPreview
//                               src={post.mediaURL}
//                               alt={post.title}
//                             />
//                             )}
//                         </DialogDemo>
//                       )}
//                     </>
//                     <TitlePost> |  Título: {post.title}</TitlePost>
//                   </ContainerTitlePost>
//                   <ContainerButtonEvent>
//                     <ButtonEvent as={Link} to={`/posts/${post.id}`}>
//                       <LuEye />
//                     </ButtonEvent>
//                     <ButtonEvent as={Link} to={`/posts/editpost/${post.id}`}>
//                       <LuEdit />
//                     </ButtonEvent>
//                     <ButtonEvent
//                       className='delete'
//                       onClick={() =>
//                         window.confirm('Tem certeza que deseja excluir?')
//                         ? deleteDocument(post.id)
//                         : null
//                       }
//                     >
//                       <LuTrash2 />
//                     </ButtonEvent>
//                   </ContainerButtonEvent>
//                 </Post>
//               ))}
//             </ContainerPost>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default Dashboard;

// export default function Dashboard()  {
//   const { user } = UseAuthValue();
//   const uid = user.uid;
//   const userEmail = user ? user.email : '';
//   const { userData.userStatus } = useUserInfo(userEmail);

//   const { documents } = useFetchDocuments('posts', null, userData.userStatus === 'admin' ? uid : null);

//   const { deleteDocument } = useDeleteDocument('posts');
//   useEffect(() => {
//     document.title = 'MediaVerse- Dashboard';
//   }, []);

//   if (!userData.userStatus) {
//     // Renderiza um estado de carregamento ou qualquer outro elemento enquanto o userData.userStatus está sendo buscado
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <ContainerHeader>
//         <Subtitle>
//           {userData.userStatus === 'admin' ? 'Gerencie Todas as postagens' : 'Gerencie os seus posts'}
//         </Subtitle>
//         <CreatePostButton as={Link} to='/create-post'>
//           Criar Post <LuPlus size={17} />
//         </CreatePostButton>
//       </ContainerHeader>

//       {documents && documents.length === 0 ? (
//         <ContainerCreatePost>
//           <CreatePostTitle>Não foram encontrados posts</CreatePostTitle>
//         </ContainerCreatePost>
//       ) : (
//         <ContainerPost>
//           {documents?.map(post => (
//             <Post key={post.id}>
//               <ContainerTitlePost>
//                 {post.mediaURL && (
//                   <DialogDemo mediaURL={post.mediaURL}>
//                     {post.mediaURL.includes('.mp4') || post.mediaURL.includes('.webm') ? (
//                       <MediaPreview as='video' src={post.mediaURL} alt={post.title} />
//                     ) : (
//                       <MediaPreview src={post.mediaURL} alt={post.title} />
//                     )}
//                   </DialogDemo>
//                 )}
//                 <TitlePost> | Título: {post.title}</TitlePost>
//               </ContainerTitlePost>

//               {userData.userStatus === 'admin' && <Author> | Autor: {post.createdBy}</Author>}

//               <ContainerButtonEvent>
//                 <ButtonEvent as={Link} to={`/posts/${post.id}`}>
//                   <LuEye />
//                 </ButtonEvent>
//                 <ButtonEvent as={Link} to={`/posts/editpost/${post.id}`}>
//                   <LuEdit />
//                 </ButtonEvent>
//                 <ButtonEvent
//                   className='delete'
//                   onClick={() =>
//                     window.confirm('Tem certeza que deseja excluir?')
//                       ? deleteDocument(post.id)
//                       : null
//                   }
//                 >
//                   <LuTrash2 />
//                 </ButtonEvent>
//               </ContainerButtonEvent>
//             </Post>
//           ))}
//         </ContainerPost>
//       )}
//     </div>
//   );
// };
