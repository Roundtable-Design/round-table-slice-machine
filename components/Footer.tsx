import { Content } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Script from "next/script";
import React, { useEffect } from "react";

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
            <PrismicNextLink field={data.privacy_link}>
              Privacy policy
            </PrismicNextLink>
            <PrismicNextLink field={data.cookie_link}>
              Cookie policy
            </PrismicNextLink>
          </div>
        </div>
        <div className="w-auto h-auto">
          <div
            className="w-full clutch-widget bg-white p-1 rounded"
            data-url="https://widget.clutch.co"
            data-widget-type="2"
            data-height="45"
            data-nofollow="true"
            data-expandifr="true"
            data-scale="100"
            data-clutchcompany-id="2017780"
          ></div>
        </div>
      </div>
    </footer>
  );
}
