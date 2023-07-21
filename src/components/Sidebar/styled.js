import { NavLink } from 'react-router-dom';
import { styled } from 'styled-components';
// import { MidiaStyled } from '../../pages/Post/styled';

export const Container = styled(NavLink)`
  display: grid;
  grid-template-columns: min-content auto;
  background-color: ${({ theme }) => theme.color.firstOpacity};
  border-radius: ${({ theme }) => theme.border.radius};
  box-shadow: 0.1rem 0.1rem 1rem ${({ theme }) => theme.color.shadow};
  padding: 0.7rem;
  grid-template-rows: 1fr;
  gap: 1rem;
  text-decoration: none;
  overflow: hidden;
  width: 100%;
  color: #fff;
  font-size: 1.5rem;

  &.active {
    background-color: ${({ theme }) => theme.color.thirdOpacity03};
  }
`;

export const ContainerCenter = styled.div`
  @media (max-width: 1080px) {
    margin: 0 auto;
    width: min(50rem, 100%);
  }
`;
