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
import { useUserInfo } from './hooks/userName';
import { ContainerSpinerLoading, SpinerLoading } from './styles/styledGlobal';

function App() {
  const [user, setUser] = useState(undefined);
  const { auth } = UseAuthentication();
  const userEmail = user ? user.email : '';
  const { userStatus, userName, deletedAt, userId } = useUserInfo(userEmail);
  const loadingUser = user === undefined;
  const [countdown, setCountdown] = useState(3600); // 3600 segundos
  const notClientTags = 'promotional';
  const applicationTags = [
    // 'Cadastro',
    // 'controle',
    // 'financeiro',
    // 'analise',
    // 'administrativo',
    // 'produto',
    // 'nfce',
    // 'pdv',
    // 'estoque',
    // 'incluir',
    // 'alterar',
    // 'aplicativo',
    // 'painel',
    // 'comanda',
    // 'emissão',
    // 'inutilização',
    // 'caixa',
    // 'promoções',
    // 'tutorial',
    // 'pacote-contabilidade',
    // 'aprendendo-o-sistema',
    'iso',
    'reciclagem',
    'treinamento',
    'ead',
    'webnario',
    'curso',
    notClientTags,
  ];

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
    const intervalId = setInterval(() => {
      setCountdown(prevCountdown => {
        if (prevCountdown % 60 === 0) {
          console.log(`A página será atualizada em ${prevCountdown / 60} minutos...`);
        }
        return prevCountdown - 1;
      });
    }, 1000);

    const timeoutId = setTimeout(() => {
      window.location.reload();
    }, 3600000);

    if (!isVisible) {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    }

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [isVisible]);

  useEffect(() => {
    if (deletedAt !== '' && userId === userEmail) {
      signOut(auth);
    }
    onAuthStateChanged(auth, user => {
      setUser(user);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth, deletedAt]);

  if (loadingUser) {
    return (
      <ContainerSpinerLoading style={{ height: '100vh' }}>
        <SpinerLoading size={45} />
      </ContainerSpinerLoading>
    );
  }

  return (
    <AuthProvider value={{ user, userStatus, userName, userEmail, applicationTags, notClientTags }}>
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
//                 <Route path='/posts/:id' element={<Post />} />
//                 <Route path='/login' element={!user ? <Login /> : <Navigate to='/' />} />
//                 <Route path='/forgot-password' element={!user ? <ForgotPassword /> : <Navigate to='/' />} />
//                 <Route path='/register' element={user && userStatus === 'admin' ? <Register /> : <Navigate to='/login' />} />
//                 <Route
//                   path='/dashboard'
//                   element={user && userStatus === 'admin' || userStatus === 'funcionario'? <Dashboard /> : <Navigate to='/login' />}
//                 />
//                 <Route
//                   path='/create-post'
//                   element={user && userStatus === 'admin' || userStatus === 'funcionario'? <CreatePost /> : <Navigate to='/login' />}
//                 />
//                 <Route
//                   path='/posts/editpost/:id'
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
