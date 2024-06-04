import styled, { createGlobalStyle, css, keyframes } from "styled-components";
import PerfectScrollbar from 'react-perfect-scrollbar';

export default createGlobalStyle`
  .grid-button {
    background-color: transparent;
    border: none;
    outline: 0;
    padding: 0;
    margin-right: 14px;
  }

  .grid-button:last-child {
    margin-right: 0;
  }

  .grid-button i {
    color: #61098a;
  }

  .grid-red-row {
    background-color: #e42a3c !important;
  }

  .ag-theme-balham .grid-red-row.ag-row-selected {
    background-color: #e42a3c !important;
  }

  .ag-theme-balham {
    font-family: 'Roboto',sans-serif !important;
  }

  .ag-theme-balham .ag-row-selected {
    /* background-color: rgba(100,12,141,0.6) !important; */
    background-color: rgb(141 68 175 / 60%) !important;
  }

  .ag-theme-balham  .ag-row-selected .ag-cell {
    color: #fff;
  }

  .ag-theme-balham  .ag-row-selected .ag-cell .ag-cell-editor {
    color: #000;
  }

  .ag-theme-balham .ag-select .ag-picker-field-wrapper {
    color: #000;
  }
`;

export interface DivRowProps {
  wd?: string | any;
  hg?: string;
  pd?: string;
  bc?: string;
}
export const DivRow = styled.div<DivRowProps>`
  width: 100%;
  height: ${(props) => (props.hg ? props.hg : "auto")};
  padding: ${(props) => (props.pd ? props.pd : "auto")};
  
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  //flex-wrap: wrap;

  //border: 1px solid #000000;
  //background-color:${(props) => (props.bc ? props.bc :  '#fff')};
`;

export interface DivColProps {
  wd?: string;
  hg?: string;
  align?: string;
  mg?: string;
  pd?: string;
  bdr?: string;
  bc?: string;
}
export const DivCol = styled.div<DivColProps>`
  width: ${(props) => (props.wd ? props.wd : "100%")};
  //height: ${(props) => (props.hg ? props.hg : "auto")};
  padding: ${(props) => (props.pd ? props.pd : "auto")};
  //margin: ${(props) => (props.mg ? props.mg : "auto")};
  //flex: 0 0 ${(props) => props.wd};
  //text-align: ${(props) => (props.align ? props.align : "auto")};
  //border-right: ${(props) => (props.bdr === "true" ? "1px solid #000000" : "none")};

  //display: flex;
  //justify-content: center;

  //border: 1px solid #000000;
  //background-color:${(props) => (props.bc ? props.bc :  '#fff')};
`;

export interface AreaCompProps {
  wd?: string;
  hg?: string;
  ml?: string;
  algItem?: string;
  mgTop?: string;
  inputAlg?: string;
  inputSize?: string;
  bc?: string;
}

export const AreaComp = styled.div<AreaCompProps>`
  width: ${(props) => (props.wd ? props.wd : "100%")};
  height: ${(props) => (props.hg ? props.hg : "40%")};
  margin-left: ${(props) => (props.ml ? props.ml : "1px")};
  margin-top: ${(props) => (props.mgTop ? props.mgTop : "1px")};
  padding: 5px;

  display: flex;
  flex-direction: column;
  //flex-wrap: wrap;
  justify-content: center;
  justify-items: left;
  align-items: ${(props) => (props.algItem ? props.algItem : "flex-start")};

  //background-color: ${(props) => (props.bc ? props.bc : "#fff")};;


  input {
    width: ${(props) => (props.inputSize ? props.inputSize : "10vh")};
    text-align: ${(props) => (props.inputAlg ? props.inputAlg : "left")};
    height: 20px;

    background: transparent;
    border-radius: 0.4rem;
    border: 0;
    padding: 1px;
  }

  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  input[type="number"] {
    -moz-appearance: textfield;
    appearance: textfield;
  }
  
  select {
    width: 100%;
    height: 28px;
    padding: 0 0.5rem;

    color: #000000;
    //background-color: #61098a;

    border-radius: 0.4rem;
    border: 1px solid #61098a;
  }

  label {
    margin-left: 2px;
    color: #000000;
  }

  h1 {
    width: 100%;
    font-weight: 700;
    font-size: 14px;
    color: #fa7d00;
  }
  h2 {
    width: 100%;
    text-align: center;
    display: block;
    font-size: 16px;
    font-weight: bold;
    color: #61098a;
  }
  h3 {
    width: 100%;
    text-align: right;
    display: block;
    font-size: 14px;
    font-weight: bold;
    color: #61098a;
  }

  //border: 1px solid #000000;
`;

export const Divider = styled.div`
  //margin-bottom: 20px;
  height: 1px;
  width: 100%;
  padding: 1px;

  background: #500569;
`;

export const Scroll = styled(PerfectScrollbar)`
  width: 100%;
  padding-bottom: 15px;
  padding-right: 8px;
  overflow: -moz-scrollbars-vertical;

  ::-webkit-scrollbar-thumb {
    background: rgba(98, 9, 139, 0.5) !important;
  }

  ::-webkit-scrollbar {
    background: transparent;
  }

  .ps__thumb-y {
    background-color: rgba(98, 9, 139, 0.5) !important;
  }

  .ps__rail-y {
    display: block !important;
    opacity: 1 !important;
  }

  .ps__rail-x {
    display: block !important;
    opacity: 1 !important;
  }

  .ps__thumb-x {
    background-color: rgba(98, 9, 139, 0.5) !important;
  }
`;


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