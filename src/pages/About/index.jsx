//css
import genuine from '../../assets/logofooter.png';
import { Container, Image, Text, Title } from './styled';

const index = () => {
  return (
    <Container>
      <Title>Faculdade Genuine Sistemas</Title>
      <Image src={genuine} alt='' />

      <Text>
      Projeto Inteiramente voltado para o conhecimento das funcionalidades do sistema, com o objetivo de
      facilitar a interação entre os clientes e os desenvolvedores.
      </Text>
    </Container>
  );
};

export default index;
