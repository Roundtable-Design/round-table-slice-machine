import { useState, useEffect, useRef } from "react";
import FollowingObject from "./objects/FollowingObject";
import useMousePosition from "./utils/useMousePosition";
import fallingObjectCalculation from "./utils/fallingObjectCalculation";
import objectData from "./svgs/svgs.json";
import { motion, AnimatePresence } from "framer-motion";

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default function CursorEffect() {
  const { x, y } = useMousePosition();
  const [removeCursor, setRemoveCursor] = useState(true);
  const [convergeToCursor, setConvergeToCursor] = useState(false);
  const [randomizedObjects, setRandomizedObjects] = useState([]);
  const [initialPositions, setInitialPositions] = useState([]);
  useState(false);

  let timer;

  function shuffleAndSetObjects() {
    const shuffledObjects = shuffleArray([...Object.keys(objectData)]);
    setRandomizedObjects(shuffledObjects);
  }

  function cursorMovement() {
    if (!removeCursor) {
      shuffleAndSetObjects();
    }
    setRemoveCursor(true);
    setConvergeToCursor(false);
    clearTimeout(timer);

    // timer = setTimeout(() => setRemoveCursor(false), 1500);
    timer = setTimeout(() => {
      setConvergeToCursor(true);
      setTimeout(() => {
        setRemoveCursor(false);
        shuffleAndSetObjects();
      }, 500);
    }, 1500);
  }

  function cursorClick() {
    setRemoveCursor(true);
    setConvergeToCursor(false);
    clearTimeout(timer);

    // timer = setTimeout(() => setRemoveCursor(false), 800);
    timer = setTimeout(() => {
      setConvergeToCursor(true);
      setTimeout(() => {
        setRemoveCursor(false);
        shuffleAndSetObjects();
      }, 500);
    }, 800);
  }

  useEffect(() => {
    shuffleAndSetObjects();

    // Add event listeners to detect mouse movements and clicks
    document.addEventListener("mousemove", cursorMovement);
    document.addEventListener("click", cursorClick);

    return () => {
      document.removeEventListener("mousemove", cursorMovement);
      document.removeEventListener("click", cursorClick);
    };
  }, []);

  useEffect(() => {
    // circle positions of following objects
    // const radius = 100;
    // const positions = shuffledObjects.slice(1).map((_, index) => {
    //   const angle = (index / (shuffledObjects.length - 1)) * Math.PI * 2;
    //   return {
    //     x: radius * Math.cos(angle),
    //     y: radius * Math.sin(angle),
    //   };
    // });
    // setInitialPositions(positions);

    const a = 100; // Starting distance from center
    const b = 15; // Increased growth rate of the spiral for better spacing
    const rotationOffset = Math.PI / 4;

    const positions = randomizedObjects.slice(1).map((_, index) => {
      const angle = -index * 1.2 + rotationOffset; // Increased angle increment for more spacing between objects
      const radius = a + b * Math.pow(index, 1.5);
      // Use an increasing power for radius to open up more smoothly

      return {
        x: radius * Math.cos(angle),
        y: radius * Math.sin(angle),
      };
    });

    setInitialPositions(positions);
  }, [randomizedObjects]);

  return (
    <AnimatePresence mode="wait">
      {removeCursor && x !== null && y !== null && (
        <motion.div id="main" className="bg-white text-black">
          {/* {randomizedObjects.map((key, index) => (
            <FollowingObject
              key={key}
              id={key}
              movingSpeed={0.075 + index * 0.05} // Adjust speed if needed
              rotationSpeed={2 - index * 0.2} // Adjust rotation speed if needed
              width={objectData[key].width * (2.5 - index * 0.2)} // Decrease width progressively
              height={objectData[key].height * (2.5 - index * 0.2)} // Decrease height progressively
              viewBox={objectData[key].viewBox}
              paths={objectData[key].paths}
              x={x + index * 30} // Increase horizontal spacing
              y={y + index * 30} // Increase vertical spacing
              fill={"#FFFFFF"}
            />
          ))} */}

          {/* Render the largest object at the center of the cursor */}
          {randomizedObjects.length > 0 && (
            <FollowingObject
              key={randomizedObjects[0]}
              id={randomizedObjects[0]}
              movingSpeed={0.05} // Slowest for the largest one
              rotationSpeed={2}
              width={objectData[randomizedObjects[0]].width * 3}
              height={objectData[randomizedObjects[0]].height * 3}
              viewBox={objectData[randomizedObjects[0]].viewBox}
              paths={objectData[randomizedObjects[0]].paths}
              x={
                convergeToCursor
                  ? x - objectData[randomizedObjects[0]].width * 1.5
                  : x - objectData[randomizedObjects[0]].width * 1.5
              }
              y={
                convergeToCursor
                  ? y - objectData[randomizedObjects[0]].height * 1.5
                  : y - objectData[randomizedObjects[0]].height * 1.5
              }
              // x={convergeToCursor ? x - 20 : x - 20}
              // y={convergeToCursor ? y : y}
              fill={"#FFFFFF"}
              converging={convergeToCursor}
            />
          )}

          {/* Render the remaining objects around the cursor */}
          {randomizedObjects.slice(1).map((key, index) => (
            <FollowingObject
              key={key}
              id={key}
              movingSpeed={0.075 + index * 0.05}
              rotationSpeed={2}
              width={objectData[key].width * (2 - index * 0.3)}
              height={objectData[key].height * (2 - index * 0.3)}
              viewBox={objectData[key].viewBox}
              paths={objectData[key].paths}
              // x={x + initialPositions[index]?.x || 0}
              // y={y + initialPositions[index]?.y || 0}
              x={convergeToCursor ? x : x + (initialPositions[index]?.x || 0)}
              y={convergeToCursor ? y : y + (initialPositions[index]?.y || 0)}
              fill={"#FFFFFF"}
              converging={convergeToCursor}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
