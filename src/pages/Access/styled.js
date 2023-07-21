import { Link } from 'react-router-dom/dist';

import { styled, keyframes } from 'styled-components';
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
  max-width: 1200px;
  width: 100%;
  margin: auto;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 2rem;
`;

export const ButtonClient = styled(Link)`
  text-decoration: none;
  color: white;
  height: 4rem;
  display: flex;
  text-decoration: none;
  transition: 300ms color;
  padding: 1rem;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.first};
  justify-content: center;
  align-items: center;
  margin-right: 20px;
  cursor: pointer;
  font-size: ${({ theme }) => theme.font.size.base};
  transition: transform 200ms linear, background-color 200ms linear;

  &:hover {
    background-color: ${({ theme }) => theme.color.firstHover};
    transform: scale(1.05);
  }
`;
export const Item = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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

export const LinkFooter = styled(Link)`
  text-decoration: none;
  color: white;
  font-size: 1.2rem;
`;

const animationRight = keyframes`
  0% {
    transform: translateX(-200px);
    opacity: 0;
  }
  50% {
    opacity: .3;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
`;
const animationLeft = keyframes`
  0% {
    transform: translateX(200px);
    opacity: 0;
  }
  50% {
    opacity: .3;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
`;

export const HexagonalFather = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: column;

  @media (max-width: 500px) {
    display: none;
  }
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Pizzaria = styled.div`
  font-size: 3rem;
  color: #fff;
  animation: ${animationRight} 0.5s ease-in-out;
  margin-top: -5rem;
  transition: 0.5s;

  img {
    width: 15rem;
  }

  &:hover {
    transform: scale(1.1);
  }
`;
export const Sushi = styled.div`
  font-size: 3rem;
  color: #fff;
  animation: ${animationLeft} 0.5s ease-in-out;
  margin-top: 5rem;
  transition: 0.5s;

  img {
    width: 15rem;
  }
  &:hover {
    transform: scale(1.1);
  }
`;
export const Foodtruck = styled.div`
  font-size: 3rem;
  color: #fff;
  animation: ${animationRight} 0.7s ease-in-out;
  margin-top: -5rem;
  transition: 0.5s;

  img {
    width: 15rem;
  }
  &:hover {
    transform: scale(1.1);
  }
`;
export const Delivery = styled.div`
  font-size: 3rem;
  color: #fff;
  animation: ${animationLeft} 0.7s ease-in-out;
  margin-top: 5rem;
  transition: 0.5s;

  img {
    width: 15rem;
  }
  &:hover {
    transform: scale(1.1);
  }
`;

export const CasaNoturna = styled.div`
  font-size: 3rem;
  color: #fff;
  animation: ${animationRight} 0.9s ease-in-out;
  margin-top: -5rem;
  transition: 0.5s;

  img {
    width: 15rem;
  }
  &:hover {
    transform: scale(1.1);
  }
`;

export const Conveniencia = styled.div`
  font-size: 3rem;
  color: #fff;
  animation: ${animationRight} 0.9s ease-in-out;
  margin-top: -5rem;
  transition: 0.5s;

  img {
    width: 15rem;
  }
  &:hover {
    transform: scale(1.1);
  }
`;
export const Pubs = styled.div`
  font-size: 3rem;
  color: #fff;
  animation: ${animationLeft} 0.9s ease-in-out;
  margin-top: 5rem;
  transition: 0.5s;

  img {
    width: 15rem;
  }
  &:hover {
    transform: scale(1.1);
  }
`;

export const Restaurante = styled.div`
  font-size: 3rem;
  color: #fff;
  animation: ${animationLeft} 0.5s ease-in-out;
  margin-top: 5rem;
  transition: 0.5s;

  img {
    width: 15rem;
  }
  &:hover {
    transform: scale(1.1);
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

export const MediaVerse = styled.div`
  position: relative;
  width: 80rem;
  height: 60rem;
  img {
    width: 10rem;
  }
  .m-part {
    position: absolute;
  }

  .part {
    left: 0;
    bottom: 34%;
  }

  .part1 {
    left: 8%;
    bottom: 47%;
  }

  .part2 {
    left: 16%;
    bottom: 60%;
  }

  .part3 {
    left: 26%;
    bottom: 51%;
  }

  .part4 {
    left: 36%;
    bottom: 60%;
  }

  .part5 {
    left: 45%;
    bottom: 49%;
  }

  .part6 {
    left: 53%;
    bottom: 35%;
  }
`;
