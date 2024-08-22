import LeavesObject from "./objects/LeavesObject";
import FollowingObject from "./objects/FollowingObject";

import objectData from "./svgs/svgs.json";

import { motion } from "framer-motion";

export default function CursorEffect() {

  return (
    <motion.div
        className="bg-white mix-blend-difference">

        <FollowingObject 
          id="Union" movingSpeed={0.075} 
          rotationSpeed={2} 
          width={objectData["Union"].width} 
          height={objectData["Union"].height} 
          viewBox={objectData["Union"].viewBox}
          paths={objectData["Union"].paths}/>
        <FollowingObject 
          id="Flower" movingSpeed={0.05} 
          rotationSpeed={1} 
          width={objectData["Flower"].width} 
          height={objectData["Flower"].height} 
          viewBox={objectData["Flower"].viewBox}
          paths={objectData["Flower"].paths}/>
        <FollowingObject 
          id="Snake" movingSpeed={0.20} 
          rotationSpeed={1.3} 
          width={objectData["Snake"].width} 
          height={objectData["Snake"].height} 
          viewBox={objectData["Snake"].viewBox}
          paths={objectData["Snake"].paths}/>
        <FollowingObject 
          id="Blot" movingSpeed={0.1} 
          rotationSpeed={1.5} 
          width={objectData["Blot"].width} 
          height={objectData["Blot"].height} 
          viewBox={objectData["Blot"].viewBox}
          paths={objectData["Blot"].paths}/>
        <FollowingObject 
          id="Family" movingSpeed={0.25} 
          rotationSpeed={1.7} 
          width={objectData["Family"].width} 
          height={objectData["Family"].height} 
          viewBox={objectData["Family"].viewBox}
          paths={objectData["Family"].paths}/>
        <LeavesObject />

    </motion.div>

  );
} 