import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import React, { useRef } from "react";
/**
 * Props for `Videos`.
 */
export type VideosProps = SliceComponentProps<Content.VideosSlice>;

/**
 * Type guard to check if a link field has a URL
 */
const hasUrl = (video: any): video is { url: string } => {
  return video && typeof video.url === "string";
};

/**
 * Component for "Videos" Slices.
 */
const Videos = ({ slice }: VideosProps): JSX.Element => {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [randomVideos, setRandomVideos] = React.useState<
    Content.VideosSlice["items"]
  >([]);

  const handleMouseEnter = (index: number) => {
    videoRefs.current[index]?.play();
  };

  const handleMouseLeave = (index: number) => {
    videoRefs.current[index]?.pause();
  };

  React.useEffect(() => {
    if (slice?.items?.length > 0) {
      // Shuffle the items array and select the first 2 items
      const shuffledItems = slice.items.sort(() => 0.5 - Math.random());
      const selectedItems = shuffledItems.slice(0, 4);
      setRandomVideos(selectedItems);
    }
  }, [slice]);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="grid gap-2 grid-cols-2 m-2 pb-[116px] lg:grid-cols-4"
    >
      {randomVideos.map((item, i) => (
        <div className="relative w-full pt-[100%]">
          {hasUrl(item.video) && (
            <video
              ref={(el) => {
                videoRefs.current[i] = el;
              }}
              src={item.video.url}
              className="grayscale transition filter duration-500 hover:grayscale-0 absolute top-0 left-0 w-full h-full object-cover"
              width="750"
              height="170"
              loop
              muted
              playsInline
              onMouseEnter={() => handleMouseEnter(i)}
              onMouseLeave={() => handleMouseLeave(i)}
            >
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      ))}
    </section>
  );
};

export default Videos;
