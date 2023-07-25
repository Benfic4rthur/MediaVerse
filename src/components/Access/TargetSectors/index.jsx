import corporative from '../../../assets/corporative.png';
import ead from '../../../assets/ead.png';
import ondemand from '../../../assets/ondemand.png';
import reciclagem from '../../../assets/reciclagem.png';
import webnar from '../../../assets/webnar.png';
import { H2 } from '../../../pages/Access/styled';
import { CardTargetSectors } from '../CardTargetSectors';
import { Container, ContainerSectors } from './styled';

export default function TargetSectors() {
  return (
    <>
      <H2 id='TargetSectors'>Setores Alvo</H2>

      <Container>
        <ContainerSectors>
          <CardTargetSectors
            src={ead}
            alt={'ead img'}
            description={
              'Eficaz para treinamentos empresariais com equipes globalmente distribuidas.'
            }
            typeAnimated={'up'}
          />

          <CardTargetSectors
            src={corporative}
            alt={'corporative img'}
            description={
              'Webnários agendados com antecedencia e disponibilidade de aviso para os participantes.'
            }
            typeAnimated={'down'}
          />
          <CardTargetSectors
            src={ondemand}
            alt={'ondemand img'}
            description={
              'Webnários agendados com antecedencia e disponibilidade de aviso para os participantes.'
            }
            typeAnimated={'up'}
          />
          <CardTargetSectors
            src={reciclagem}
            alt={'reciclagem img'}
            description={
              'Webnários agendados com antecedencia e disponibilidade de aviso para os participantes.'
            }
            typeAnimated={'down'}
          />
          <CardTargetSectors
            src={webnar}
            alt={'webnar img'}
            description={'Perfeito para cursos e faculdades EAD.'}
            typeAnimated={'up'}
          />
        </ContainerSectors>
      </Container>
    </>
  );
}
