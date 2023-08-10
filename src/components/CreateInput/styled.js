import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  height: fit-content;
  z-index: 0;
  width: 100%;
  border-radius: ${({ theme }) => theme.border.radius};
`;

