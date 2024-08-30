
import useMousePosition from "./utils/useMousePosition";

// import navigator
// import { headers } from "next/headers"
// import { getSelectorsByUserAgent } from "react-device-detect"

import { useState, useEffect } from "react";
import objectData from "./svgs/svgs.json";
import { motion, AnimatePresence }from "framer-motion";

export default function FallingObject() {

  const { x, y } = useMousePosition();

  const [ removeCursor, setRemoveCursor ] = useState(true);
  const [ cursorPosition, setCursorPosition ] = useState({x: 0, y: 0})
  const [ height, setHeight ] = useState()
  const [ fallingObjectAppear, setFallingObjectAppear ] = useState(false);



  

  useEffect (() => {
    setHeight(window.innerHeight)
    // // function isMobile() {
    // //   return window.matchMedia("(pointer: coarse)").matches;
    // // }
    // setHeight(window.innerHeight)   

    // window.addEventListener("mousemove", () => {
    //   setRemoveCursor(true)
    //   clearTimeout(timer)
    //   timer = setTimeout(() => setRemoveCursor(false), 500)
    //   return () => {
    //     document.removeEventListener("mousemove")
    //   } 
    // })

    window.addEventListener("click", () => {
        

        setFallingObjectAppear(true)
        setTimeout(() => setFallingObjectAppear(false), 5000)
        
       

    })


  })

  return (
    <AnimatePresence mode="wait">
        {fallingObjectAppear && <motion.svg 
            id="fallingObject"
            initial={{ x: x, y: y }}
            animate={{ y: height, scale: 2 }} 
            exit={{ capacity: 0 }}
            transition={{ duration: 5 }}
            width={objectData["Family"].width} height={objectData["Family"].height} viewBox={objectData["Family"].viewBox} fill="none" xmlns="http://www.w3.org/2000/svg"
            className="absolute" >
            <path d={objectData["Family"].paths[0]} fill="#FFFFFF"/>
        </motion.svg> }
    </AnimatePresence>
    

  );
}