import { Container, ContainerInfos, ContainerMedia, Description, HR, Title } from './styled';

export function AccessCard({ title, description, reverse = false, children, classname }) {
  return (
    <Container>
      <ContainerMedia className={classname}>{children}</ContainerMedia>
      <ContainerInfos $reverse={reverse} className={classname}>
        <Title>{title}</Title>
        <Description>{description}</Description>
        <HR />
      </ContainerInfos>
    </Container>
  );
}
