import Link from "next/link";
import { PrismicProvider } from "@prismicio/react";
import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "../prismicio";
import "../styles/globals.css";
import Script from "next/script";

const richTextComponents = {
  heading1: ({ children }) => (
    <h1 className="lg:text-lg text-base dark:text-white  font-medium mb-6">
      {children}
    </h1>
  ),
  heading2: ({ children }) => (
    <h2 className="lg:text-lg text-base dark:text-white font-medium mb-6">
      {children}
    </h2>
  ),
  heading3: ({ children }) => (
    <h3 className="lg:text-lg text-base dark:text-white font-medium mb-6">
      {children}
    </h3>
  ),
  heading4: ({ children }) => (
    <h4 className="lg:text-lg text-base dark:text-white font-medium mb-6">
      {children}
    </h4>
  ),
  heading5: ({ children }) => (
    <h5 className="lg:text-lg text-base dark:text-white font-medium mb-6">
      {children}
    </h5>
  ),
  heading6: ({ children }) => (
    <h6 className="lg:text-lg text-base dark:text-white font-medium mb-6">
      {children}
    </h6>
  ),
  paragraph: ({ children }) => (
    <p className="lg:text-lg text-base dark:text-white font-normal max-w-l">
      {children}
    </p>
  ),
};

/**
 * PrismicProvider distributes settings throughout your app.
 *
 * PrismicPreview enables previews.
 */

export default function App({ Component, pageProps }) {
  return (
    <PrismicProvider
      internalLinkComponent={(props) => <Link {...props} />}
      richTextComponents={richTextComponents}
    >
      <PrismicPreview repositoryName={repositoryName}>
        <Component {...pageProps} />
      </PrismicPreview>
      <Script
        src="https://widget.clutch.co/static/js/widget.js"
        strategy="afterInteractive"
      />
    </PrismicProvider>
  );
}
