import styled from 'styled-components';

export interface ButtonProps {
  wd?: string;
  hg?: string;
  bg?: string;
};

export const ButtonContainer = styled.div<ButtonProps>`
  width: ${(props) => (props.wd ? props.wd : 'auto')};
  height: ${(props) => (props.hg ? props.hg : '10px')};
  //background-color: ${(props) => (props.bg ? props.bg : '#fff')};

  background: -webkit-linear-gradient(to left, #21d4fd, #b721ff);
  background: -o-linear-gradient(to left, #21d4fd, #b721ff);
  background: -moz-linear-gradient(to left, #21d4fd, #b721ff);
  background: linear-gradient(to left, #21d4fd, #b721ff);


  border: 0;
  //padding: 0.4rem;
  margin-left: 2px;
  //color: var(--white);
  border-radius: 0.5rem;
  //background-color: var(--springGreen);

  display: flex;
  justify-content: center;
  align-items: center;
  
  // animação do botão
  &[disabled] {
    cursor: not-allowed;
    svg {
      animation: animate 2s infinite;
    }
  }

  &:hover {
    filter: brightness(1.5);
  }

  button a {
    background: transparent;
    border: 0;
    font-weight: bolder;
    color: #000000;
    font-size: 1.1rem;

  }

  @keyframes animate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  background: -webkit-linear-gradient(to left, #21d4fd, #b721ff);
  background: -o-linear-gradient(to left, #21d4fd, #b721ff);
  background: -moz-linear-gradient(to left, #21d4fd, #b721ff);
  background: linear-gradient(to left, #21d4fd, #b721ff);
`;


 /*
  @media (min-width: 480px) {
    width: 190px;
  }

  @media (min-width: 720px) {
    //margin-left: 1rem;
    width: 230px;
  }

  @media (min-width: 1080px) {
    width: 400px;
  }

  @media (min-width: 1440px) {
    width: 400px;
  }

 */