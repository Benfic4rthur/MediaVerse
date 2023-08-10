import { useLayoutEffect, useState } from 'react';
import { ContainerSvg, Input, SvgStyled } from '../../styles/formStyled';
import { Container } from './styled';

const sizeSVG = 20;

export function CreateInput({ Svg = '', id ="", ...rest }) {
    const [state, setstate] = useState('');

    useLayoutEffect(() => {
      setstate(Math.floor(Math.random() * 10 ** 20).toString(36));
    }, []);

  return (
    <Container>
      {Svg && (
        <ContainerSvg htmlFor={id ? id : state}>
          <SvgStyled as={Svg} id size={sizeSVG} />
        </ContainerSvg>
      )}
      <Input {...rest} id={id ? id : state} $svg={Svg} />
      
    </Container>
  );
}
