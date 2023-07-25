import { H2 } from "../../../pages/Access/styled";
import { CardFunctionality } from "../CardFunctionality";
import { Image } from "../CardFunctionality/styled";
import { ContainerCardFunctionality } from "./styled";

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
          <Image src='' alt='' />
        </CardFunctionality>
        <CardFunctionality
          reverse
          title={'Controle e redirecionamento de conteúdo'}
          description={
            'Agende webnarios com antecência, avise os participantes e faça o envio do link e disponibilização do login e senha para utilização momentanea.'
          }
          typeAnimated='right'
        >
          <Image src='' alt='' />
        </CardFunctionality>
        {/* <CardFunctionality
          title={'Webnário'}
          description={
            'Agende webnarios com antecência, avise os participantes e faça o envio do link e disponibilização do login e senha para utilização momentanea.'
          }
          typeAnimated='left'
        >
          <Image src='' alt='' />
        </CardFunctionality> */}
        <CardFunctionality
          // reverse
          title={'Cursos sob demanda'}
          description={
            'Possibilidade de disponibilizar o conteúdo da sua faculdade, curso técnico, treinamento empresárial, reciclagem corporativa, etc. Com a possibilidade de testar o conhecimento adquirido pelo aluno.'
          }
          typeAnimated='right'
        >
          <Image src='' alt='' />
        </CardFunctionality>
      </ContainerCardFunctionality>
    </>
  );
}

