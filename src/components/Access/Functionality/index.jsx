import { H2 } from '../../../pages/Access/styled';
import { CardFunctionality } from '../CardFunctionality';
import { Video } from '../CardFunctionality/styled';
import { ContainerCardFunctionality } from './styled';
import cursos from '../../../assets/cursos.mp4';
import usuarios from '../../../assets/usuarios.mp4';
import conteudo from '../../../assets/conteudo.mp4';

export function Functionality() {
  return (
    <>
      <H2 id='Functionality'>Funcionalidades</H2>
      <ContainerCardFunctionality>
        <CardFunctionality
          title={'Controle completo do usuário'}
          description={
            'Tenha total controle e acesso aos conteúdos que foram acessados pelos usuários. Faça novos cadastros, alterações, exclusões e banimentos dos usuários.'
          }
          typeAnimated='left'
        >
          <Video src={usuarios} autoPlay loop muted alt='usuários' />
        </CardFunctionality>
        <CardFunctionality
          reverse
          title={'Controle e redirecionamento de conteúdo'}
          description={
            'Adicione novos conteúdos, redirecione ele ao publico certo, tenha controle total sobre edição e exclusão do contéudo. Libere conteúdo promocional para não alunos.'
          }
          typeAnimated='right'
        >
          <Video src={conteudo} autoPlay loop muted alt='conteudo' />
        </CardFunctionality>

        <CardFunctionality
          title={'Cursos sob demanda'}
          description={
            'Possibilidade de disponibilizar o conteúdo da sua faculdade, curso técnico, treinamento empresárial, reciclagem corporativa, etc. Com a possibilidade de testar o conhecimento adquirido pelo aluno.'
          }
          typeAnimated='left'
        >
          <Video src={cursos} autoPlay loop muted alt='cursos' />
        </CardFunctionality>
        {/* <CardFunctionality
          reverse
          title={'Webnário'}
          description={
            'Agende webnarios com antecência, avise os participantes e faça o envio do link e disponibilização do login e senha para utilização momentanea.'
          }
          typeAnimated='right'
        >
          <Image src='' alt='' />
        </CardFunctionality> */}
      </ContainerCardFunctionality>
    </>
  );
}
