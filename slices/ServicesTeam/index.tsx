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

/* Slide down animation */

const ServicesTeam = ({ slice }: ServicesTeamProps): JSX.Element => {
  const [showRichText, setShowRichText] = React.useState(false);
  const [rotateSVG, setRotateSVG] = React.useState("");

  const animationClass = !showRichText
    ? "animate-fadeOutSlideUp"
    : "animate-fadeInSlideDown";

  const toggleRichText = () => {
    if (!showRichText) {
      setShowRichText(true);
      setRotateSVG("rotate-90");
    } else {
      setRotateSVG("rotate-0");
      // setTimeout(() => setShowRichText(false), 750);
      setShowRichText(false);
    }
  };

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="flex flex-row gap-4 m-2 lg:m-5"
    >
      <div className="w-1/2">
        <h6 className="lg:text-lg text-base font-medium max-w-l">
          {slice.primary.title_text}
        </h6>
        <PrismicRichText field={slice.primary.description} />
      </div>

      <div className="w-1/2">
        <div className="mb-2">
          <h6 className="lg:text-lg text-base font-medium max-w-l">
            {slice.primary.second_title_text}
          </h6>
          <PrismicRichText field={slice.primary.secondary_description} />
        </div>

        <div className="mb-2">
          <button
            className="lg:text-lg text-base font-medium max-w-l flex items-center justify-center gap-1 mix-blend-difference"
            onClick={toggleRichText}
          >
            {slice.primary.button_text}
            <svg
              width="12"
              height="12"
              className={`align-middle mt-1 hover:rotate-90 duration-500 ${rotateSVG}`}
              viewBox="0 0 8 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.47623 0.968857L3.82307 0.613007C3.96993 0.462331 4.2074 0.462331 4.3527 0.613007L7.38986 3.7275C7.53671 3.87818 7.53671 4.12182 7.38986 4.2709L4.3527 7.38699C4.20584 7.53767 3.96836 7.53767 3.82307 7.38699L3.47623 7.03114C3.32781 6.87886 3.33093 6.63041 3.48248 6.48134L5.36508 4.64117H0.874958C0.667169 4.64117 0.5 4.46966 0.5 4.25647V3.74353C0.5 3.53034 0.667169 3.35883 0.874958 3.35883H5.36508L3.48248 1.51866C3.32937 1.36959 3.32625 1.12114 3.47623 0.968857Z"
                fill="currentColor"
                // className="fill-black dark:fill-white"
              />
            </svg>
          </button>
          {showRichText && (
            <div className={`${animationClass} overflow-hidden`}>
              <PrismicRichText field={slice.primary.button_description} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ServicesTeam;
