import type { AppProps } from "next/app";
import '../../styles/globals.scss'
import { AuthProvider } from "../contexts/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import 'ag-grid-community/dist/styles/ag-grid.css';

import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';
//import '@ag-grid-community/styles/ag-theme-quartz.css'
//import 'ag-grid-community/dist/styles/ag-theme-alpine.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthProvider>
        <Component {...pageProps} />
        <ToastContainer autoClose={3000} theme="colored" />
      </AuthProvider>
    </>
  );
}
