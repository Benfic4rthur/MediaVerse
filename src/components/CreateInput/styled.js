import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  height: fit-content;
  min-height: 1.5rem;
  z-index: 0;
  width: 100%;
  border-radius: ${({ theme }) => theme.border.radius};
  @media screen and (max-width: 500px) {
    height: fit-content;
    min-height: 1.5rem;
  }
`;
