import { styled, keyframes } from 'styled-components';

export const Container = styled.div`
  max-width: 1500px;
  width: 100%;
  margin: auto;
  color: ${({ theme }) => theme.color.fourth};

  h1 {
    text-align: center;
    margin: 7rem 0;
  }
`;
export const Nav = styled.nav`
  position: fixed;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
`;
