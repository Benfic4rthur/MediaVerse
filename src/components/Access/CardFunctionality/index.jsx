import { useRef } from 'react';
import { useAnimation } from '../../../hooks/useAnimation';
import { Container, ContainerInfos, ContainerMedia, Description, HR, Title } from './styled';

export function CardFunctionality({ title, description, reverse = false, children, typeAnimated }) {
  const ref = useRef(null);

  const { showAnimation } = useAnimation(ref);

  
  return (
    <Container ref={ref}>
      <ContainerMedia className={showAnimation ? typeAnimated : ''}>{children}</ContainerMedia>
      <ContainerInfos $reverse={reverse} className={showAnimation ? typeAnimated : ''}>
        <Title>{title}</Title>
        <Description>{description}</Description>
        <HR />
      </ContainerInfos>
    </Container>
  );
}
