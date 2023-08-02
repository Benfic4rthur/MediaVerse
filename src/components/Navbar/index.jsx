/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import logo from '../../assets/logo.png';
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
  const { user, userName, userStatus, userEmail, userGender, photoURL } = UseAuthValue();
  const { logout } = UseAuthentication();
  const [avatar, setAvatar] = useState('');
  const [expanded, setExpanded] = useState(false);
  const auth = getAuth();
  const toggleMenu = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    if (photoURL) {
      if (userGender === 'feminino') {
        import(`../../assets/avatares/feminino/${auth.currentUser?.photoURL}.jpg`)
          .then(image => setAvatar(image.default))
          .catch(error => console.error(error));
      } else {
        import(`../../assets/avatares/masculino/${auth.currentUser?.photoURL}.jpg`)
          .then(image => setAvatar(image.default))
          .catch(error => console.error(error));
      }
    }
  }, [user, auth.currentUser, userGender, photoURL]);

  const atualizarTelaManualmente = () => {
    this.forceUpdate();
  };

  return (
    <Header>
      <ContainerMaxWidth>
        {user ? (
          <NavLinkLogo to='/' onClick={atualizarTelaManualmente}>
            <Logo src={logo} alt='logo' />
            {!!user && <UserName>{'@' + userName}</UserName>}
          </NavLinkLogo>
        ) : (
          <NavLinkLogo to='/access'>
            <Logo src={logo} alt='logo' />
            {!!user && <UserName>{'@' + userName}</UserName>}
          </NavLinkLogo>
        )}
        <Nav>
          {user && (
            <>
              <ContainerMenu>
                <>
                  {(userStatus === 'funcionario' || userStatus === 'admin') && (
                    <>
                      <NavLinkRowMenu
                        aria-label='novo post'
                        to='/create-post'
                        className={`${isActive => (isActive ? 'active' : '')} a1`}
                        onClick={() => setExpanded(false)}
                      >
                        Novo Post
                      </NavLinkRowMenu>
                      <NavLinkRowMenu
                        aria-label='painel de postagens'
                        to='/dashboard'
                        className={`${isActive => (isActive ? 'active' : '')} a2`}
                        onClick={() => setExpanded(false)}
                      >
                        {userStatus === 'admin' ? 'Painel de Postagens' : 'Dashboard'}
                      </NavLinkRowMenu>
                    </>
                  )}
                  {userStatus === 'admin' && (
                    <>
                      <NavLinkRowMenu
                        aria-label='painel de usuarios'
                        to='/userspanel'
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
                    style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                  />
                </ButtonMenuExpanded>

                <ContainerAdaptiveMenu>
                  <ButtonMenuExpanded className='hidden' onClick={toggleMenu}>
                    <img
                      src={avatar}
                      alt=''
                      style={{ width: '50px', height: '50px', borderRadius: '50%' }}
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
                      Edit User
                    </NavLinkStyled>
                    {(userStatus === 'funcionario' || userStatus === 'admin') && (
                      <>
                        <NavLinkMenuExpanded
                          aria-label='novo post'
                          to='/create-post'
                          className={`${isActive => (isActive ? 'active' : '')} a1`}
                          onClick={() => setExpanded(false)}
                        >
                          Novo Post
                        </NavLinkMenuExpanded>
                        <NavLinkMenuExpanded
                          aria-label='painel de postagens'
                          to='/dashboard'
                          className={`${isActive => (isActive ? 'active' : '')} a2`}
                          onClick={() => setExpanded(false)}
                        >
                          {userStatus === 'admin' ? 'Painel de Postagens' : 'Dashboard'}
                        </NavLinkMenuExpanded>
                      </>
                    )}
                    {userStatus === 'admin' && (
                      <>
                        <NavLinkMenuExpanded
                          aria-label='painel de usuarios'
                          to='/userspanel'
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
                        logout(userEmail);
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
