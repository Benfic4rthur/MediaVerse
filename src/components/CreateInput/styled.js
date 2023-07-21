import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  height: fit-content;
  z-index: 0;
  width: 100%;
  border-radius: ${({ theme }) => theme.border.radius};
`;

export const SvgStyled = styled.form`
`;

export const ContainerSvg = styled.div`
  position: absolute;
  left: 1.6rem;
  z-index:1;
  top: 50%;
  height: ${({ theme }) => theme.sizeSVG / 10}rem;
  width: ${({ theme }) => theme.sizeSVG / 10}rem;
  transform: translateY(-50%);
`;
