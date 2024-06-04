import styled, { createGlobalStyle } from 'styled-components';

export const Form = styled.form`
  width: 100%;
  height: 87%;
`;

export const ToolbarButton = styled.div`
  width: 100%;
     
  border: 1px solid #000000;
  background-color: #1E90FF;

  button {
    margin: 5px 10px 0px 15px;
    border: none;

    background-color: #1E90FF;
    //background-color: transparent;

    &:hover {
      filter: brightness(1.5);
    }
  }
`;


export const GridContainer = styled.div`
  width: 100%;
  margin-top: 1px;
  padding-right: 5px;
  height: 100%;

  section {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;

    //overflow-y: scroll !important
  }
 `;


export const ButtonAgGrid = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 1px;

  button {
    background: transparent;
    border: 0;

    &:hover {
    filter: brightness(2);
  }
 }

`
/*
  @media (min-height: 600px) {
    height: 52vh;
  }
  @media (min-height: 720px) {
    height: 56vh;
  }
  @media (min-height: 860px) {
    height: 65vh;
  }
  @media (min-height: 1080px) {
    height: 65vh;
  }
  @media (min-height: 1440px) {
    height: 70vh;
  }
*/

