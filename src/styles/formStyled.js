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
  width: min(100%, 36rem);
  display: flex;
  padding: 3rem 2rem min(15vh, 4rem);
  box-shadow: 0.2rem 0.2rem 0.5rem ${({ theme }) => theme.color.shadow};

  margin: 0 auto;
  justify-content: center;
  flex-direction: column;
  gap: 2.3rem;
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
  gap: 1.4rem;
`;

const TextariaOrInputStyled = css`
  background-color: ${({ theme }) => theme.color.fourthHover};
  border-radius: ${({ theme }) => theme.border.radius};
  color: ${({ theme }) => theme.color.fourthBg};
  border: 0.1rem solid ${({ theme }) => theme.color.fourthOpacity};
  font-family: ${({ theme }) => theme.font.family.primary};
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
  min-width: 100%;
  height: 3.7rem;
  ${TextariaOrInputStyled}
`;

export const Input = styled.input`
  ${InputStyled}
  &[type='file']::-webkit-file-upload-button {
    display: none;
  }
  ${props => props.style}
`;

export const Textaria = styled.textarea`
  width: 100%;
  height: 20rem;
  padding: 1.6rem;

  ${TextariaOrInputStyled}

  word-break: break-all;
  resize: none;

  &:focus {
    outline: 0.2rem solid ${({ theme }) => theme.color.first};
    outline-offset: 0.3rem;
  }
`;

export const ButtonForm = styled.button`
  background-color: ${({ theme }) => theme.color.first};
  color: ${({ theme }) => theme.color.fourth};
  text-align: center;
  cursor: pointer;
  border-radius: 1rem;
  width: 100%;
  font-weight: ${({ theme }) => theme.font.weight.bold};
  border: none;
  padding: 1.5rem 2rem;
  font-size: 1.6rem;
  transition: 300ms color, 300ms background-color;

  &:hover {
    background-color: ${({ theme }) => theme.color.firstHover};
    transition: 0.5s;
    border-radius: 1rem;
  }

  &:disabled {
    background-color: ${({ theme }) => theme.color.first};
    color: ${({ theme }) => theme.color.fourth};
  }
  :focus {
    outline: 0.2rem solid ${({ theme }) => theme.color.fourth};
    outline-offset: 0.3rem;
  }
  :hover {
    text-decoration: underline;
  }
`;

export const jhh = styled.p`
  padding: 0.8rem;
  font-size: 1.2rem;
  color: 'hsl(59, 100%, 76%)';
  border-radius: 1rem;
  background: hsl(0, 80%, 90%);
`;
export const Error = styled.p`
  padding: 0.8rem;
  font-size: 1.2rem;
  color: hsl(0, 50%, 50%);
  border-radius: 1rem;
  background: hsl(0, 80%, 90%);
`;
export const Success = styled.p`
  padding: 0.8rem;
  font-size: 1.2rem;
  color: green; /*hsl(125.71428571428572, 49.60629921259843%, 50.19607843137255%)*/
  border-radius: 1rem;
  background-color: hsl(126.81818181818183, 23.157894736842117%, 62.745098039215684%);
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
