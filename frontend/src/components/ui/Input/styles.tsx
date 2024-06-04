import styled from "styled-components";

export interface InputContainerProps {
  wd?: string;
  hg?: string;
  bd?: string;
}

export const InputBorder = styled.div<InputContainerProps>`
  width: ${(props) => (props.wd ? props.wd : "auto")};
  height: ${(props) => (props.hg ? props.hg : "25px")};

  border: ${(props) => (props.bd ? props.bd : "2px solid #0000ff;")};
  border-radius: 0.4rem;
  padding: 1px 3px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  // Olho
  button {
    background: transparent;
    border: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #0000ff;

    svg {
      margin-right: 5px;
      margin-top: 1px;
    }

    &:hover {
      filter: brightness(1.5);
      color: #ff3f4b;
    }
  }
`;
