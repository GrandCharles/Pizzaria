import styled, { createGlobalStyle } from 'styled-components';

export const Form = styled.form`
  width: 100%;
  height: 84%;
`;

export const ToolbarButton = styled.div`
  width: 100%;
     
  border: 1px solid #000000;
  background-color: #1E90FF;

  display: flex;

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

`
/*
@media ${device.mobileS} {
  height: 56vh;
  margin-top: 8%;
}

@media ${device.tablet} {
  height: 60vh;
  margin-top: 8%;
}

@media ${device.laptop} {
  height: 63vh;
  margin-top: 0;
}

@media ${device.laptopL} {
  height: 76vh;
  margin-top: 0;
}
*/

