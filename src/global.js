import { createGlobalStyle } from 'styled-components';
import AmpleSoftBold from './assets/AmpleSoftPro-Bold.ttf';
import AmpleSofRegular from './assets/AmpleSoftPro-Regular.ttf';
// import { containerStyleBody } from './styles/styledGlobal';

export const GlobalStyle = createGlobalStyle`
   * {
      margin:0;
      border: none;
      padding:0;
      outline: none;
      box-sizing: border-box;
      transition: 0;
      &:focus{
         outline:  ${({ theme }) => theme.color.first} solid 2px ;
         outline-offset: .3rem;
      }
   }
   html {
      font-size: 62.5%;
      width: 100%;
      min-height: 100vh;
      height: 100%;
      background-color:  ${({ theme }) => theme.color.firstBg};
   }
   body {
      width: 100%;
      font-family: ${({ theme }) => theme.font.family.primary};
      min-height: 100vh;
      height: 100%;
   }

/* @font-face {
      font-family: 'AmpleSoft Pro';
      src: url(${AmpleSoftBold}) format('truetype');
}

   @font-face {
      font-family: 'AmpleSoft Pro';
      src: url(${AmpleSoftBold}) format('truetype');
      font-weight: 700;
      font-style: normal;
}

   @font-face {
      font-family: 'AmpleSoft Pro';
      src: url(${AmpleSofRegular}) format('truetype');
      font-weight: 500;
      font-style: normal;
} */
`;
