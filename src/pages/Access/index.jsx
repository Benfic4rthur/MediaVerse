import { useEffect } from 'react';
import Contact from '../../components/Contact';
import FooterAccess from '../../components/FooterAccess';
import Functionality from '../../components/Functionality';

import NavAccess from '../../components/NavAccess';
import TargetSectors from '../../components/TargetSectors';
import { Container, Nav, Section } from './styled';

export default function Access() {
  useEffect(() => {
    document.title = 'MediaVerse - Acesso';
  }, []);

  return (
    <>
      <Container>
        <Nav>
          <NavAccess />
        </Nav>
        <br />
        <h1 id='Functionality'>Funcionalidades</h1>
        <Section>
          <Functionality />
          <Functionality reverse />
          <Functionality />
          <Functionality reverse />
        </Section>
        <h1 id='TargetSectors'>Setores Alvos</h1>
        <TargetSectors />
        <h1 id='Contact'>Contatos</h1>
        <Contact />
      </Container>
      <FooterAccess />
    </>
  );
}
