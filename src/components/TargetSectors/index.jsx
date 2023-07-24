import ead from '../../assets/ead.jpeg';
import corporative from '../../assets/corporative.jpg';
import ondemand from '../../assets/ondemand.jpg';
import reciclagem from '../../assets/reciclagem.jpg';
import webnar from '../../assets/webnar.jpg';
import { Container, Sectors } from './styled';

export default function TargetSectors() {
  return (
    <>
      <Container>
        <Sectors className='up'>
          <div>
            <img src={ead} alt='' />
          </div>
          <div>Perfeito para cursos e faculdades EAD.</div>
        </Sectors>
        <Sectors className='down'>
          <div>
            <img src={corporative} alt='' />
          </div>
          <div>
            Eficaz para treinamentos empresariais com equipes globalmente distribuidas.
          </div>
        </Sectors>
        <Sectors className='up'>
          <div>
            <img src={ondemand} alt='' />
          </div>
          <div>
            Funcionalidades incriveis para a disponibilização de videos sob demanda.
          </div>
        </Sectors>
        <Sectors className='down'>
          <div>
            <img src={reciclagem} alt='' />
          </div>
          <div>
            Reciclagem corporativa de forma pratica e rapida, com teste de qualidade.
          </div>
        </Sectors>
        <Sectors className='up'>
          <div>
            <img src={webnar} alt='' />
          </div>
          <div>
            Webnários agendados com antecedencia e disponibilidade de aviso para os participantes.
          </div>
        </Sectors>
      </Container>
    </>
  );
}
