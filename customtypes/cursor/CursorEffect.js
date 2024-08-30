import LeavesObject from "./objects/LeavesObject";
import FollowingObject from "./objects/FollowingObject";
import useMousePosition from "./utils/useMousePosition";
// import navigator
// import { headers } from "next/headers"
// import { getSelectorsByUserAgent } from "react-device-detect"

import { useState, useEffect } from "react";
import objectData from "./svgs/svgs.json";
import { motion, AnimatePresence }from "framer-motion";


const fallingObjectAppear = true

export default function CursorEffect() {


  const [ oldX, setOldX ] = useState(0)
  const [ oldY, setOldY ] = useState(0)

  const { x, y } = useMousePosition();

  const [ removeCursor, setRemoveCursor ] = useState(true);
  const [ cursorPosition, setCursorPosition ] = useState({x: 0, y: 0})
  const [ height, setHeight ] = useState()
  const [ counter, setCounter ] = useState(0)
  const [ movingState, setMovingState ] = useState(false)
  const [ arrayIndex, setArrayIndex ] = useState(0)
  const [ ids, setIds ] = useState(0)
  const [ smth, setSmth ] = useState(0)

  const speedArray = [ 0.1, 0.3, 0.2, 0.35, 0.15, 0.4, 0.25]
  // const [ array, setArray ] = useState(Array(1).fill(undefined))
  // const [ arrayLentgh, setArrayLentgh ] = useState(1)

  // const [ fallingObjectAppear, setFallingObjectAppear ] = useState(true)


  
  let timer;

  // array.push(undefined);
  // 
  // useEffect (() => {
    
  //   
  // })
  
  

  // useEffect (() => {
  //   // function isMobile() {
  //   //   return window.matchMedia("(pointer: coarse)").matches;
  //   // }  

    


  //   window.addEventListener("mousemove", () => {
  //     // array.push(undefined);
  //     // setRemoveCursor(true)
  //     // clearTimeout(timer)
  //     // timer = setTimeout(() => setRemoveCursor(false), 500)
  //     // return () => {
  //     //   window.removeEventListener("mousemove", setRemoveCursor(false))
  //     // } 
  //   })

  //   window.addEventListener("click", () => {
  //         // setArrayLentgh(arrayLentgh+1);
  //         // setArray(Array(arrayLentgh).fill(undefined))

  //         // setRemoveCursor(true)
  //         // clearTimeout(timer)
  //         // timer = setTimeout(() => setRemoveCursor(false), 800)
  //   })  

  //   // window.addEventListener("click", () => {


  //     // setRemoveCursor(true)
  //     // clearTimeout(timer
  //     // timer = setTimeout(() => setRemoveCursor(false), 800)

  //   // })


  // })

  

  const [ array, setArray ] = useState(Array(0).fill(undefined))
  
  let moveTimer;

  

  function hide() {
    setRemoveCursor(false)
    setArray(Array(0).fill(undefined))
    
  }

  function movingTheMouse() {
    // if (counter < 100) {
    // setCounter(counter+1)
    setRemoveCursor(true)
    clearTimeout(moveTimer)
    moveTimer = setTimeout(() => hide(), 1000)
  }
  useEffect(() => {
    

    setIds(Math.floor(Math.random()*1000))
    setSmth(Math.floor(((Math.random()*10)/(10/0.4)+0.1)*100)/100)

    if (oldX != x || oldY != y) setMovingState(true)
    else setMovingState(false)

    setOldX(x)
    setOldY(y)

    if (movingState) {
      setCounter(counter+1)
      if (counter >= 10) {
        if (arrayIndex >= 6) setArrayIndex(-1);
        setArrayIndex(arrayIndex+1)
        array.push(undefined);
        setCounter(0)
      }
       
     
    }
    
    document.addEventListener("mousemove", movingTheMouse)
    document.removeEventListener("mousemove", movingTheMouse)

    

      
        
     

  })

  
  // useEffect (() => {

    
  //   // let a = 0;
    
    
    
    
  // })
  // const smth = Math.floor(((Math.random()*10)/(10/0.4)+0.1)*100)/100
  

 
  return (

    

    <AnimatePresence mode="wait">
      
      {/* <motion.div>
        
      </motion.div> */}
      
      
      {removeCursor && <motion.div
        id="main"
        className="bg-white text-black"
        >
        {/* {array.length} */}
         {
        array.map(_=><FollowingObject
          id={ids.toString()}
          movingSpeed={smth}
          rotationSpeed={2}
          width={objectData["Union"].width}
          height={objectData["Union"].height}
          viewBox={objectData["Union"].viewBox}
          paths={objectData["Union"].paths}
          x={x} y={y}
          fill={"#FFA397"}/>)
        }
        {/* <FollowingObject
          id="Union" 
          movingSpeed={0.075}
          rotationSpeed={2}
          width={objectData["Union"].width}
          height={objectData["Union"].height}
          viewBox={objectData["Union"].viewBox}
          paths={objectData["Union"].paths}
          x={x} y={y}
          fill={"#FFA397"}/> */}
        {/* {array.length} */}
        

        {/* <FollowingObjects
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
          x={x} y={y}/> */}

      </motion.div>}      
    </AnimatePresence>
    

  );
}