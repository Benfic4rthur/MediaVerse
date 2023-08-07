import { NavLink } from 'react-router-dom';
import { keyframes, styled } from 'styled-components';
import { MidiaStyled } from '../../pages/Post/Index/styled';

const animate = keyframes`
    0% {
        transform: translateX(100px);
        opacity: 0;
    }
    50%{
        opacity: .3;
    }
    100%{
        transform: translateX(0px);
        opacity: 1;
    }
`;

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
  animation: ${animate} 0.5s ease-in-out;

  &.active {
    /* background-color: ${({ theme }) => theme.color.thirdOpacity03}; */
    display: none;
  }

  @media (max-width: 1080px) {
    margin: 0 auto;
    width: min(50rem, 100%);
  }
`;

export const Video = styled.video`
  ${MidiaStyled}
  width: 200px;
  height: 100px;
  background-color: ${({ theme }) => theme.color.firstOpacity};
  border-radius: 10px;
`;

export const Descricao = styled.div`
  display: flex;
  flex-direction: column;
  white-space: normal;
  justify-content: space-between;
  height: 100%;
`;

export const Subtitle = styled.div`
  font-size: ${({ theme }) => theme.font.size.xs};
  color: ${({ theme }) => theme.color.first};
  margin-bottom: 1rem;
`;
