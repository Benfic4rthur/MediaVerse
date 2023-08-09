import { ContainerSvg, Input, SvgStyled } from '../../styles/formStyled';
import { Container } from './styled';

const sizeSVG = 20;

export function CreateInput({ Svg = '', ...rest }) {
  return (
    <Container>
      {Svg && (
        <ContainerSvg>
          <SvgStyled as={Svg} size={sizeSVG} />
        </ContainerSvg>
      )}
      <Input {...rest} $svg={Svg} />
    </Container>
  );
}
