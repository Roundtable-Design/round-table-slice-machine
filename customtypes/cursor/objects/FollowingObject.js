import { motion } from "framer-motion";

export default function FollowingObject(props) {
  return (
    <motion.div
      className="h-20 w-20"
      initial={{ scale: 0, x: props.x, y: props.y }}
      animate={{ scale: 1, x: props.x - 20, y: props.y - 20 }}
      transition={{
        x: props.converging
          ? {
              type: "spring",
              stiffness: 50,
              damping: 20,
            }
          : { duration: props.movingSpeed },
        y: props.converging
          ? {
              type: "spring",
              stiffness: 50,
              damping: 20,
            }
          : { duration: props.movingSpeed },
        scale: { duration: props.movingSpeed },
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
            fill="#FFFFFF"
          />
        ))}
      </motion.svg>
    </motion.div>
  );
}
