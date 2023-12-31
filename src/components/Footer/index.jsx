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
const instagram = 'Instagram';

const number = '5551991640517'; // Número de telefone do WhatsApp
const messageBomDia = 'Bom dia! Tenho uma dúvida, você poderia me ajudar?'; // Texto pré-pronto para a mensagem de bom dia
const messageBoaTarde = 'Boa tarde! Tenho uma dúvida, você poderia me ajudar?'; // Texto pré-pronto para a mensagem de boa tarde
const messageBoaNoite = 'Boa noite! Tenho uma dúvida, você poderia me ajudar?'; // Texto pré-pronto para a mensagem de boa noite

const index = () => {
  const { user } = UseAuthValue();
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
      <ContainerMaxWidth $justify={user}>
        <LinkImgFooter>
          <ImgFooter src={logo} />
        </LinkImgFooter>
        {user && <div />}
        {user && <div />}
        {user && (
          <ContainerLink>
            <Invesible>
              <MdWhatsapp />
            </Invesible>
            <NavLinkStyled
              href='https://www.instagram.com/ekor.solutions/'
              title={instagram}
              target=' _blank'
            >
              <LuInstagram />
            </NavLinkStyled>
            <NavLinkStyled
              href='mailto:ekor.solutions@gmail.com'
              title={'fale Conosco pelo e-mail'}
              target=' _blank'
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
