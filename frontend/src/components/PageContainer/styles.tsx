import styled from "styled-components";

export const Container = styled.div`
  width: auto;
  min-height: 88vh;
  margin: 0 auto;
  margin-left: 8vh;

  display: flex;
  justify-content: center;
  align-items: center;

  //border: 1px solid #000000;
  //background-color: #808080;
`;

export interface FormContainerProps {
  wd?: string;
  hg?: string;
}
export const FormContainer = styled.div<FormContainerProps>`
  width: ${(props) => (props.wd ? props.wd : "auto")};
  height: ${(props) => (props.hg ? props.hg : "15vh")};
  min-height: ${(props) => (props.hg ? props.hg : "15vh")};

  border: 1.5px solid #8a8a8a;
  border-radius: 10px;
  box-shadow: 10px 10px #e0ffff;

  display: flex;
  justify-content: center;
  align-items: flex-start;
  align-content: flex-start;
  flex-wrap: wrap;

  background-color: #f0ffff;

  //border: 1px solid #000000;
  //background-color: #ff1493;
`;

export const TitleBar = styled.div`
  background-color: #b0e0e6;

  width: 100%;
  height: 5vh;
  padding: 1vh;

  //border: 1.5px solid #8a8a8a;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  //align-content: space-between;
  //flex-wrap: wrap;

  h1 {
    margin-top: 1px;
    padding: 1px;
    //margin-bottom: 7px;
    font-size: 16px;
    font-weight: 700;
    color: #500569;
  }

  button {
    padding: 2px;
    margin-top: 5px;
    border: 0;
    background: none;
    color: #0000ff;

    :hover {
      color: #ff3f4b;
    }
  }
`;
