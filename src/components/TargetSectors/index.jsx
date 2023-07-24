import ead from '../../assets/ead.jpeg';
import corporative from '../../assets/corporative.jpg';
import ondemand from '../../assets/ondemand.jpg';
import reciclagem from '../../assets/reciclagem.jpg';
import webnar from '../../assets/webnar.jpg';
import { Container, ContainerSectors, Sectors } from './styled';

export default function TargetSectors() {
  return (
    <>
      <Container>
        <ContainerSectors style={{ marginBottom: '1rem' }}>
          <Sectors>
            <img src={ead} alt='' />
          </Sectors>
          <div>Perfeito para cursos e faculdades EAD.</div>
        </ContainerSectors>
        <ContainerSectors>
          <Sectors>
            <img src={corporative} alt='' />
          </Sectors>
          <div>Eficaz para treinamentos empresariais com equipes globalmente distribuidas.</div>
        </ContainerSectors>
        <ContainerSectors>
          <Sectors>
            <img src={ondemand} alt='' />
          </Sectors>
          <div>Funcionalidades incriveis para a disponibilização de videos sob demanda.</div>
        </ContainerSectors>
        <ContainerSectors>
          <Sectors>
            <img src={reciclagem} alt='' />
          </Sectors>
          <div>Reciclagem corporativa de forma pratica e rapida, com teste de qualidade.</div>
        </ContainerSectors>
        <ContainerSectors>
          <Sectors>
            <img src={webnar} alt='' />
          </Sectors>
          <div>
            Webnários agendados com antecedencia e disponibilidade de aviso para os participantes.
          </div>
        </ContainerSectors>
      </Container>
    </>
  );
}
