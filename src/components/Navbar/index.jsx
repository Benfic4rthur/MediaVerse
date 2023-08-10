/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import logo from '../../assets/logo.png';
import logonav from '../../assets/logonavinterno.png';
import { UseAuthValue } from '../../context/AuthContext';
import { UseAuthentication } from '../../hooks/useAuthentication';

import { getAuth } from 'firebase/auth';
import { LuLogOut } from 'react-icons/lu';
import {
  ButtonMenuExpanded,
  ContainerAdaptiveMenu,
  ContainerMaxWidth,
  ContainerMenu,
  Header,
  Logo,
  Menu,
  Nav,
  NavLinkLogo,
  NavLinkMenuExpanded,
  NavLinkRowMenu,
  NavLinkStyled,
  UserName,
} from './styled.js';

const Index = () => {
  const { user, userData, setReload } = UseAuthValue();

  const { logout } = UseAuthentication();
  const [avatar, setAvatar] = useState('');
  const [expanded, setExpanded] = useState(false);
  const auth = getAuth();
  const toggleMenu = () => {
    setExpanded(!expanded);
  };

  function checkUrl(string) {
    try {
      new URL(string);
      return true;
    } catch (err) {
      return false;
    }
  }

  useEffect(() => {
    // const func = async () => {
    //   if (checkUrl(userData.photoURL)) {
    //     setAvatar(userData.photoURL);
    //   } else {
    //     try {
    //       if (userData.userGender === 'feminino') {
    //         const AvatarURL = await import(
    //           `../../assets/avatares/feminino/${auth.currentUser.photoURL}.jpg`
    //         );
    //         setAvatar(AvatarURL.default);
    //       } else {
    //         const AvatarURL = await import(
    //           `../../assets/avatares/masculino/${auth.currentUser.photoURL}.jpg`
    //         );
    //         setAvatar(AvatarURL.default);
    //       }
    //     } catch (error) {
    //       import(`../../assets/notAvatar.jpg`)
    //         .then(image => setAvatar(image.default))
    //         .catch(error => console.error(error));
    //     }
    //   }
    // };

     const func = async () => {
       if (checkUrl(userData.photoURL)) {
         setAvatar(userData.photoURL);
       } else {
         try {
           if (userData.userGender === 'feminino') {
             const AvatarURL = await import(
               `../../assets/avatares/feminino/${userData.photoURL}.jpg`
             );
             setAvatar(AvatarURL.default);
           } else {
             const AvatarURL = await import(
               `../../assets/avatares/masculino/${userData.photoURL}.jpg`
             );
             setAvatar(AvatarURL.default);
           }
         } catch (error) {
           if (error.code === 'ENOENT') {
             import(`../../assets/notAvatar.jpg`)
               .then(image => setAvatar(image.default))
               .catch(error => console.error(error));
           } else {
             console.error(error);
           }
         }
       }
     };

    func();
  }, [user, auth.currentUser, userData.userGender, userData.photoURL]);

  return (
    <Header>
      <ContainerMaxWidth>
        {user ? (
          <NavLinkLogo
            to='/'
            onClick={() => {
              setReload(e => ++e);
            }}
          >
            <Logo src={logo} alt='logo' />
            {!!user && <UserName>{userData.userName}</UserName>}
          </NavLinkLogo>
        ) : (
          <NavLinkLogo to='/access'>
            <Logo src={logonav} alt='logo' />
            {!!user && <UserName>{' ' + userData.userName}</UserName>}
          </NavLinkLogo>
        )}
        <Nav>
          {user && (
            <>
              <ContainerMenu>
                <>
                  {(userData.userStatus === 'funcionario' || userData.userStatus === 'admin') && (
                    <>
                      <NavLinkRowMenu
                        aria-label='novo post'
                        to='/post/create'
                        className={`${isActive => (isActive ? 'active' : '')} a1`}
                        onClick={() => setExpanded(false)}
                      >
                        Novo Post
                      </NavLinkRowMenu>
                      <NavLinkRowMenu
                        aria-label='painel de cursos'
                        to='/dashboard/'
                        className={`${isActive => (isActive ? 'active' : '')} a2`}
                        onClick={() => setExpanded(false)}
                      >
                        {userData.userStatus === 'admin' ? 'Painel de Cursos' : 'Dashboard'}
                      </NavLinkRowMenu>
                    </>
                  )}
                  {userData.userStatus === 'admin' && (
                    <>
                      <NavLinkRowMenu
                        aria-label='painel de usuarios'
                        to='/dashboard/user'
                        className={`${isActive => (isActive ? 'active' : '')} a3`}
                        onClick={() => setExpanded(false)}
                      >
                        Painel de Usuários
                      </NavLinkRowMenu>
                      <NavLinkRowMenu
                        to='/register'
                        aria-label='pagina de cadastro'
                        className={`${isActive => (isActive ? 'active' : '')} a4`}
                        onClick={() => setExpanded(false)}
                      >
                        Cadastro de Usuário
                      </NavLinkRowMenu>
                    </>
                  )}
                </>
                <ButtonMenuExpanded onClick={toggleMenu}>
                  <img
                    src={avatar}
                    alt=''
                    style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                  />
                </ButtonMenuExpanded>
                <ContainerAdaptiveMenu>
                  <ButtonMenuExpanded className='hidden' onClick={toggleMenu}>
                    <img
                      src={avatar}
                      alt=''
                      style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                    />
                  </ButtonMenuExpanded>
                  <Menu $expanded={expanded}>
                    <NavLinkStyled
                      aria-label='edite seu usuario'
                      title='edite seu usuario'
                      to='/account'
                      className={`${isActive => (isActive ? 'active' : '')}`}
                      onClick={() => setExpanded(false)}
                    >
                      Edite seu Perfil
                    </NavLinkStyled>
                    {(userData.userStatus === 'funcionario' || userData.userStatus === 'admin') && (
                      <>
                        <NavLinkMenuExpanded
                          aria-label='novo post'
                          to='/post/create'
                          className={`${isActive => (isActive ? 'active' : '')} a1`}
                          onClick={() => setExpanded(false)}
                        >
                          Novo Post
                        </NavLinkMenuExpanded>
                        <NavLinkMenuExpanded
                          aria-label='Painel de Cursos'
                        to='/dashboard/'
                          className={`${isActive => (isActive ? 'active' : '')} a2`}
                          onClick={() => setExpanded(false)}
                        >
                          {userData.userStatus === 'admin' ? 'Painel de Cursos' : 'Dashboard'}
                        </NavLinkMenuExpanded>
                      </>
                    )}
                    {userData.userStatus === 'admin' && (
                      <>
                        <NavLinkMenuExpanded
                          aria-label='painel de usuarios'
                          to='/dashboard/user'
                          className={`${isActive => (isActive ? 'active' : '')} a3`}
                          onClick={() => setExpanded(false)}
                        >
                          Painel de Usuários
                        </NavLinkMenuExpanded>
                        <NavLinkMenuExpanded
                          to='/register'
                          aria-label='pagina de cadastro'
                          className={`${isActive => (isActive ? 'active' : '')} a4`}
                          onClick={() => setExpanded(false)}
                        >
                          Cadastro de Usuário
                        </NavLinkMenuExpanded>
                      </>
                    )}
                    <NavLinkStyled
                      title='Sair'
                      to='/access'
                      aria-label='logout'
                      onClick={() => {
                        logout(userData.userId);
                        setExpanded(false);
                      }}
                      className='active'
                    >
                      {expanded && <span>Sair</span>}
                      <LuLogOut size={18} />
                    </NavLinkStyled>
                  </Menu>
                </ContainerAdaptiveMenu>
              </ContainerMenu>
            </>
          )}
        </Nav>
      </ContainerMaxWidth>
    </Header>
  );
};

export default Index;
