import { styled } from 'styled-components';
import imgSala from '../../assets/sala.jpg';

export const ContainerBackground = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-position: 0;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url('${imgSala}');
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: min-content auto min-content;
  align-items: center;
  justify-content: space-between;
`;

export const ContainerImg = styled.div`
  text-align: center;
  img {
    width: 5rem;
  }
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    font-size: 2rem;
  }
`;

export const Container = styled.div`
  max-width: 1500px;
  width: 100%;
  margin: auto;
  color: ${({ theme }) => theme.color.fourth};
  padding: 0 1rem;
`;

export const H2 = styled.h2`
  font-size: ${({ theme }) => theme.font.size.xl};
  text-align: center;
  padding: 7rem 0;
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;

  color: #fff;
  font-size: 4em;
  p {
    font-size: 2.5rem;
  }
`;

export const SliderCarousel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 280px;
  max-width: 1200px;
  div {
    display: flex;
    justify-content: flex-start;
    gap: 1rem;
    width: 100%;
    height: 150px;
  }
`;

export const Carousel = styled.div`
  width: min(80%, 70rem);
  color: #fff;
  padding-bottom: 1.5rem;
  text-align: center;
  overflow: hidden;

  @media (max-width: 500px) {
    width: 100%;
    h3 {
      font-size: 3.6rem;
    }
    p {
      font-size: 1.5rem;
    }
  }
`;
export const ContainerCarousel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 1080px) {
    flex-direction: column;
  }
`;

export const FooterAccess = styled.footer`
  height: 3.5rem;
  background-color: ${({ theme }) => theme.color.fifth};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  color: #fff;
  font-size: 1.2rem;
  img {
    width: 2rem;
  }
`;

export const ContainerButtons = styled.div`
  display: flex;
`;

export const ContainerTitle = styled.p`
  font-size: 5rem;
  font-weight: 500;
`;

export const MediaContainer = styled.div`
  height: 100%;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
