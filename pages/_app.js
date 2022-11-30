import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/global.scss'
import "antd/dist/antd.css";
import { AuthProvider } from '../store/context/authContext'
import { GlobalState } from '../store/context/globalState';
import Script from 'next/script';
import { ContainerProvider } from '../utils/container';

export default function App({Component, pageProps}) {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"/>
        <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css"/>
        <script src="https://js.paystack.co/v1/inline.js"></script>
      </Head>    
      <AuthProvider>
        <GlobalState>
          <ContainerProvider>
            <Component {...pageProps} /> 
          </ContainerProvider>
        </GlobalState>
      </AuthProvider>
    </>
  )
}