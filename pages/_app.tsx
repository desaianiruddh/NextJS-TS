import Head from 'next/head';
import { Provider } from 'react-redux';
import { AppProps } from 'next/app';

import '../styles/globals.css';
import Layout from '../components/Layout';
import store from '../redux/store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Pizzzzaa...</title>
        <meta name="description" content="online pizza shop" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </>
  );
}

export default MyApp;
