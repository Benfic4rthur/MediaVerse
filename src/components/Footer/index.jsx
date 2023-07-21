import { MdWhatsapp } from 'react-icons/md';
import { LuMail, LuInstagram } from 'react-icons/lu';
import logo from '../../assets/logo.png';
import { UseAuthValue } from '../../context/AuthContext';
import {
  ContainerLink,
  ContainerMaxWidth,
  Footer,
  ImgFooter,
  Invesible,
  LinkImgFooter,
  NavLinkStyled,
  NavLinkWhatsapp,
} from './styled';

const suporte = 'Suporte 24hrs';
const faleConosco = 'Fale Conosco';
const instagram = 'Instagram';
const site = 'www.genuinesistemas.com.br';

const number = '5548991674323'; // Número de telefone do WhatsApp
const messageBomDia = 'Bom dia! Tenho uma dúvida, você poderia me ajudar?'; // Texto pré-pronto para a mensagem de bom dia
const messageBoaTarde = 'Boa tarde! Tenho uma dúvida, você poderia me ajudar?'; // Texto pré-pronto para a mensagem de boa tarde
const messageBoaNoite = 'Boa noite! Tenho uma dúvida, você poderia me ajudar?'; // Texto pré-pronto para a mensagem de boa noite

const index = () => {
  const User = UseAuthValue();
  const now = new Date();
  const currentHour = now.getHours();

  let message = ''; // Inicialize a mensagem vazia

  // Define a mensagem com base na hora do dia
  if (currentHour >= 0 && currentHour < 12) {
    message = messageBomDia;
  } else if (currentHour >= 12 && currentHour < 18) {
    message = messageBoaTarde;
  } else {
    message = messageBoaNoite;
  }

  return (
    <Footer>
      <ContainerMaxWidth $justify={User?.user}>
        <LinkImgFooter href='https://genuinesistemas.com.br/' title={site}>
          <ImgFooter src={logo} />
        </LinkImgFooter>
        {User.user && <div />}
        {User.user && <div />}
        {User.user && (
          <ContainerLink>
            <Invesible>
              <MdWhatsapp />
            </Invesible>
            <NavLinkStyled href='https://www.instagram.com/genuinesistemas/' title={instagram}>
              <LuInstagram />
            </NavLinkStyled>
            <NavLinkStyled
              href='https://genuinesistemas.com.br/#fale-conosco'
              title={faleConosco}
              target='_blank'
            >
              <LuMail />
            </NavLinkStyled>
            <NavLinkWhatsapp
              href={`https://wa.me/${number}?text=${encodeURIComponent(message)}`}
              title={suporte}
              target='_blank'
            >
              <MdWhatsapp />
            </NavLinkWhatsapp>
          </ContainerLink>
        )}
      </ContainerMaxWidth>
    </Footer>
  );
};

export default index;
