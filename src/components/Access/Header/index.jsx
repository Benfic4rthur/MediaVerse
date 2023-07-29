/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Link } from 'react-router-dom';
// import { Link  } from 'react-scroll';
import { Header as HeaderStyled, LinkScroll, LogoLinkScroll, Navbar } from './styled';

import { useEffect, useState } from 'react';
import { LuMenu, LuX } from 'react-icons/lu';
import logo from '../../../assets/logo.png';
import { ContainerAdaptiveMenu, MobileMenuToggle, Nav } from './styled';

export function Header() {
  const [title, setTitle] = useState('- Início');
  const [expanded, setExpanded] = useState(false);
  const toggleMenu = () => setExpanded(!expanded);

  useEffect(() => {
    document.title = `MediaVerse ${title}`;
  }, [title]);

  return (
    <HeaderStyled>
      <Navbar>
        <div>
          <LogoLinkScroll
            to='init'
            className='logo'
            spy={true}
            smooth={true}
            offset={-80}
            duration={750}
            tabIndex='0'
            title='Início'
          >
            <img
              src={logo}
              alt='Logo'
              title='MediaVerse'
              onClick={() => setTitle('- Início')}
              style={{ paddingTop: '5px' }}
            />
          </LogoLinkScroll>
        </div>

        <Nav>
          <MobileMenuToggle onClick={toggleMenu}>
            {expanded ? <LuX /> : <LuMenu />}
          </MobileMenuToggle>
          <ContainerAdaptiveMenu $expanded={expanded}>
            <LinkScroll
              to='init'
              spy={true}
              smooth={true}
              offset={-80}
              duration={750}
              tabIndex='0'
              title='Início'
              onClick={() => setTitle('- Início')}
            >
              Início
            </LinkScroll>
            <LinkScroll
              to='Functionality'
              spy={true}
              smooth={true}
              offset={-80}
              duration={600}
              tabIndex='0'
              title='Funcionalidades'
              onClick={() => setTitle('- Funcionalidades')}
            >
              Funcionalidades
            </LinkScroll>
            <LinkScroll
              to='TargetSectors'
              spy={true}
              smooth={true}
              offset={-50}
              duration={1000}
              tabIndex='0'
              title='Setores Alvo'
              onClick={() => setTitle('- Setores Alvo')}
            >
              Setores Alvo
            </LinkScroll>
            <LinkScroll
              to='Contact'
              spy={true}
              smooth={true}
              offset={-50}
              duration={1000}
              tabIndex='0'
              title='Contatos'
              onClick={() => setTitle('- Contatos')}
            >
              Contatos
            </LinkScroll>
            <LinkScroll as={Link} to='/login'>
              Login
            </LinkScroll>
          </ContainerAdaptiveMenu>
        </Nav>
      </Navbar>
    </HeaderStyled>
  );
}
