import React from 'react';
import { AppProps } from 'next/app';

// If you have global CSS, it should be imported here
import '../styles/global.css';

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }: AppProps) {
  // You can include global components here like headers or footers that you want to display on all pages
  return <Component {...pageProps} />;
}
