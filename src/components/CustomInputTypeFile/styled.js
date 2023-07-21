import { styled } from 'styled-components';
import { InputStyled } from '../../styles/formStyled';
// import { theme } from '../../theme';

export const Label = styled.label`
  ${InputStyled}
  font-size:13.5px;
  position: relative;
  width: 20rem;
  overflow: hidden;
  display: block;

  & > span {
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & > input {
    opacity: 0;
    position: absolute;
    visibility: hidden;
  }
`;
