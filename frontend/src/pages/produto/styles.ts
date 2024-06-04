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
  height: 45vh;
 `;


export const ButtonContainer = styled.div`
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
`;

export const LabelAvatar = styled.label`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  input {
    display: none;
  }

  span {
    z-index: 99;
    position: absolute;
    //opacity: 0.7;
    transition: all 0.5s
  }
  
  span:hover {
      opacity: 1;
      transform: scale(1.5);
      color: #fff;
  }


  img {
    width: 200px;
    height: 170px;
    //border: 1px solid #000000;
  }

  //border: 1px solid #000000;
  //background-color: #DCDCDC;
`;

