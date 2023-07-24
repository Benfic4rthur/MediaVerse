import { Link } from 'react-router-dom';
import { Link as LinkScroll } from 'react-scroll';
import { Navbar } from './styled';

import logo from '../../assets/logo-ekor.png';
import { useState } from 'react';
import { useEffect } from 'react';

export default function NavAccess() {
  const [title, setTitle] = useState('- Início');

  useEffect(() => {
    document.title = `MediaVerse - ${title}`;
  }, [title]);

  return (
    <>
      <Navbar>
        <div>
          <LinkScroll
            to='init'
            spy={true}
            smooth={true}
            offset={-70}
            duration={750}
            title='Início'
            className='link'
            style={{ cursor: 'pointer' }}
          >
            <img src={logo} alt='Logo' title='MediaVerse' onClick={() => setTitle('- Início')} />
          </LinkScroll>
        </div>
        <div>
          <LinkScroll
            to='Functionality'
            spy={true}
            smooth={true}
            offset={-70}
            duration={750}
            title='Início'
            onClick={() => setTitle('- Início')}
            className='link'
            style={{ cursor: 'pointer' }}
          >
            <h2>Inicio</h2>
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
            title='Setores Alvos'
            onClick={() => setTitle('- Setores Alvos')}
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
        </div>
      </Navbar>
    </>
  );
}
