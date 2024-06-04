import styled, { createGlobalStyle } from 'styled-components';
import { device } from '../../../styles/mediaQuery';

export const Container = styled.div`
  width: 99.9%;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #FFF5EE;
  //border: 1px solid #000000;

  @media ${device.mobileS} {
    //background-color: #ff69b4;
  }
  @media ${device.tablet} {
    //background-color: #ffff00;
  }
  @media ${device.tabletL} {
    //background-color: #00ffff;
  }
  @media ${device.laptop} {
   // background-color: #0000ff;
  }
  @media ${device.laptopM} {
    //background-color: #00ff7f;
  }
  @media ${device.laptopL} {
    //background-color: #daa520;
  }
  @media ${device.desktop} {
    //background-color: #da2020;
  }
  @media ${device.desktopL} {
    //background-color: #da2020;
  }
`;


export const ContainerLogo = styled.div`
  width: 75%;
  height: 99.9%;
  overflow: hidden; /* Faz o div não aumentar a altura por causa da imagem */

  //margin-top: .1rem;
  //margin-left: .1rem;
  //float: left;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    //object-position: bottom;
  }

  //background-color: #00FF7F;
  //border: 1px solid #000000;
`;


export const ContainerLogin = styled.div`
  width: 30%;
  height: auto;
  margin-left: .1rem;
  margin-right: .1rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  button {
    background: transparent;
    border: 0;
  }

  background-color: #F0FFF0;
  //background-color: #fa7d00;
  //border: 1px solid #61098a;
`;

export const Text = styled.a`
  margin-top: .5rem;
  //margin-right: 0rem;
  font-weight: bold;
  cursor: pointer;

  //color: var(--red);
  color: #FF0000;
/*
  @media (min-width: 480px) {
    font-size: 55%;
  }
  @media (min-width: 720px) {
    font-size: 65%;
  }
  @media (min-width: 1080px) {
    font-size: 85%;
  }
  @media (min-width: 1440px) {
    font-size: 95%;
  }
*/

  @media ${device.mobileS} {
    font-size: 45%;
  }
  @media ${device.tablet} {
    font-size: 50%;
  }
  @media ${device.tabletL} {
    font-size: 65%;
  }
  @media ${device.laptop} {
    font-size: 75%;
  }
  @media ${device.laptopM} {
    font-size: 90%;
  }
  @media ${device.laptopL} {
    font-size: 100%;
  }
  @media ${device.desktop} {
    font-size: 100%;
  }
  @media ${device.desktopL} {
    font-size: 100%;
  }


`

