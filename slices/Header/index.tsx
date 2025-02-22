import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
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
      className="m-2 mb-5 flex flex-col lg:m-5"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="lg:ml-8 lg:mt-8 ml-7 mt-7 box-content">
        <PrismicNextImage
          field={slice.primary.logo}
          className="block dark:hidden"
          style={{ width: "43px", height: "auto" }}
          alt=""
        />
        <PrismicNextImage
          field={slice.primary.logo_dark_mode}
          className="hidden dark:block"
          style={{ width: "43px", height: "auto" }}
          alt=""
        />
      </div>
      <h1 className="lg:text-lg font-medium text-basefont-medium text-base black dark:text-white text-black ml-3">
        {slice.primary.website_title}
      </h1>
    </section>
  );
};

export default Header;
