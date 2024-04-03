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
    <section className="py-10 px-10 flex flex-row gap-4">
      <div className="flex-1">
        <h1>{slice.primary.title_text}</h1>
        <div className="mb-10">
          <PrismicRichText field={slice.primary.description} />
        </div>
      </div>

      <div className="flex-1">
        <h1>{slice.primary.second_title_text}</h1>
        <PrismicRichText field={slice.primary.secondary_description} />
        <h1>{slice.primary.button_text}</h1>
        <PrismicRichText field={slice.primary.button_description} />
      </div>
    </section>
  );
};

export default ServicesTeam;
