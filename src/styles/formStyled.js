import styled, { css } from 'styled-components';
// import { theme } from '../theme';

// const { color, font, border } = theme;

export const InputError = styled.label`
  color: #f15856 /* ${({ theme }) => theme.color.error} */;
  font-family: ${({ theme }) => theme.font.family.primary};
  padding-inline: 2rem;
  font-size: ${({ theme }) => theme.font.size.xs};
  line-height: ${({ theme }) => theme.font.lineHeight};
`;

export const ContainerForm = styled.section`
  height: fit-content;
  width: min(100%, 34.5rem);
  display: flex;
  padding: 2.5rem 1.8rem min(15vh, 3rem);
  box-shadow: 0.2rem 0.2rem 0.5rem ${({ theme }) => theme.color.shadow};

  margin: 0 auto;
  justify-content: center;
  flex-direction: column;
  gap: 1.8rem;
  border-radius: ${({ theme }) => theme.border.radius};
  background-color: ${({ theme }) => theme.color.thirdOpacity03};

  > h1 {
    font-size: 2rem;
    font-weight: ${({ theme }) => theme.font.weight.bold};
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const TextariaOrInputStyled = css`
  background-color: ${({ theme }) => theme.color.fourthHover};
  border-radius: ${({ theme }) => theme.border.radius};
  color: ${({ theme }) => theme.color.fourthBg};
  border: 0.1rem solid ${({ theme }) => theme.color.fourthOpacity};
  font-family: ${({ theme }) => theme.font.family.primary};
  font-size: ${({ theme }) => theme.font.size.sm};
  line-height: ${({ theme }) => theme.font.lineHeight};

  &::placeholder,
  &::-webkit-input-placeholder {
    color: ${({ theme }) => theme.color.fourthBg};
  }
  &:-ms-input-placeholder {
    color: ${({ theme }) => theme.color.fourthBg};
  }
`;

export const InputStyled = css`
  ${TextariaOrInputStyled}
  min-width: 100%;
  /* height: fit-content; */
  height: 4.1rem;
  text-align: left;
  padding: ${props => (props.$svg ? '.9rem .9rem .9rem 4rem' : '.8rem')};
`;

export const Input = styled.input`
  ${InputStyled}
  &[type='file']::-webkit-file-upload-button {
    display: none;
  }
  ${props => props.style}
`;

export const ContainerSvg = styled.label`
  position: absolute;
  left: 1rem;
  z-index: 1;
  top: 50%;
  transform: translateY(-50%);
`;

export const SvgStyled = styled.svg`
  height: ${({ theme }) => theme.sizeSVG};
  width: ${({ theme }) => theme.sizeSVG};
`;

export const Textaria = styled.textarea`
  width: 100%;
  height: 10rem;
  padding: 1.2rem;

  ${TextariaOrInputStyled}

  word-break: break-all;
  resize: none;

  &:focus {
    outline: 0.2rem solid ${({ theme }) => theme.color.first};
    outline-offset: 0.3rem;
  }
`;

export const StyledButton = styled.button`
  width: 100%;
  padding: 1rem 1.6rem;
  font-weight: ${({ theme }) => theme.font.weight.bold};
  font-size: ${({ theme }) => theme.font.size.sm};
  text-align: center;
  text-decoration: none;
  border: none;
  border-radius: 1rem;
  cursor: pointer;
  transition: 300ms color, 400ms background-color;
`;

export const ButtonForm = styled(StyledButton)`
  background-color: ${({ theme }) => theme.color.first};
  color: ${({ theme }) => theme.color.fourth};

  &:hover {
    background-color: ${({ theme }) => theme.color.firstHover};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.color.first};
    color: ${({ theme }) => theme.color.fourth};
  }
`;

export const ButtonResetForm = styled(StyledButton)`
  background-color: ${({ theme }) => theme.color.fifth};
  color: ${({ theme }) => theme.color.error};

  &:hover {
    background-color: ${({ theme }) => theme.color.fifthHover};
    color: ${({ theme }) => theme.color.errorHover};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.color.fifthHover};
    color: ${({ theme }) => theme.color.errorDisabled};
  }
