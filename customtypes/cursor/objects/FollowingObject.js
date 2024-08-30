import { motion } from "framer-motion";
import useMousePosition from "../utils/useMousePosition";

export default function FollowingObject(props) {
    return (
        <motion.div
            className={`h-20 w-20`}
            initial={{ scale: 0, x: props.x, y: props.y, }}
            animate={{ scale: 1, x: props.x-20, y: props.y-20, }}
            // exit={{ scale: 0 }}
            transition={{ duration: props.movingSpeed }} >
            <motion.svg 
                initial={{ rotate: 0 }}
                animate={{ scale: [1, 0.6, 1], rotate: 360 }}
                transition={{ repeat: Infinity, duration: props.rotationSpeed, ease: "linear" }} 
                width={props.width} height={props.height} viewBox={props.viewBox} fill="none" xmlns="http://www.w3.org/2000/svg"
                className="absolute" >
                <motion.path exit={{ scale: 0 }} d={props.paths[0]} fill="#FFFFFF"/>
            </motion.svg>
        </motion.div>  
    );
  }
  