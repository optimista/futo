'use client';

import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { useServerInsertedHTML } from 'next/navigation';
import NProgress from "nprogress";
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

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
  const [cache] = useState(() => {
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

const RootLayout = ({ children }) => {
  // This is a temporary fix for `beforeUnload` and NProgress because router.events do not exist in NextJS v13
  let didRunOnceInStrictMode = false;
  useEffect(() => {
    if (!didRunOnceInStrictMode) {
      didRunOnceInStrictMode = true;
      NProgress.configure({ showSpinner: false });

      const handleAnchorClick = e => { if (e.currentTarget.href !== window.location.href) NProgress.start(); }

      const handleMutation = () => {
        const anchorElements = document.querySelectorAll('a[href]');
        anchorElements.forEach(anchor => anchor.addEventListener('click', handleAnchorClick));
      };

      const mutationObserver = new MutationObserver(handleMutation);
      mutationObserver.observe(document, { childList: true, subtree: true });

      window.history.pushState = new Proxy(window.history.pushState, {
        apply: (target, thisArg, argArray) => {
          NProgress.done();
          return target.apply(thisArg, argArray);
        },
      });
    }
  }, []);

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