`;

export const jhh = styled.p`
  padding: 0.8rem;
  font-size: ${({ theme }) => theme.font.size.xs};
  color: 'hsl(59, 100%, 76%)';
  border-radius: 1rem;
  background: hsl(0, 80%, 90%);
`;

export const Error = styled.p`
  padding: 0.8rem;
  font-size: ${({ theme }) => theme.font.size.xs};
  color: hsl(0, 50%, 50%);
  border-radius: 1rem;
  background: hsl(0, 80%, 90%);
`;

export const Success = styled.p`
  padding: 0.8rem;
  font-size: ${({ theme }) => theme.font.size.xs};
  color: ${({ theme }) => theme.color.success};
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.color.successBg};
`;

// export const Description = styled.p`
//   color: ${({theme}) => theme.color.fourth};
//   font-size: ${({theme}) => theme.font.size.sm};
//   font-weight: 400;
//   font-family: ${({theme}) => theme.font.family.primary};
//   line-height: ${({theme}) => theme.font.lineHeight};
// `;

// export const Logo2xl = styled.h2`
//   width: 100%;
//   font-weight: 700;
//   color: ${({theme}) => theme.color.first};
//   font-family: ${({theme}) => theme.font.family.primary};
//   font-size: clamp(3rem, 4.5vw, ${({theme}) => theme.font.size['2xl']});
//   line-height: ${({theme}) => theme.font.lineHeight};
// `;

// export const Subtitle = styled.h2`
//   color: ${({theme}) => theme.color.third};
//   font-size: ${({theme}) => theme.font.size.lg};
//   line-height: ${({theme}) => theme.font.lineHeight};
//   font-family: ${({theme}) => theme.font.family.primary};
//   font-weight: 500;
// `;

// export const ContainerScrollbar = styled.div`
//   height: 100vh;

//   overflow: overlay;

//   ::-webkit-scrollbar {
//     width: 0.8rem;
//   }

//   ::-webkit-scrollbar-track {
//     background: transparent;
//   }

//   ::-webkit-scrollbar-thumb {
//     background: ${({theme}) => theme.color.first};
//     border-radius: ${({theme}) => theme.border.radius};
//   }

//   ::-webkit-scrollbar-thumb:hover {
//     background: ${({theme}) => theme.color.firstHover};
//   }
// `;

// export const ContainerMain = styled.main`
//   width: 100%;
//   display: flex;
//   flex-direction: row;
// `;

// export const ContainerInput = styled.div`
//   width: 100%;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   gap: 0.8rem;
// `;

// export const ContainerLink = styled.div`
//   border-radius: ${({theme}) => theme.border.radius};
//   align-items: center;
//   width: 100%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// export const ContainerImg = styled.div`
//   width: 55%;
//   background-color: ${({theme}) => theme.color.firstOpacity};
//   display: block;
//   align-items: center;
//   overflow: hidden;
//   position: relative;

//   @media (max-width: 72rem) {
//     display: none;
//     height: auto;
//   }
// `;

// export const Input = styled.input`
//   width: 100%;
//   height: 5.2rem;
//   border-radius: 1rem;
//   padding: 1.6rem;
//   outline: none;
//   background-color: ${({theme}) => theme.color.firstHover};
//   color: ${({theme}) => theme.color.firstBg};
//   font-family: ${({theme}) => theme.font.family.primary};
//   line-height: ${({theme}) => theme.font.lineHeight};

//   :focus {
//     outline: .2rem solid ${({theme}) => theme.color.first};
//     outline-offset: .3rem;
//   }

//   ::placeholder,
//   ::-webkit-input-placeholder {
//     color: ${({theme}) => theme.color.firstOpacity};
//   }
//   :-ms-input-placeholder {
//     color: ${({theme}) => theme.color.firstOpacity};
//   }
// `;

// export const Img = styled.img`
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   min-width: 100%;
//   min-height: 100%;
//   height: auto;
//   width: auto;
// `;

// export const ContainerError = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 0.5rem;
//   width: 100%;
// `;
