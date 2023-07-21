import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { MidiaStyled } from '../../pages/Post/styled';

export const Container = styled(Link)`
  display: grid;
  grid-template-columns: min-content auto;
  grid-template-rows: 1fr;
  gap: 1rem;
  text-decoration: none;
  padding-inline: 0.5rem;
  height: 10rem;
  overflow: hidden;
  width: 100%;
  color: #fff;
  font-size: 1.5rem;

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
