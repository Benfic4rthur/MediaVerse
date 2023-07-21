import { keyframes } from 'styled-components';

export const theme = {
  color: {
    first: 'hsl(6, 66%, 58%)',
    firstHover: 'hsl(6, 54%, 34%)',
    firstBg: 'hsl(225, 11%, 22%)',
    firstOpacity: 'hsl(225, 11%, 7%, 0.3)',
    shadow: 'hsl(225, 11%, 12%, 0.15)',

    secondBg: 'hsl(225, 11%, 25%)',
    secondOpacity03: 'hsl(225, 11%, 20%)',

    third: 'hsl(225, 11%, 28%, 0.3)',
    thirdBg: '#1C1B1E',
    thirdOpacity03: 'hsl(225, 11%, 38%, 0.3)',

    fourth: 'hsl(0, 0%, 95%)',
    fourthHover: 'hsl(0, 0%, 95%, 0.3)',
    fourthBg: '#0D0C0F',
    fourthOpacity: 'hsl(0, 0%, 95%, 0.7)',

    fifth: '#202024',
    error: '#f15856',
  },
  font: {
    size: {
      xs: '1.2rem',
      sm: '1.4rem',
      base: '1.6rem',
      lgs: '2rem',
      lg: '2.4rem',
      xl: '3.2rem',
      '2xl': '4.8rem',
    },
    lineHeight: '150%',
    family: {
      primary: '"AmpleSoft Pro", serif',
      second: '"Open Sans", sans-serif',
    },
    weight: {
      bold: 700,
      medium: 500,
      regular: 400,
      light: 300,
    },
  },
  border: {
    radius: '1rem',
  },
  scale: {
    scale: 'scale(1)',
    visible: 'visible',
  },

  animation: {
    balancinho: keyframes`
    100% {
      transform: rotate(-20deg);
    }
  `,
  },
};
