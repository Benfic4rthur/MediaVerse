/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { LuLogOut, LuMenu, LuX } from 'react-icons/lu';
import logo from '../../assets/logo.png';
import { UseAuthValue } from '../../context/AuthContext';
import { UseAuthentication } from '../../hooks/useAuthentication';
import {
  ContainerAdaptiveMenu,
  ContainerMaxWidth,
  Header,
  Logo,
  MobileMenuToggle,
  Nav,
  NavLinkLogo,
  NavLinkStyled,
  UserName,
} from './styled.js';
import { getAuth } from 'firebase/auth';

const Index = () => {
  const { user, userName, userStatus, userEmail } = UseAuthValue();
  const { logout } = UseAuthentication();
  const [expanded, setExpanded] = useState(false);
  const auth = getAuth()
  const toggleMenu = () => {
    setExpanded(!expanded);
  };

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
              <MobileMenuToggle onClick={toggleMenu}>
                {expanded ? <LuX /> : <LuMenu />}
              </MobileMenuToggle>
              <ContainerAdaptiveMenu $expanded={expanded}>
                {/* <NavLinkStyled
                  aria-label='home'
                  className={isActive => (isActive ? 'active' : '')}
                  to='/'
                >
                  Home
                </NavLinkStyled> */}
                {/* <NavLinkStyled
                  aria-label='Catálogo de postagens'
                  className={isActive => (isActive ? 'active' : '')}
                  to='/catalog'
                >
                  Catalog
                </NavLinkStyled> */}

                <NavLinkStyled
                  aria-label='Edição de Usuário'
                  to='/account'
                  className={isActive => (isActive ? 'active' : '')}
                  onClick={() => setExpanded(false)}
                >
                  Edite seu Perfil
                </NavLinkStyled>

                {userStatus === 'funcionario' ||
                  (userStatus === 'admin' && (
                    <>
                      <NavLinkStyled
                        aria-label='novo post'
                        to='/create-post'
                        className={isActive => (isActive ? 'active' : '')}
                        onClick={() => setExpanded(false)}
                      >
                        Novo Post
                      </NavLinkStyled>
                      <NavLinkStyled
                        aria-label='painel de postagens'
                        to='/dashboard'
                        className={isActive => (isActive ? 'active' : '')}
                        onClick={() => setExpanded(false)}
                      >
                        {userStatus === 'admin' ? 'Painel de Postagens' : 'Dashboard'}
                      </NavLinkStyled>
                    </>
                  ))}

                {userStatus === 'admin' && (
                  <>
                    <NavLinkStyled
                      aria-label='painel de usuarios'
                      to='/userspanel'
                      className={isActive => (isActive ? 'active' : '')}
                      onClick={() => setExpanded(false)}
                    >
                      Painel de Usuários
                    </NavLinkStyled>
                    <NavLinkStyled
                      to='/register'
                      aria-label='pagina de cadastro'
                      className={isActive => (isActive ? 'active' : '')}
                      onClick={() => setExpanded(false)}
                    >
                      Cadastro de Usuário
                    </NavLinkStyled>
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
              </ContainerAdaptiveMenu>
            </>
          )}
        </Nav>
      </ContainerMaxWidth>
    </Header>
  );
};

export default Index;
