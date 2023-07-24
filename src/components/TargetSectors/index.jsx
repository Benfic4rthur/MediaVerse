import corporative from '../../assets/corporative.jpg';
import ead from '../../assets/ead.jpeg';
import ondemand from '../../assets/ondemand.jpg';
import reciclagem from '../../assets/reciclagem.jpg';
import webnar from '../../assets/webnar.jpg';
import { Container, ContainerImage, ContainerSectors, Sectors } from './styled';

export default function TargetSectors() {
  return (
    <>
      <Container>
        <ContainerSectors>
          <Sectors className='up'>
            <ContainerImage>
              <img src={ead} alt='' />
            </ContainerImage>
            <p>Perfeito para cursos e faculdades EAD.</p>
          </Sectors>
          <Sectors className='down'>
            <ContainerImage>
              <img src={corporative} alt='' />
            </ContainerImage>
            <p>Eficaz para treinamentos empresariais com equipes globalmente distribuidas.</p>
          </Sectors>
          <Sectors className='up'>
            <ContainerImage>
              <img src={ondemand} alt='' />
            </ContainerImage>
            <p>Funcionalidades incriveis para a disponibilização de videos sob demanda.</p>
          </Sectors>
          <Sectors className='down'>
            <ContainerImage>
              <img src={reciclagem} alt='' />
            </ContainerImage>
            <p>Reciclagem corporativa de forma pratica e rapida, com teste de qualidade.</p>
          </Sectors>
          <Sectors className='up'>
            <ContainerImage>
              <img src={webnar} alt='' />
            </ContainerImage>
          <p>
            Webnários agendados com antecedencia e disponibilidade de aviso para os participantes.
          </p>
          </Sectors>
        </ContainerSectors>
      </Container>
    </>
  );
}
