'use client';

import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { useServerInsertedHTML } from 'next/navigation';
import { usePathname, useSearchParams } from 'next/navigation'
import NProgress from "nprogress";
import PropTypes from 'prop-types';
import * as React from 'react';

import { theme } from 'core/utils'
import { LocaleProvider } from 'core/utils/i18n'

import '../styles/nprogress.css'

const isBrowser = typeof document !== 'undefined';

// On the client side, Create a meta tag at the top of the <head> and set it as insertionPoint.
// This assures that MUI styles are loaded first.
// It allows developers to easily override MUI styles with other styling solutions, like CSS modules.
const createEmotionCache = () => {
  let insertionPoint;

  if (isBrowser) {
    const emotionInsertionPoint = document.querySelector('meta[name="emotion-insertion-point"]');
    insertionPoint = emotionInsertionPoint ?? undefined;
  }

  return createCache({ key: 'mui-style', insertionPoint });
}

const RootStyleRegistry = ({ children }) => {
  const [cache] = React.useState(() => {
    const c = createEmotionCache();
    c.compat = true;
    return c;
  });

  useServerInsertedHTML(() => {
    return (
      <style
        data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(' ')}`}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: Object.values(cache.inserted).join(' '),
        }}
      />
    );
  });

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}

RootStyleRegistry.propTypes = {
  children: PropTypes.node,
};

NProgress.configure({ showSpinner: false });

const RootLayout = ({ children }) => {
  const pathname = usePathname(), searchParams = useSearchParams()

  React.useEffect(() => {
    NProgress.done();
    return () => { NProgress.start(); };
  }, [pathname, searchParams]);

  return (
    <html lang="en">
      <head>
        <meta name="emotion-insertion-point" content="" />
      </head>
      <body>
        <RootStyleRegistry>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <LocaleProvider>{children}</LocaleProvider>
          </ThemeProvider>
        </RootStyleRegistry>
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node,
};

export default RootLayout;
