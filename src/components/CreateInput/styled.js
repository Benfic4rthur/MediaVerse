import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  height: 4.1rem;
  /* height: fit-content; */
  z-index: 0;
  width: 100%;
  border-radius: ${({ theme }) => theme.border.radius};
  @media screen and (max-width: 500px) {
    height: 4.1rem;
    min-height: 3.5rem;
  }
`;
