import { Content } from "@prismicio/client";
import {
  SliceComponentProps,
  PrismicRichText,
  JSXMapSerializer,
} from "@prismicio/react";
import {
  FilledContentRelationshipField,
  FilledLinkToWebField,
  FilledLinkToMediaField,
} from "@prismicio/types";
import React from "react";
import LinkIcon from "../../assets/icons/link.svg";
/**
 * Props for `ServicesTeam`.
 */
export type ServicesTeamProps = SliceComponentProps<Content.ServicesTeamSlice>;

/**
 * Custom serializer for rich text links.
 */
const customLinkSerializer: JSXMapSerializer = {
  hyperlink: ({ children, node }) => {
    const isWebLink = (link: any): link is FilledLinkToWebField =>
      link.link_type === "Web";
    const isMediaLink = (link: any): link is FilledLinkToMediaField =>
      link.link_type === "Media";

    const url = node.data?.url;
    const target =
      isWebLink(node.data) && node.data.target ? node.data.target : undefined;

    return (
      <a
        href={url}
        target={target}
        className="text-black dark:text-white inline-flex items-center group"
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
      >
        {children}
        <LinkIcon
          className="self-end ml-1 w-5 h-5 text-black dark:text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          width={20}
          height={20}
          alt=""
        />
      </a>
    );
  },
};

/**
 * Component for "ServicesTeam" Slices.
 */

const ServicesTeam = ({ slice }: ServicesTeamProps): JSX.Element => {
  const [showRichText, setShowRichText] = React.useState(false);
  const [rotateSVG, setRotateSVG] = React.useState("");

  const toggleRichText = () => {
    if (!showRichText) {
      setShowRichText(true);
      setRotateSVG("rotate-90");
    } else {
      setRotateSVG("rotate-0");
      setShowRichText(false);
    }
  };

  const animationClass = !showRichText
    ? "animate-fadeOutSlideUp"
    : "animate-fadeInSlideDown";

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="flex flex-row gap-4 m-2 lg:m-5 z-10"
    >
      <div className="w-1/2 dark:text-white text-black">
        <h6 className="lg:text-lg text-base font-medium max-w-l">
          {slice.primary.title_text}
        </h6>
        <PrismicRichText field={slice.primary.description} />
      </div>

      <div className="w-1/2">
        <div className="mb-2 dark:text-white text-black">
          <h6 className="lg:text-lg text-base font-medium max-w-l">
            {slice.primary.second_title_text}
          </h6>
          <PrismicRichText
            field={slice.primary.secondary_description}
            components={customLinkSerializer}
          />
        </div>

        <div className="mb-2">
          <button
            className="lg:text-lg text-base dark:text-white text-black font-medium max-w-l flex items-center justify-center gap-1 group"
            onClick={toggleRichText}
          >
            {slice.primary.button_text}
            <svg
              width="12"
              height="12"
              className={`align-middle mt-1 group-hover:rotate-90 duration-500 ${rotateSVG}`}
              viewBox="0 0 8 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.47623 0.968857L3.82307 0.613007C3.96993 0.462331 4.2074 0.462331 4.3527 0.613007L7.38986 3.7275C7.53671 3.87818 7.53671 4.12182 7.38986 4.2709L4.3527 7.38699C4.20584 7.53767 3.96836 7.53767 3.82307 7.38699L3.47623 7.03114C3.32781 6.87886 3.33093 6.63041 3.48248 6.48134L5.36508 4.64117H0.874958C0.667169 4.64117 0.5 4.46966 0.5 4.25647V3.74353C0.5 3.53034 0.667169 3.35883 0.874958 3.35883H5.36508L3.48248 1.51866C3.32937 1.36959 3.32625 1.12114 3.47623 0.968857Z"
                fill="currentColor"
              />
            </svg>
          </button>
          {showRichText && (
            <div
              id={"slideUpDown"}
              className={`${animationClass} overflow-hidden dark:text-white text-black`}
            >
              <PrismicRichText
                field={slice.primary.button_description}
                components={customLinkSerializer}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ServicesTeam;
