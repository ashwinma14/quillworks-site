import Document, { Head, Html, Main, NextScript } from 'next/document';

import { AppConfig } from '../utils/AppConfig';

// Need to create a custom _document because i18n support is not compatible with `next export`.
class MyDocument extends Document {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <Html lang={AppConfig.locale}>
        <Head>
          {/* Critical font preload for above-the-fold Hero section */}
          <link
            rel="preload"
            href="/fonts/instrument-serif-400-latin-6zUTjg.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <script
            defer
            data-domain="quillworks-site.vercel.app"
            src="https://plausible.io/js/script.js"
          ></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
