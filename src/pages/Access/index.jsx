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
        {/* <Section>
          <Functionality />
          <Functionality reverse />
          <Functionality />
          <Functionality reverse />
        </Section> */}
        <ContainerAccessCard>
          <AccessCard
            title={'lorem lorem lorem '}
            description={
              'dsuabfyds ahsf gsd fshd uf ds fud sufasbhbfuabsf afybuh fusd fuhs dfhu sdu su dfuhs dfuhs f shudf ushd fuhsdfbsdhf ushdf sdhf sudf sdh fusdb fds fuhds fjsd fuhsd jdsf sdijfsduinfsd dsinfsdinf dnfisdnfijsd '
            }
          >
            <Image src='' alt='' />
          </AccessCard>
          <AccessCard
            reverse
            title={'lorem lorem lorem '}
            description={
              'dsuabfyds ahsf gsd fshd uf ds fud sufasbhbfuabsf afybuh fusd fuhs dfhu sdu su dfuhs dfuhs f shudf ushd fuhsdfbsdhf ushdf sdhf sudf sdh fusdb fds fuhds fjsd fuhsd jdsf sdijfsduinfsd dsinfsdinf dnfisdnfijsd '
            }
          >
            <Image src='' alt='' />
          </AccessCard>
        </ContainerAccessCard>
        <h1 id='TargetSectors'>Setores Alvos</h1>
        <TargetSectors />
        <h1 id='Contact'>Contato</h1>
        <Contact />
      </Container>
      <FooterAccess />

      {/* <ContainerBackground>
      <FooterAccess>
        <img src={logoFooter} alt='logo' />
        <LinkFooter
          to='https://ekorsolutions.vercel.app/'
          target='_blank'
          rel='noopener noreferrer'
        >
          EkorSolutions &copy;
        </LinkFooter>
        , Todos os direitos reservados {year}
      </FooterAccess>
    </ContainerBackground> */}
    </>
  );
}
