import { ButtonLink, Container, Content, Description, Text, Title } from './styled';
import { MdEmail, MdWhatsapp } from 'react-icons/md';
import { useState, useEffect } from 'react';
import { H2 } from '../../../pages/Access/styled';

const number = '5551991640517';
const messageBomDia =
  'Bom dia! Gostaria de me informar um pouco mais sobre a plataforma de videos sob demanda!';
const messageBoaTarde =
  'Boa tarde! Gostaria de me informar um pouco mais sobre a plataforma de videos sob demanda!';
const messageBoaNoite =
  'Boa noite! Gostaria de me informar um pouco mais sobre a plataforma de videos sob demanda!';
const now = new Date();
const currentHour = now.getHours();

export function Contact() {
  const [titulo, setTitulo] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const contactsElement = document.querySelector('.contacts');
      if (contactsElement) {
        const contactsPosition = contactsElement.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (contactsPosition.top < windowHeight) {
          // setShowAnimation(true);
          setTitulo('- Contato');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    document.title = `Ekor Solutions ${titulo}`;
  }, [titulo]);

  let message = '';
  if (currentHour >= 0 && currentHour < 12) {
    message = messageBomDia;
  } else if (currentHour >= 12 && currentHour < 18) {
    message = messageBoaTarde;
  } else {
    message = messageBoaNoite;
  }

  return (
    <>
      <H2 id='Contact'>Contato</H2>
      <Container>
        <Text>
          <Title>Aumente a produtividade dos seus treinamentos!</Title>
          <Description>
            Potencialize a produtividade dos seus treinamentos com a ajuda de nossa ferramenta
            moderna e de simples utilização, voltada para diversos setores, desde faculdades e
            cursos EAD até treinamentos de reciclagem de ISO.
          </Description>
        </Text>
        <Content>
          <ButtonLink
            to='mailto:ekor.solutions@gmail.com'
            title={'fale Conosco pelo e-mail'}
            target=' _blank'
            className='link'
          >
            <MdEmail />
            Contate-nos por e-mail
          </ButtonLink>
          <ButtonLink
            to={`https://wa.me/${number}?text=${encodeURIComponent(message)}`}
            title={'fale Conosco pelo Whatsapp'}
            target=' _blank'
            className='link'
          >
            <MdWhatsapp />
            Chame pelo whatsapp
          </ButtonLink>
        </Content>
      </Container>
    </>
  );
}
