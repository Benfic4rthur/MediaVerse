//css
import { Container, Image } from './styled';
import erro404 from '../../assets/404.png';
import { useEffect } from 'react';

export const NotFound = () => {
  useEffect(() => {
    document.title = 'MediaVerse - Not Found';
  });
  return (
    <Container>
      <Image src={erro404} alt='404 page not found' />
    </Container>
  );
};
