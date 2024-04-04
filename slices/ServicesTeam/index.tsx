import { Content } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import React from "react";
/**
 * Props for `ServicesTeam`.
 */
export type ServicesTeamProps = SliceComponentProps<Content.ServicesTeamSlice>;

/**
 * Component for "ServicesTeam" Slices.
 */
const ServicesTeam = ({ slice }: ServicesTeamProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="flex flex-row gap-4 m-2"
    >
      <div className="w-full md:w-1/2">
        <h6 className="font-medium text-base max-w-l tracking-wide">
          {slice.primary.title_text}
        </h6>
        <PrismicRichText field={slice.primary.description} />
      </div>

      <div className="w-full md:w-1/2">
        <div className="mb-2">
          <h6 className="font-medium text-base max-w-l tracking-wide">
            {slice.primary.second_title_text}
          </h6>
          <PrismicRichText field={slice.primary.secondary_description} />
        </div>
        <div className="mb-2">
          <h6 className="font-medium text-base max-w-l tracking-wide">
            {slice.primary.button_text}
          </h6>
          <PrismicRichText field={slice.primary.button_description} />
        </div>
      </div>
    </section>
  );
};

export default ServicesTeam;
