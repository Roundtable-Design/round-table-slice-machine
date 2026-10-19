import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="google-site-verification" content="7DkIWCYB2-_O5Ou64E0NTMkt1WW0NIH5Cd6apQzz_eo" />
        <script
          type="text/javascript"
          src="https://widget.clutch.co/static/js/widget.js"
          async
        ></script>
      </Head>
      <body>
        <Main />
        <NextScript />
        <div className="w-full bg-black dark:bg-black flex justify-stretch md:justify-end p-2 lg:p-5">
          <div
            className="w-full md:w-auto bg-white p-2 rounded clutch-widget"
            data-url="https://widget.clutch.co"
            data-widget-type="2"
            data-height="45"
            data-nofollow="true"
            data-expandifr="true"
            data-clutchcompany-id="2017780"
          ></div>
        </div>
      </body>
    </Html>
  );
}
