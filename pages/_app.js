import Link from "next/link";
import { PrismicProvider } from "@prismicio/react";
import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "../prismicio";
import "../styles/globals.css";

const richTextComponents = {
  heading1: ({ children }) => (
    <h1 className="text-base font-bold mb-6">{children}</h1>
  ),
  paragraph: ({ children }) => (
    <p className="text-base font-normal max-w-l">{children}</p>
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
    </PrismicProvider>
  );
}
