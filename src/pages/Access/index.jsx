import { useEffect } from 'react';
import Contact from '../../components/Access/Contact';
import FooterAccess from '../../components/Access/Footer';

import { Functionality } from '../../components/Access/Functionality';
import { Header } from '../../components/Access/Header';
import TargetSectors from '../../components/Access/TargetSectors';
import { Container } from './styled';

export default function Access() {
  useEffect(() => {
    document.title = 'MediaVerse - Acesso';
  }, []);

  return (
    <>
      <Container>
        <Header />
        <br />
        <Functionality />
        <TargetSectors />
        <Contact />
      </Container>
      <FooterAccess />
    </>
  );
}

{
  /* <<<<<<< Updated upstream
        <h1 id='Functionality'>Funcionalidades</h1>
        <ContainerAccessCard>
          <AccessCard
            title={'Controle completo do usuário'}
            description={
              'Tenha total controle e acesso aos conteúdos que foram acessados pelos usuários. Faça novos cadastros, alterações, exclusões e banimentos dos usuários.'
            }
            classname='left'
          >
            <Image src='' alt='' />
          </AccessCard>
          <AccessCard
            reverse
            title={'Controle e redirecionamento de conteúdo'}
            description={
              'Adicione novos conteúdos, redirecione ele ao publico certo, tenha controle total sobre edição e exclusão do contéudo. Libere conteúdo promocional para não alunos. '
            }
            classname='right'
          >
            <Image src='' alt='' />
          </AccessCard>
          {/* <AccessCard
            title={'Webnário'}
            description={
              'Agende webnarios com antecência, avise os participantes e faça o envio do link e disponibilização do login e senha para utilização momentanea.'
            }
            classname='left'
          >
            <Image src='' alt='' />
          </AccessCard>
          <AccessCard
            // reverse
            title={'Cursos sob demanda'}
            description={
              'Possibilidade de disponibilizar o conteúdo da sua faculdade, curso técnico, treinamento empresárial, reciclagem corporativa, etc. Com a possibilidade de testar o conhecimento adquirido pelo aluno.'
            }
            classname='right'
          >
            <Image src='' alt='' />
          </AccessCard>
        </ContainerAccessCard>
        <h1 id='TargetSectors'>Setores Alvos</h1>
======= */
}
