import { Container, ContainerInfos, ContainerMedia, Description, HR, Title } from './styled';

export function AccessCard({ title, description, reverse = false, children }) {
  return (
    <Container>
      <ContainerMedia>{children}</ContainerMedia>
      <ContainerInfos $reverse={reverse}>
        <Title>{title}</Title>
        <Description>{description}</Description>
        <HR/>
      </ContainerInfos>
    </Container>
  );
}
