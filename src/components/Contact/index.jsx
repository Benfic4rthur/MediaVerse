import { Link } from 'react-router-dom';
import { Container, Content, Text } from './styled';
import { MdEmail, MdWhatsapp } from 'react-icons/md';
import { useState } from 'react';
import { useEffect } from 'react';

const number = '5551991640517';
const messageBomDia = 'Bom dia! Gostaria de fazer um orçamento em um projeto!';
const messageBoaTarde = 'Boa tarde! Gostaria de fazer um orçamento em um projeto!';
const messageBoaNoite = 'Boa noite! Gostaria de fazer um orçamento em um projeto!';
const now = new Date();
const currentHour = now.getHours();

export default function Contact() {
  const [titulo, setTitulo] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const contactsElement = document.querySelector('.contacts');
      if (contactsElement) {
        const contactsPosition = contactsElement.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (contactsPosition.top < windowHeight) {
          setShowAnimation(true);
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
      <Container>
        <Text>
          <h2>Transforme sua ideia em realidade!</h2>
          <div>
            Transforme suas ideias em aplicativos personalizados de sucesso! Contate-nos hoje mesmo
            e tenha uma equipe dedicada ao seu projeto.
          </div>
        </Text>
        <Content>
          <div className='button'>
            <MdEmail />
            <Link
              to='mailto:ekor.solutions@gmail.com'
              title={'fale Conosco pelo e-mail'}
              target=' _blank'
              className='link'
            >
              Contate-nos por e-mail
            </Link>
          </div>
          <div className='button'>
            <MdWhatsapp />
            <Link
              to={`https://wa.me/${number}?text=${encodeURIComponent(message)}`}
              title={'fale Conosco pelo Whatsapp'}
              target=' _blank'
              className='link'
            >
              Chame pelo whatsapp
            </Link>
          </div>
        </Content>
      </Container>
    </>
  );
}
