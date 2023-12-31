/* eslint-disable no-unused-vars */
//react
import { useEffect, useState } from 'react';
//react router
import { RouterProvider } from 'react-router-dom';
//firebase
import { onAuthStateChanged, signOut } from 'firebase/auth';
//router
import { router } from './router';
//context
import { AuthProvider } from './context/AuthContext';

//hooks
import { UseAuthentication } from './hooks/useAuthentication';
import { ContainerSpinerLoading, SpinerLoading } from './styles/styledGlobal';
import { fetchUserInfo } from './utils/fetchUserInfo';

function App() {
  const [user, setUser] = useState(undefined);
  const [Reload, setReload] = useState(0);
  const [userData, setUserData] = useState({
    accessCollection: [],
    avatarName: '',
    deletedAt: '',
    displayName: '',
    id: '',
    loggedAt: '',
    loggedOutAt: '',
    phoneNumber: '',
    photoURL: '',
    userGender: '',
    userId: '',
    userName: '',
    userStatus: '',
  });

  const { auth } = UseAuthentication();
  const userEmail = user ? user.email : '';

  const loadingUser = user === undefined;
  const notClientTags = 'promotional';
  const applicationTags = [
    'Moda e Estilo',
    'Beleza e Cuidados Pessoais',
    'Plataformas Digitais e Redes Sociais',
    'Marketing Digital',
    'Tecnologia e Desenvolvimento Web',
    'Fotografia e Edição de Imagens',
    'Design Gráfico e Criatividade',
    'Empreendedorismo e Negócios',
    'Finanças Pessoais e Investimentos',
    'Saúde e Bem-Estar',
    'Idiomas e Comunicação',
    'Arte e Cultura',
    'Alimentação Saudável e Culinária',
    'Música e Produção Musical',
    'Escrita Criativa/Produção de Conteúdo',
    'Psicologia e Desenvolvimento Pessoal',
    'Educação Infantil e Pedagogia',
    'Sustentabilidade e Meio Ambiente',
    'Esportes e Atividades Físicas',
    'Viagens e Turismo',
    'Desenvolvimento Profissional',
    'Programação/Desenvolvimento de Software',
    'Artesanato e DIY (Faça Você Mesmo)',
    'Ciência e Tecnologia',
    'História e Cultura Geral',
    'Meio Ambiente e Sustentabilidade',
    'Fotografia e Vídeo Documental',
    'Liderança e Gestão de Equipes',
    'Comunicação Interpessoal',
    'Maternidade e Paternidade',
  ];

  const imgUser = {
    feminino: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    masculino: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
  };

  const usePageVisibility = () => {
    const [isVisible, setIsVisible] = useState(true);

    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
      if (!document.hidden) {
        console.log('A página voltou para o primeiro plano.');
      } else {
        console.log('A página deixou de estar em primeiro plano.');
      }
    };

    useEffect(() => {
      document.addEventListener('visibilitychange', handleVisibilityChange);
      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      };
    }, []);

    return isVisible;
  };
  const isVisible = usePageVisibility();

  useEffect(() => {
    const func = async email => {
      const data = await fetchUserInfo(email);
      setUserData(data);
    };
    if (userEmail) {
      func(userEmail);
    }
  }, [Reload, userEmail]);

  useEffect(() => {
    // const intervalId = setInterval(() => {
    //   setCountdown(prevCountdown => {
    //     if (prevCountdown % 60 === 0) {
    //       console.log(`A página será atualizada em ${prevCountdown / 60} minutos...`);
    //     }
    //     return prevCountdown - 1;
    //   });
    // }, 1000);

    const timeoutId = setTimeout(() => {
      setReload(e => ++e);
    }, 3600000);

    if (!isVisible) {
      // clearInterval(intervalId);
      clearTimeout(timeoutId);
    }

    return () => {
      // clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [isVisible]);

  useEffect(() => {
    if (userData?.deletedAt !== '' && userData?.userId === userEmail) {
      signOut(auth);
    }
    onAuthStateChanged(auth, user => {
      setUser(user);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth, userData?.deletedAt]);

  if (loadingUser) {
    return (
      <ContainerSpinerLoading style={{ height: '100vh' }}>
        <SpinerLoading size={45} />
      </ContainerSpinerLoading>
    );
  }

  return (
    <AuthProvider
      value={{
        user,
        applicationTags,
        notClientTags,
        imgUser,
        userData,
        Reload,
        setReload,
      }}
    >
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;

// import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

// //hooks
// import { useEffect, useState } from 'react';
// import { UseAuthentication } from './hooks/useAuthentication';
// import { useUserInfo } from './hooks/userName';
// //pages
// import About from './pages/About';
// import Catalog from './pages/Catalog';
// import CreatePost from './pages/CreatePost';
// import Dashboard from './pages/Dashboard';
// import EditPost from './pages/EditPost';
// import Home from './pages/Home';
// import Login from './pages/Login';
// import Post from './pages/Post';
// import Register from './pages/Register';
// import Search from './pages/Search';
// import ForgotPassword from './pages/ForgotPassword';
// import NotFound from './pages/NotFound/';
// //components
// import Footer from './components/Footer';
// import Navbar from './components/Navbar/index.jsx';
// //context
// import { AuthProvider } from './context/AuthContext';
// //firebase
// import { onAuthStateChanged } from 'firebase/auth';
// import { ContainerHidden, Main } from './styles/styledGlobal';

// function App() {
//   const [user, setUser] = useState(undefined);
//   const { auth } = UseAuthentication();
//   const userEmail = user ? user.email : '';
//   const { userStatus } = useUserInfo(userEmail);
//   const loadingUser = user === undefined;

//   useEffect(() => {
//     onAuthStateChanged(auth, user => {
//       setUser(user);
//     });
//   }, [auth]);

//   if (loadingUser) {
//     return <p>Carregando...</p>;
//   }

//   return (
//     <>
//       <AuthProvider value={{ user }}>
//         <BrowserRouter>
//           <ContainerHidden>
//             <Navbar />
//             <Main>
//               <Routes>
//                 <Route path='/' element={user ? <Home /> : <Navigate to='/login' />} />
//                 <Route path='/catalog' element={user ? <Catalog /> : <Navigate to='/login' />} />
//                 <Route path='/about' element={<About /> }/>
//                 <Route path='/search' element={user ? <Search /> : <Navigate to='/login' />} />
//                 <Route path='/post/:id' element={<Post />} />
//                 <Route path='/login' element={!user ? <Login /> : <Navigate to='/' />} />
//                 <Route path='/forgot-password' element={!user ? <ForgotPassword /> : <Navigate to='/' />} />
//                 <Route path='/register' element={user && userStatus === 'admin' ? <Register /> : <Navigate to='/login' />} />
//                 <Route
//                   path='/dashboard'
//                   element={user && userStatus === 'admin' || userStatus === 'funcionario'? <Dashboard /> : <Navigate to='/login' />}
//                 />
//                 <Route
//                   path='/post/create'
//                   element={user && userStatus === 'admin' || userStatus === 'funcionario'? <CreatePost /> : <Navigate to='/login' />}
//                 />
//                 <Route
//                   path='/post/edit/:id'
//                   element={user && userStatus === 'admin' || userStatus === 'funcionario'? <EditPost /> : <Navigate to='/login' />}
//                 />
//                 {/* pagina não encontrada */}
//                 <Route path='*' element={<NotFound />} />

//               </Routes>
//             </Main>
//             <Footer />
//           </ContainerHidden>
//         </BrowserRouter>
//       </AuthProvider>
//     </>
//   );
// }

// export default App;
