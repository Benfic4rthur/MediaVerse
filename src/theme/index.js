import { keyframes } from 'styled-components';

export const theme = {
  color: {
    first: 'hsl(228, 76%, 63%)',
    firstHover: 'hsl(228, 56%, 40%)',
    firstNav: 'hsl(211, 100%, 24%)',
    firstBg: 'hsl(228, 18%, 22%)',
    firstOpacity: 'hsl(228, 11%, 7%, 0.3)',
    shadow: 'hsl(228, 11%, 12%, 0.15)',

    secondBg: 'hsl(228, 11%, 25%)',
    secondOpacity03: 'hsl(228, 11%, 20%)',

    third: 'hsl(228, 11%, 28%, 0.3)',
    thirdBg: '#1C1B1E',
    thirdOpacity03: 'hsl(228, 11%, 38%, 0.3)',
    // firstBg
    fourth: 'hsl(0, 0%, 90%)',
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
      second: '"Spacetron", serif',
      primary: '"Roboto", sans-serif',
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

    coracao: keyframes`
  100% {
    transform: scale(1.2);
  }
  `,
  },
};
