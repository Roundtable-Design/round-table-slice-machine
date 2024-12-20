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
  name?: string;
}

export type VideosProps = SliceComponentProps<Content.VideosSlice>;

const hasUrl = (video: any): video is { url: string } => {
  return video && typeof video.url === "string";
};

const extractPosterFromVideo = (videoUrl: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (typeof document === "undefined") {
      // If we are not in the browser, reject immediately.
      return reject("Not in browser environment.");
    }

    console.log("Attempting to extract poster from:", videoUrl);

    const video = document.createElement("video");
    video.src = videoUrl;
    video.crossOrigin = "anonymous";

    // Listen when metadata (like duration, videoWidth, videoHeight) is ready
    video.addEventListener("loadedmetadata", () => {
      // Set currentTime after metadata is loaded
      video.currentTime = 1;
    });

    // Once we have a frame loaded
    video.addEventListener("seeked", () => {
      console.log("Video seeked event fired for:", videoUrl);
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const posterUrl = canvas.toDataURL("image/jpeg");
        resolve(posterUrl);
      } else {
        reject("Canvas context is not available.");
      }
    });

    video.addEventListener("error", (e) => {
      console.error("Failed to load video:", videoUrl, e);
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
      if (slice?.items?.length > 0) {
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
        // selectedVideos.forEach((item, index) => {
        //   if (hasUrl(item.video)) {
        //     console.log("Extracting poster for video:", item.video.url);
        //     extractPosterFromVideo(item.video.url)
        //       .then((posterUrl) => {
        //         console.log(
        //           "Poster extracted at index " + index + ": ",
        //           posterUrl
        //         );
        //         setPosters((prev) => ({ ...prev, [index]: posterUrl }));
        //       })
        //       .catch((err) => {
        //         console.warn(
        //           "Failed to extract poster for:",
        //           item.video.url,
        //           err
        //         );
        //         setPosters((prev) => ({
        //           ...prev,
        //           [index]: "/posters/flower.webp",
        //         }));
        //       });
        //   } else {
        //     console.log("No URL found for video at index:", index);
        //   }
        // });
      } else {
        console.log("No items in slice.");
      }
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
                // poster={posters[i]}
                poster={
                  video.name == "PSCI.mp4"
                    ? "/posters/psci.jpeg"
                    : video.name == "Hanbury Hall.mp4"
                      ? "/posters/Hanbury Hall.jpg"
                      : video.name == "Avanos.mp4"
                        ? "/posters/Avanos.jpg"
                        : video.name == "Karibu.mp4"
                          ? "/posters/Karibu.jpg"
                          : "/posters/bfl.png"
                }
                // || "/posters/flower.webp"
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
