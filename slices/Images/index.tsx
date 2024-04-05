import { Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";
/**
 * Props for `Images`.
 */
export type ImagesProps = SliceComponentProps<Content.ImagesSlice>;

/**
 * Component for "Images" Slices.
 */
const Images = ({ slice }: ImagesProps): JSX.Element => {
  const videoUrl = slice.primary.video;
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="grid gap-2 grid-cols-2 grid-rows-2 m-2 pb-[116px]"
    >
      {slice?.items?.map((item, i) => (
        <div key={i} className="relative w-full pt-[100%]">
          <PrismicNextImage
            field={item.image}
            className="grayscale transition filter duration-500 hover:grayscale-0 absolute top-0 left-0 w-full h-full object-cover"
            width={170}
            height={170}
            alt=""
          />
        </div>
      ))}
      {/* <div className="relative w-full pt-[100%]">
        {slice.primary.video && (
          <video
            className="grayscale transition filter duration-500 hover:grayscale-0 absolute top-0 left-0 w-full h-full object-cover"
            width="170"
            height="170"
            controls // Adds video controls like play, pause, etc.
            src={videoUrl} // The source URL of the video
            alt=""
          >
            Your browser does not support the video tag.
          </video>
        )}
      </div> */}
    </section>
  );
};

export default Images;