import { motion } from "framer-motion";
import useMousePosition from "../utils/useMousePosition";

export default function LeavesObject({ x, y, svgData }) {
  return (
    <motion.div
      initial={{ scale: 0, x: x, y: y }}
      animate={{ scale: 2.5, x: x - 20, y: y - 20 }}
      transition={{ duration: 0.15 }}
    >
      <motion.svg
        initial={{ rotate: 0 }}
        animate={{ scale: [1, 0.6, 1], rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
        width="40"
        height="43"
        viewBox="0 0 40 43"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute"
      >
        {svgData.paths.map((path, index) => (
          <motion.path
            key={index}
            exit={{ scale: 0 }}
            d={path}
            fill="#FFFFFF"
          />
        ))}
        {/* <motion.path
          exit={{ scale: 0 }}
          d="M0.267765 29.1434C-1.74922 17.1797 8.12317 6.96229 13.3115 3.34903C15.5108 1.63729 15.7591 3.77006 16.0894 5.48434C16.4197 7.19863 16.3074 30.5512 15.4533 35.6546C14.5992 40.7581 11.2667 41.7522 10.6121 41.9021C9.95745 42.0521 2.789 44.0979 0.267765 29.1434Z"
          fill="#FFFFFF"
        />
        <motion.path
          exit={{ scale: 0 }}
          d="M39.9811 27.5583C40.5313 14.6595 28.9524 4.21722 23.0942 0.608441C20.5877 -1.11398 20.6051 1.17999 20.4834 3.03032C20.3616 4.88064 23.4956 29.8581 25.0425 35.2756C26.5894 40.6931 30.1808 41.5918 30.8804 41.7198C31.58 41.8478 39.2933 43.6817 39.9811 27.5583Z"
          fill="#FFFFFF"
        /> */}
      </motion.svg>
    </motion.div>
  );
}
