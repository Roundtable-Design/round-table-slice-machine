import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import React, { useRef } from "react";
/**
 * Custom type for media fields based on observed API response.
 * Adjust this to match the actual fields you receive for media items.
 */
interface ExtendedMediaField {
  url: string;
  link_type: "Media";
  kind?: "image" | "file";
  width?: string;
  height?: string;
  // If 'name' exists in your API responses, keep this. Otherwise remove it.
  name?: string;
  // Add other fields if needed, like 'size', etc.
}

/**
 * Props for `Videos`.
 */
export type VideosProps = SliceComponentProps<Content.VideosSlice>;

/**
 * Type guard to check if a link field has a URL.
 */
const hasUrl = (video: any): video is { url: string } => {
  return video && typeof video.url === "string";
};

const extractPosterFromVideo = (videoUrl: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.src = videoUrl;
    video.crossOrigin = "anonymous";
    video.currentTime = 1; // Seek to 1 second

    video.addEventListener("loadeddata", () => {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");

      video.addEventListener("seeked", () => {
        if (context) {
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          const posterUrl = canvas.toDataURL("image/jpeg");
          resolve(posterUrl);
        } else {
          reject("Canvas context is not available.");
        }
      });
    });

    video.addEventListener("error", () => {
      reject("Failed to load video for poster extraction.");
    });
  });
};

const Videos = ({ slice }: VideosProps): JSX.Element => {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [randomVideos, setRandomVideos] = React.useState<
    Content.VideosSlice["items"]
  >([]);
  const [posters, setPosters] = React.useState<Record<number, string>>({});

  const handleMouseEnter = (index: number) => {
    videoRefs.current[index]?.play();
  };

  const handleMouseLeave = (index: number) => {
    videoRefs.current[index]?.pause();
  };

  React.useEffect(() => {
    if (slice?.items?.length > 0) {
      // Assume the items come with `video` that matches ExtendedMediaField or can be casted to it
      const items = slice.items.map((item) => {
        const video = item.video as ExtendedMediaField;
        return { ...item, video };
      });

      const images = items.filter((item) => item.video.kind === "image");
      const videos = items.filter((item) => item.video.kind === "file");

      const shuffledImages = images.sort(() => 0.5 - Math.random());
      const shuffledVideos = videos.sort(() => 0.5 - Math.random());

      const selectedImages = shuffledImages.slice(0, 6);
      const selectedVideos = shuffledVideos.slice(0, 2);

      const finalSelection = [...selectedImages, ...selectedVideos].sort(
        () => 0.5 - Math.random()
      );
      setRandomVideos(finalSelection);

      // Extract posters for videos
      selectedVideos.forEach((item, index) => {
        if (hasUrl(item.video)) {
          extractPosterFromVideo(item.video.url)
            .then((posterUrl) => {
              setPosters((prev) => ({ ...prev, [index]: posterUrl }));
            })
            .catch(() => {
              setPosters((prev) => ({ ...prev, [index]: "/posters/bfl.png" })); // Fallback poster
            });
        }
      });
    }
  }, [slice]);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="grid gap-2 grid-cols-2 m-2 lg:m-5 pb-[116px] lg:grid-cols-4"
    >
      {randomVideos.map((item, i) => {
        const video = item.video as ExtendedMediaField;
        const isVideo = video.kind === "file";
        const isImage = video.kind === "image";

        return (
          <div className="relative w-full pt-[100%]" key={i}>
            {hasUrl(video) && isVideo && (
              <video
                ref={(el) => {
                  videoRefs.current[i] = el;
                }}
                src={video.url}
                className="grayscale transition filter duration-500 hover:grayscale-0 absolute top-0 left-0 w-full h-full object-cover"
                loop
                muted
                playsInline
                poster={posters[i]}
                // || "/posters/bfl.png"
                crossOrigin="anonymous"
                onMouseEnter={() => handleMouseEnter(i)}
                onMouseLeave={() => handleMouseLeave(i)}
              >
                Your browser does not support the video tag.
              </video>
            )}
            {hasUrl(video) && isImage && (
              <PrismicNextImage
                field={
                  {
                    url: video.url,
                    alt: video.name ?? "",
                    dimensions: {
                      width: Number(video.width) || 750,
                      height: Number(video.height) || 170,
                    },
                    edit: null,
                    copyright: "",
                  } as any
                }
                imgixParams={{ auto: undefined, fit: "max", w: 750, h: 170 }}
                width={750}
                height={170}
                priority
                className="grayscale transition filter duration-500 hover:grayscale-0 absolute top-0 left-0 w-full h-full object-cover"
              />
            )}
          </div>
        );
      })}
    </section>
  );
};

export default Videos;
