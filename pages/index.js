import Head from "next/head";
import { SliceZone } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";

import { createClient } from "../prismicio";
import { components } from "../slices/";

import DarkModeToggle from "../components/DarkModeToggle";
import CursorEffect from "../customtypes/cursor/CursorEffect";

/**
 * This component renders your homepage.
 *
 * Use Next's Head component to render page metadata.
 *
 * Use the SliceZone to render the content of the page.
 */
export default function Index({ page }) {
  return (
    <main>
      
      <Head>
      
        <title>{prismicH.asText(page.data.title)}</title>
        
      </Head>
      <div className="min-h-screen bg-white dark:bg-gray-950">
        <header className="pointer-events-none fixed z-10 mix-blend-difference" >
          <CursorEffect />
        </header>
        <header className="p-4">
          <DarkModeToggle />
        </header>
        <SliceZone slices={page.data.slices} components={components} />
        
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

  return {
    props: {
      page, 
    },
  };
}
