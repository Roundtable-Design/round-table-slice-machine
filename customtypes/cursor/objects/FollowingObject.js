import { motion } from "framer-motion";
import { useRef } from "react";

export default function FollowingObject(props) {
  const divRef = useRef(null);

  return (
    <motion.div
      ref={divRef}
      className="absolute"
      style={{ top: 0, left: 0, position: "absolute" }}
      initial={{ scale: 0, x: props.x, y: props.y }}
      animate={{ scale: 1, x: props.x - 20, y: props.y - 20 }}
      transition={{
        x: { duration: props.movingSpeed },
        y: { duration: props.movingSpeed },
        scale: { duration: props.movingSpeed },
      }}
      onUpdate={(latest) => {
        // latest.x, latest.y are the current animated values
        // Report back to parent
        if (props.onObjectUpdate) {
          const currentX = latest.x + 20; // Reverse the offset we applied in animate
          const currentY = latest.y + 20;
          props.onObjectUpdate(props.id, currentX, currentY);
        }
      }}
    >
      <motion.svg
        initial={{ rotate: 0 }}
        animate={{ scale: [1, 0.6, 1], rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: props.rotationSpeed,
          ease: "easeInOut",
        }}
        width={props.width}
        height={props.height}
        viewBox={props.viewBox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute"
      >
        {props.paths.map((pathData, index) => (
          <motion.path
            key={index}
            exit={{ scale: 0 }}
            d={pathData}
            fill={props.fill}
          />
        ))}
      </motion.svg>
    </motion.div>
  );
}
