import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
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
      const items = slice.items;

      // Separate items into images and videos.
      const images = items.filter((item) => item.video?.kind === "image");
      const videos = items.filter((item) => item.video?.kind === "file");

      // Shuffle the arrays.
      const shuffledImages = images.sort(() => 0.5 - Math.random());
      const shuffledVideos = videos.sort(() => 0.5 - Math.random());

      // Select exactly 6 images and 2 videos.
      const selectedImages = shuffledImages.slice(0, 6);
      const selectedVideos = shuffledVideos.slice(0, 2);

      // Combine and shuffle the final selection.
      const finalSelection = [...selectedImages, ...selectedVideos].sort(
        () => 0.5 - Math.random()
      );

      setRandomVideos(finalSelection);
      console.log({ finalSelection });
    }
  }, [slice]);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="grid gap-2 grid-cols-2 m-2 lg:m-5 pb-[116px] lg:grid-cols-4"
    >
      {randomVideos.map((item, i) => {
        const isVideo = item.video?.kind === "file";
        const isImage = item.video?.kind === "image";

        return (
          <div className="relative w-full pt-[100%]" key={i}>
            {hasUrl(item.video) && isVideo && (
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
            {hasUrl(item.video) && isImage && (
              <div className="" key={i}>
                <PrismicNextImage
                  field={{
                    url: item.video.url,
                    alt: item.video.name || "",
                    dimensions: {
                      width: Number(item.video.width) || 750,
                      height: Number(item.video.height) || 170,
                    },
                  }}
                  imgixParams={{ auto: undefined, fit: "max", w: 750 }}
                  className="grayscale transition filter duration-500 hover:grayscale-0 absolute top-0 left-0 w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        );
      })}
    </section>
  );
};

export default Videos;
