import { useEffect } from 'react';
import Contact from '../../components/Contact';
import FooterAccess from '../../components/FooterAccess';

import { AccessCard } from '../../components/AccessCard';
import { Image } from '../../components/AccessCard/styled';

import NavAccess from '../../components/NavAccess';
import TargetSectors from '../../components/TargetSectors';
import { Container, ContainerAccessCard, Nav } from './styled';

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
        <ContainerAccessCard>
          <AccessCard title={'lorem lorem lorem '} description={'texto '} classname='left'>
            <Image src='' alt='' />
          </AccessCard>
          <AccessCard reverse title={'lorem lorem lorem '} description={'texto '} classname='right'>
            <Image src='' alt='' />
          </AccessCard>
          <AccessCard title={'lorem lorem lorem '} description={'texto'} classname='left'>
            <Image src='' alt='' />
          </AccessCard>
          <AccessCard reverse title={'lorem lorem lorem '} description={'texto '} classname='right'>
            <Image src='' alt='' />
          </AccessCard>
        </ContainerAccessCard>
        <h1 id='TargetSectors'>Setores Alvos</h1>
        <TargetSectors />
        <h1 id='Contact'>Contato</h1>
        <Contact />
      </Container>
      <FooterAccess />
    </>
  );
}
