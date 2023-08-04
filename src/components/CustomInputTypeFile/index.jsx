import { useLayoutEffect, useRef, useState } from 'react';
import { Container } from '../CreateInput/styled';
import { InputHidden, InputPlaceholder, Label } from './styled';
import { ContainerSvg, SvgStyled } from '../../styles/formStyled';

const sizeSVG = 20;

export function CustomInputTypeFile({ Svg = '', id = '', placeholder = '', onChange, ...rest }) {
  const [state, setstate] = useState('');
  const [Placeholder, setPlaceholder] = useState(placeholder);
  const fileInputRef = useRef(null);

  const handleLabelKeyDown = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      fileInputRef.current.click();
    }
  };

  const handleFileInputChange = event => {
    const selectedFile = event.target.files[0];
    setPlaceholder(selectedFile.name);
  };

  useLayoutEffect(() => {
    setstate(Math.floor(Math.random() * 10 ** 20).toString(36));
  }, []);

  return (
    <Container>
      {Svg && (
        <ContainerSvg>
          <SvgStyled as={Svg} size={sizeSVG} />
        </ContainerSvg>
      )}
      <Label
        htmlFor={id ? id : state}
        tabIndex='0'
        title={Placeholder ? Placeholder : 'Nenhum arquivo escolhido'}
        $svg={Svg}
        onKeyDown={handleLabelKeyDown}
      >
        <InputPlaceholder aria-hidden={true}>
          {Placeholder ? Placeholder : 'Nenhum arquivo escolhido'}
        </InputPlaceholder>
        <InputHidden
          type='file'
          ref={fileInputRef}
          onChange={e => {
            handleFileInputChange(e);
            onChange?.(e);
          }}
          name='true'
          {...rest}
          id={id ? id : state}
        />
      </Label>
    </Container>
  );
}
