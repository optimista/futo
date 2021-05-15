import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import Head from 'next/head';
import Router from 'next/router'
import NProgress from "nprogress";
import PropTypes from 'prop-types';
import * as React from 'react';

import { theme } from 'utils'

import '../styles/nprogress.css'

export const cache = createCache({ key: 'css', prepend: true });

NProgress.configure({ showSpinner: false });
Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

const MyApp = props => {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) { jssStyles.parentElement.removeChild(jssStyles); }
  }, []);

  return (
    <CacheProvider value={cache}>
      <Head>
        <title>My page</title>
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
  pageProps: PropTypes.object.isRequired,
};

export default MyApp;
