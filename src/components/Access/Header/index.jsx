/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Link } from 'react-router-dom';
import { Link as LinkScroll } from 'react-scroll';
import { Header as HeaderStyled, Navbar } from './styled';

import { useEffect, useState } from 'react';
import { LuMenu, LuX } from 'react-icons/lu';
import logo from '../../../assets/logo.png';
import { ContainerAdaptiveMenu, MobileMenuToggle, Nav } from '../../Navbar/styled';

export function Header() {
  const [title, setTitle] = useState('- Início');
  const [expanded, setExpanded] = useState(false);
  const toggleMenu = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    document.title = `MediaVerse ${title}`;
  }, [title]);

  return (
    <HeaderStyled>
      <Navbar>
        <div>
          <LinkScroll
            to='init'
            spy={true}
            smooth={true}
            offset={-80}
            duration={750}
            title='Início'
            className='link'
            style={{ cursor: 'pointer' }}
          >
            <img src={logo} alt='Logo' title='MediaVerse' onClick={() => setTitle('- Início')} />
          </LinkScroll>
        </div>

        <Nav>
          <MobileMenuToggle onClick={toggleMenu}>
            {expanded ? <LuX /> : <LuMenu />}
          </MobileMenuToggle>
          <ContainerAdaptiveMenu $expanded={expanded}>
            <LinkScroll
              to='Functionality'
              spy={true}
              smooth={true}
              offset={-80}
              duration={750}
              title='Início'
              onClick={() => setTitle('- Início')}
              className='link'
              style={{ cursor: 'pointer' }}
            >
              <h2>Início</h2>
            </LinkScroll>
            <LinkScroll
              to='Functionality'
              spy={true}
              smooth={true}
              offset={-80}
              duration={600}
              title='Funcionalidades'
              onClick={() => setTitle('- Funcionalidades')}
              className='link'
              style={{ cursor: 'pointer' }}
            >
              <h2>Funcionalidades</h2>
            </LinkScroll>
            <LinkScroll
              to='TargetSectors'
              spy={true}
              smooth={true}
              offset={-50}
              duration={1000}
              title='Setores Alvo'
              onClick={() => setTitle('- Setores Alvo')}
              className='link'
              style={{ cursor: 'pointer' }}
            >
              <h2>Setores Alvo</h2>
            </LinkScroll>
            <LinkScroll
              to='Contact'
              spy={true}
              smooth={true}
              offset={-50}
              duration={1000}
              title='Contatos'
              onClick={() => setTitle('- Contatos')}
              className='link'
              style={{ cursor: 'pointer' }}
            >
              <h2>Contatos</h2>
            </LinkScroll>
            <Link to='/login' className='link'>
              <h2>Login</h2>
            </Link>
          </ContainerAdaptiveMenu>
        </Nav>
      </Navbar>
    </HeaderStyled>
  );
}
