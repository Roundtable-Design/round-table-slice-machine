import { Content } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import React from "react";
// import dynamic from "next/dynamic";

// const ClutchWidget = dynamic(() => import("../components/ClutchWidget"), {
//   ssr: false,
// });

export type FooterProps = Content.FooterDocument;

export default function Footer({ data }: FooterProps) {
  return (
    <footer className="bg-black text-white">
      <div className="flex flex-col-reverse md:flex-row justify-between gap-4 p-2 lg:p-5">
        <div className="w-full">
          <h6 className="lg:text-lg text-base font-medium max-w-l ">
            {data.title}
          </h6>
          <PrismicRichText field={data.description} />
          <div className="mt-2 flex flex-col">
            {data.privacy_link.link_type !== "Any" && (
              <PrismicNextLink field={data.privacy_link}>
                Privacy policy
              </PrismicNextLink>
            )}
            {data.cookie_link.link_type !== "Any" && (
              <PrismicNextLink field={data.cookie_link}>
                Cookie policy
              </PrismicNextLink>
            )}
          </div>
        </div>
        {/* <div suppressHydrationWarning className="w-auto h-auto" id="clutch">
          <ClutchWidget />
        </div> */}
      </div>
    </footer>
  );
}
