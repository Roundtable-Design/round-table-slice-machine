import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script
          type="text/javascript"
          src="https://widget.clutch.co/static/js/widget.js"
          async
        ></script>
      </Head>
      <body>
        <Main />
        <div
          className="w-full bg-white p-2 clutch-widget dark:bg-black"
          data-url="https://widget.clutch.co"
          data-widget-type="2"
          data-height="45"
          data-nofollow="true"
          data-expandifr="true"
          data-clutchcompany-id="2017780"
        ></div>
        <NextScript />
      </body>
    </Html>
  );
}
