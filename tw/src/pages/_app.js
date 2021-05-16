import Router from 'next/router';
import NProgress from "nprogress";

import 'tailwindcss/tailwind.css'
import '../styles/nprogress.css'

NProgress.configure({ showSpinner: false });
Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

const MyApp = ({ Component, pageProps }) => <Component {...pageProps} />

export default MyApp; 
