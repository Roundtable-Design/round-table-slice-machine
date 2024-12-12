import Head from "next/head";
import { SliceZone } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";

import { createClient } from "../prismicio";
import { components } from "../slices/";

import DarkModeToggle from "../components/DarkModeToggle";
import CursorEffect from "../customtypes/cursor/CursorEffect";
import Footer from "../components/Footer";

/**
 * This component renders your homepage.
 *
 * Use Next's Head component to render page metadata.
 *
 * Use the SliceZone to render the content of the page.
 */
export default function Index({ page, footer }) {
  console.log(footer);

  return (
    <main>
      <Head>
        <title>{prismicH.asText(page.data.title)}</title>
      </Head>
      <div className="min-h-full bg-white dark:bg-black">
        {/* Cursor Effect */}
        <header className="pointer-events-none fixed z-10 mix-blend-difference">
          <CursorEffect />
        </header>
        {/* Dark Mode Toggle */}
        <header className="p-4">
          <DarkModeToggle />
        </header>
        {/* Page Content */}
        <SliceZone slices={page.data.slices} components={components} />
        {/* Global Footer */}
        <Footer data={footer.data} />
      </div>
    </main>
  );
}

export async function getStaticProps({ previewData }) {
  /**
   * The client queries content from the Prismic API
   */
  const client = createClient({ previewData });

  const page = await client.getByUID("page", "home");
  const footer = await client.getSingle("footer");

  return {
    props: {
      page,
      footer,
    },
  };
}
