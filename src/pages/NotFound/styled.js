/* eslint-disable import/no-named-as-default */
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
`;

export const Image = styled.img`
  width: min(100%, 90rem);
  margin-top: -40px;
`;

export const Title = styled.h1`
  font-family: ${({ theme }) => theme.font.family.robotoSlab};
  font-size: ${({ theme }) => theme.font.size.lg};
`;
