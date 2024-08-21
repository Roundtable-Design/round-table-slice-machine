import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import CursorEffect from "@/customtypes/cursor/CursorEffect";
/**
 * Props for `Header`.
 */
export type HeaderProps = SliceComponentProps<Content.HeaderSlice>;

/**
 * Component for "Header" Slices.
 */
const Header = ({ slice }: HeaderProps): JSX.Element => {
  return (
    <section
      className="m-2 mb-5 flex flex-col lg:m-5 mix-blend-difference"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      
      <div className="lg:ml-8 lg:mt-8 ml-7 mt-7 box-content">
        <PrismicNextImage
          field={slice.primary.logo}
          className="block dark:hidden"
          width={43}
          height={43}
          alt=""
        />
        <PrismicNextImage
          field={slice.primary.logo_dark_mode}
          className="hidden dark:block"
          width={43}
          height={43}
          alt=""
        />
      </div>
      <h1 className="lg:text-lg font-medium text-basefont-medium text-base black dark:white ml-3">
        {slice.primary.website_title}
      </h1>
      <CursorEffect />
    </section>
  );
};

export default Header;
