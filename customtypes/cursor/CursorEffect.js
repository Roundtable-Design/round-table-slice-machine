import LeavesObject from "./objects/LeavesObject";
import FollowingObject from "./objects/FollowingObject";
import useMousePosition from "./utils/useMousePosition";
import fallingObjectCalculation from "./utils/fallingObjectCalculation";

import { useState, useEffect } from "react";
import objectData from "./svgs/svgs.json";
import { motion, AnimatePresence }from "framer-motion";




export default function CursorEffect() {

  const { x, y } = useMousePosition();
  const [ removeCursor, setRemoveCursor ] = useState(true);
  
  let timer;

  function cursorMovement() {
    setRemoveCursor(true)
    clearTimeout(timer)
    timer = setTimeout(() => setRemoveCursor(false), 500)
  } 

  function cursorClick() {
    setRemoveCursor(true)
    clearTimeout(timer)
    timer = setTimeout(() => setRemoveCursor(false), 800)
  }

  useEffect (() => {
    document.addEventListener('mousemove', (e1) => {
      window.addEventListener("mousemove", cursorMovement)
      return () => {
        window.removeEventListener("mousemove", cursorMovement)
      }
    })

    document.addEventListener('click', (e1) => {
      window.addEventListener("click", cursorClick)
      return () => {
        window.removeEventListener("click", cursorClick)
      }
    }) 
  }, [])
  return (

    

    <AnimatePresence mode="wait">
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
          rotationSpeed={2}
          width={objectData["Family"].width}
          height={objectData["Family"].height}
          viewBox={objectData["Family"].viewBox}
          paths={objectData["Family"].paths}
          x={x} y={y}
          fill={"#FFD26E"}/>
        <LeavesObject 
          x={x} y={y}/>

      </motion.div>}
    </AnimatePresence>
    

  );
}