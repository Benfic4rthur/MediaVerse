import { Author, 
  ContainerMidia,
  ContainerPost, 
  // ContainerTag, 
  Title } from './styled';

export const SkeletonPostDetailsHome = () => {
  return (
    <ContainerPost>
      <ContainerMidia />
      <Title />
      <Author />
      {/* <ContainerTag /> */}
    </ContainerPost>
  );
};

