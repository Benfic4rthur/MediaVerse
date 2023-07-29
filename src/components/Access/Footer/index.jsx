import { Footer as FooterSyled, Social } from './styled';
import { BsWhatsapp, BsInstagram } from 'react-icons/bs';
import { Link } from 'react-router-dom';

import logo from '../../../assets/logo.png';

const faleConosco = 'Fale Conosco';
const instagram = 'Instagram';

const number = '5551991640517';
const messageBomDia =
  'Bom dia! Gostaria de me informar um pouco mais sobre a plataforma de videos sob demanda!';
const messageBoaTarde =
  'Boa tarde! Gostaria de me informar um pouco mais sobre a plataforma de videos sob demanda!';
const messageBoaNoite =
  'Boa noite! Gostaria de me informar um pouco mais sobre a plataforma de videos sob demanda!';
const now = new Date();
const year = now.getFullYear();
const currentHour = now.getHours();

let message = '';

if (currentHour >= 0 && currentHour < 12) {
  message = messageBomDia;
} else if (currentHour >= 12 && currentHour < 18) {
  message = messageBoaTarde;
} else {
  message = messageBoaNoite;
}
export function Footer() {
  return (
    <>
      <FooterSyled>
        <div>
          <img src={logo} alt='' />
        </div>

        <div className='spaceText'>
          <Link
            to='https://ekorsolutions.vercel.app'
            title='Ekor Solutions'
            target='_blank'
            style={{
              textDecoration: 'none',
              color: '#fff',
            }}
          >
            Ekor Solutions &copy;{" "}
          </Link>
          - Todos os direitos reservados, {year}
        </div>

        <Social>
          <Link
            to={`https://wa.me/${number}?text=${encodeURIComponent(message)}`}
            title={faleConosco}
            id='whatsapp'
            target=' _blank'
            className='link'
          >
            <BsWhatsapp />
          </Link>
          <Link
            to='https://www.instagram.com/ekor.solutions/'
            title={instagram}
            target='_blank'
            className='link'
          >
            <BsInstagram />
          </Link>
        </Social>
      </FooterSyled>
    </>
  );
}
