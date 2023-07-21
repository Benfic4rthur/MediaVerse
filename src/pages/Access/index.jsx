/* eslint-disable react-hooks/rules-of-hooks */
import logo from '../../assets/logo.png';
import logoFooter from '../../assets/logofooter.png';
import pizzaria from '../../assets/pizzaria.png';
import delivery from '../../assets/delivery.png';
import conveniencia from '../../assets/conveniencia.png';
import sushi from '../../assets/sushi.png';
import foodTruck from '../../assets/food-truck.png';
import pubs from '../../assets/pubs.png';
import casaNorturna from '../../assets/casa-norturna.png';
import RestauranteNew from '../../assets/restaurante2.png';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {
  ButtonClient,
  Carousel,
  Container,
  ContainerBackground,
  ContainerCarousel,
  ContainerImg,
  Content,
  Conveniencia,
  Delivery,
  Foodtruck,
  FooterAccess,
  HexagonalFather,
  Item,
  LinkFooter,
  Pizzaria,
  Pubs,
  Restaurante,
  Sushi,
  CasaNoturna,
  ContainerButtons,
  ContainerTitle,
} from './styled';
import { useLayoutEffect } from 'react';

const index = () => {
  const date = new Date();
  const year = date.getFullYear();

  useLayoutEffect(() => {
    document.title = 'Genuine Sistemas - Acesso';
  }, []);

  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 5000,
    nextArrow: <></>,
    prevArrow: <></>,
    cssEase: 'linear',
  };

  return (
    <ContainerBackground>
      <Container>
        <ContainerImg>
          <ContainerTitle>Base de Conhecimento</ContainerTitle>
          <img src={logo} alt='logo' />
        </ContainerImg>
        <ContainerButtons>
          <ButtonClient to='/login'>Área do Cliente</ButtonClient>

          <ButtonClient to='/public'>Não é Cliente</ButtonClient>
        </ContainerButtons>
      </Container>

      <ContainerCarousel>
        <Carousel>
          <Slider {...settings}>
            <Item>
              <h3>
                Acesse todas
                <br />
                as informações
              </h3>
              <p>do seu negócio de onde estiver</p>
            </Item>
            <Item>
              <h3>
                Gestão e controle
                <br />
                de ponta a ponta
              </h3>
              <p>para levar o seu estabelecimento a outro nível</p>
            </Item>
            <Item>
              <h3>
                Um sistema completo
                <br />
              </h3>
              <p>e descomplicando para a gestão do seu negócio</p>
            </Item>
          </Slider>
        </Carousel>
        <HexagonalFather>
          <Content>
            <Restaurante>
              <img src={RestauranteNew} alt='restaurante' />
            </Restaurante>
            <Pizzaria>
              <img src={pizzaria} alt='pizzaria' />
            </Pizzaria>
            <Sushi>
              <img src={sushi} alt='sushi' />
            </Sushi>
          </Content>
          <Content>
            <Foodtruck>
              <img src={foodTruck} alt='foodtruck' />
            </Foodtruck>
            <Delivery>
              <img src={delivery} alt='delivery' />
            </Delivery>
          </Content>
          <Content>
            <Conveniencia>
              <img src={conveniencia} alt='conveniencia' />
            </Conveniencia>
            <Pubs>
              <img src={pubs} alt='pubs' />
            </Pubs>
            <CasaNoturna>
              <img src={casaNorturna} alt='CasaNoturna' />
            </CasaNoturna>
          </Content>
        </HexagonalFather>
      </ContainerCarousel>
      <FooterAccess>
        <img src={logoFooter} alt='logo' />
        <LinkFooter to='https://genuinesistemas.com.br/'>Genuine sistemas &copy;</LinkFooter>, Todos
        os direitos reservados {year}
      </FooterAccess>
    </ContainerBackground>
  );
};

export default index;
