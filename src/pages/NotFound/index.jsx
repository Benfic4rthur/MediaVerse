//css
import { Container, Image } from './styled';
import erro404 from '../../assets/404.png';
import { useEffect } from 'react';

const Index = () => {
  useEffect(() => {
    document.title = 'Ekor Solutions- Not Found';
  });
  return (
    <Container>
      <Image src={erro404} alt='404 page not found' />
    </Container>
  );
};

export default Index;
