import { styled } from 'styled-components';
import { InputStyled } from '../../styles/formStyled';
// import { theme } from '../../theme';

export const Label = styled.label`
  ${InputStyled}
  font-size: ${({ theme }) => theme.font.size.sm};
  line-height: ${({ theme }) => theme.font.lineHeight};
  position: relative;
  width: 20rem;
  overflow: hidden;
  display: block;
`;

export const InputHidden = styled.input`
  opacity: 0;
  position: absolute;
  visibility: hidden;
`;

export const InputPlaceholder = styled.span`
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
