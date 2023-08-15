import { keyframes } from 'styled-components';

export const theme = {
  color: {
    first: 'hsl(229, 78%, 61%)',
    firstHover: 'hsl(211, 100%, 30%)',
    firstNav: 'hsl(211, 100%, 24%)',
    firstBg: 'hsl(228, 18%, 22%)',
    firstOpacity: 'hsl(228, 11%, 7%, 0.3)',
    shadow: 'hsl(228, 11%, 12%, 0.15)',

    secondBg: 'hsl(228, 11%, 25%)',
    secondOpacity03: 'hsl(228, 11%, 20%)',

    third: 'hsl(228, 11%, 28%, 0.3)',
    thirdBg: 'hsl(260, 5%, 11%)',
    thirdOpacity03: 'hsl(228, 11%, 38%, 0.3)',
    fourth: 'hsl(0, 0%, 90%)',
    fourthHover: 'hsl(0, 0%, 95%, 0.3)',
    fourthBg: 'hsl(260, 11%, 5%)',
    fourthOpacity: 'hsl(0, 0%, 95%, 0.7)',

    fifth: 'hsl(228, 6%, 10%)',
    fifthHover: 'hsl(228, 6%, 7%)',
    error: 'hsl(1, 55%, 54%)',
    errorHover: 'hsl(1, 55%, 49%)',
    errorDisabled: 'hsl(1, 55%, 34%)',
    success: 'hsl(126, 43%, 30%)',
    successBg: 'hsl(126, 23%, 77%)',
  },
  font: {
    size: {
      xs: '1.2rem',
      sm: '1.4rem',
      base: '1.6rem',
      lgs: '1.9rem',
      lg: '2.2rem',
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
  sizeSVG: '2rem',
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
