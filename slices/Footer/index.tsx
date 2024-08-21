import { Content } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Script from "next/script";
import React, { useEffect } from "react";

/**
 * Props for `Footer`.
 */
export type FooterProps = SliceComponentProps<Content.FooterSlice>;

/**
 * Component for "Footer" Slices.
 */
const Footer = ({ slice }: FooterProps): JSX.Element => {
  useEffect(() => {
    // Create a script element
    const script = document.createElement("script");
    script.src = "https://widget.clutch.co/static/js/widget.js";
    script.async = true;

    // Append the script to the body
    document.body.appendChild(script);

    // Perform cleanup by removing the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []); // Empty dependency array means this effect runs once on mount
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="flex flex-col-reverse md:flex-row justify-between gap-4 bg-black text-white p-2 lg:p-5"
    >
      
      <div className="w-full">
        <h6 className="lg:text-lg text-base font-medium max-w-l ">
          {slice.primary.title}
        </h6>
        <PrismicRichText field={slice.primary.description} />
        <div className="mt-2 flex flex-col">
          <PrismicNextLink field={slice.primary.privacy_link}>
            Privacy policy
          </PrismicNextLink>
          <PrismicNextLink field={slice.primary.cookie_link}>
            Cookie policy
          </PrismicNextLink>
        </div>
      </div>

      <div className="w-auto h-auto">
        <div
          className="w-full clutch-widget bg-white p-1 rounded "
          data-url="https://widget.clutch.co"
          data-widget-type="2"
          data-height="45"
          data-nofollow="true"
          data-expandifr="true"
          data-scale="100"
          data-clutchcompany-id="2017780"
        ></div>
      </div>
    </section>
  );
};

export default Footer;
