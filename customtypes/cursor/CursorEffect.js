import LeavesObject from "./objects/LeavesObject";
import FollowingObject from "./objects/FollowingObject";
import useMousePosition from "./utils/useMousePosition";
import fallingObjectCalculation from "./utils/fallingObjectCalculation";
// import navigator
// import { headers } from "next/headers"
// import { getSelectorsByUserAgent } from "react-device-detect"

import { useState, useEffect } from "react";
import objectData from "./svgs/svgs.json";
import { motion, AnimatePresence }from "framer-motion";




export default function CursorEffect() {

  const { x, y } = useMousePosition();

  const [ removeCursor, setRemoveCursor ] = useState(true);
  const [ height, setHeight ] = useState()
  
  let timer;

  useEffect (() => {
    // function isMobile() {
    //   return window.matchMedia("(pointer: coarse)").matches;
    // }
    setHeight(window.innerHeight)   

    window.addEventListener("mousemove", () => {
      setRemoveCursor(true)
      clearTimeout(timer)
      timer = setTimeout(() => setRemoveCursor(false), 200)
    })

    window.addEventListener("click", () => {

      setRemoveCursor(true)
      clearTimeout(timer)
      timer = setTimeout(() => setRemoveCursor(false), 500)

    })


  })

  const fallingObjectAppear = fallingObjectCalculation();

  


 
  return (

    

    <AnimatePresence mode="wait">
      {/* <motion.div>
        
      </motion.div> */}
      {removeCursor && <motion.div
        id="main"
        className="bg-white text-black"
        >
        

        <FollowingObject
          id="Union" 
          movingSpeed={0.075}
          rotationSpeed={2}
          width={objectData["Union"].width}
          height={objectData["Union"].height}
          viewBox={objectData["Union"].viewBox}
          paths={objectData["Union"].paths}
          x={x} y={y}
          fill={"#FFA397"}/>
        <FollowingObject
          id="Flower" 
          movingSpeed={0.05}
          rotationSpeed={1}
          width={objectData["Flower"].width}
          height={objectData["Flower"].height}
          viewBox={objectData["Flower"].viewBox}
          paths={objectData["Flower"].paths}
          x={x} y={y}
          fill={"#FE6219"}/>
        <FollowingObject
          id="Snake" 
          movingSpeed={0.20}
          rotationSpeed={1.3}
          width={objectData["Snake"].width}
          height={objectData["Snake"].height}
          viewBox={objectData["Snake"].viewBox}
          paths={objectData["Snake"].paths}
          x={x} y={y}
          fill={"#000000"}/>
        <FollowingObject
          id="Blot" 
          movingSpeed={0.1}
          rotationSpeed={1.5}
          width={objectData["Blot"].width}
          height={objectData["Blot"].height}
          viewBox={objectData["Blot"].viewBox}
          paths={objectData["Blot"].paths}
          x={x} y={y}
          fill={"#FFA851"}/>
        <FollowingObject
          id="Family" 
          movingSpeed={0.25}
          rotationSpeed={1.7}
          width={objectData["Family"].width}
          height={objectData["Family"].height}
          viewBox={objectData["Family"].viewBox}
          paths={objectData["Family"].paths}
          x={x} y={y}
          fill={"#FFD26E"}/>
        <LeavesObject 
          x={x} y={y}/>

      </motion.div>}
      {/* {fallingObjectAppear && <motion.svg 
        id="fallingObject"
        initial={{ x: x, y: y }}
        animate={{ y: height, scale: 2 }} 
        exit={{ capacity: 0 }}
        transition={{ duration: 5 }}
        width={objectData["Family"].width} height={objectData["Family"].height} viewBox={objectData["Family"].viewBox} fill="none" xmlns="http://www.w3.org/2000/svg"
        className="absolute" >
        <path d={objectData["Family"].paths[0]} fill="#FFFFFF"/>
    </motion.svg> } */}
      
    </AnimatePresence>
    

  );
}