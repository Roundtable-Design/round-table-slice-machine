import Image from "next/image";

export default function Icon({ src, alt, className, size = 100 }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={`rounded box-content ${className}`}
    />
  );
}
