import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import Head from 'next/head';
import { useRouter } from 'next/router'
import NProgress from "nprogress";
import PropTypes from 'prop-types';
import * as React from 'react';

import { theme } from 'core/utils'

import '../styles/nprogress.css'

const clientSideEmotionCache = createCache({ key: 'css' });

NProgress.configure({ showSpinner: false });

const MyApp = props => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props, router = useRouter();
  
  const handleRouteChange = (_, { shallow }) => !shallow && NProgress.start();
  const handleRouteComplete = () => NProgress.done();
  const handleRouteError = () => NProgress.done();

  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) jssStyles.parentElement.removeChild(jssStyles);
  }, []);

  React.useEffect(() => {
    router.events.on('routeChangeStart', handleRouteChange)
    router.events.on('routeChangeComplete', handleRouteComplete)
    router.events.on('routeChangeError', handleRouteError)

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
      router.events.off('routeChangeComplete', handleRouteComplete)
      router.events.off('routeChangeError', handleRouteError)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp;
