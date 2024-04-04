import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
// import Icon from "../../components/Icon";
import Image from "next/image";

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
      className="m-2 mb-5 flex flex-col"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <PrismicNextImage
        field={slice.primary.logo}
        className="box-content"
        width={100}
        height={100}
        alt=""
      />
      {/* <h1>{slice.primary.website_title}</h1> */}
    </section>
  );
};

export default Header;
