import { Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";
import React, { useRef } from "react";

/**
 * Props for `Images`.
 */
export type ImagesProps = SliceComponentProps<Content.ImagesSlice>;

/**
 * Component for "Images" Slices.
 */
const Images = ({ slice }: ImagesProps): JSX.Element => {
  const [randomImages, setRandomImages] = React.useState<
    Content.ImagesSlice["items"]
  >([]);

  React.useEffect(() => {
    if (slice?.items?.length > 0) {
      const shuffledItems = slice.items.sort(() => 0.5 - Math.random());
      const selectedItems = shuffledItems.slice(0, 2);
      setRandomImages(selectedItems);
    }
  }, [slice]);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="grid gap-2 grid-cols-2 m-2 "
      // grid-rows-2 pb-[116px]
    >
      {randomImages.map((item, i) => (
        <div key={i} className="relative w-full pt-[100%]">
          <PrismicNextImage
            field={item.image}
            imgixParams={{ auto: undefined, fit: "max", w: 750 }}
            className="grayscale transition filter duration-500 hover:grayscale-0 absolute top-0 left-0 w-full h-full object-cover"
            width={750}
            height={170}
            alt=""
          />
        </div>
      ))}
    </section>
  );
};

export default Images;
