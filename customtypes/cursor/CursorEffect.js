import FollowingObject from "./objects/FollowingObject";
import useMousePosition from "./utils/useMousePosition";
import fallingObjectCalculation from "./utils/fallingObjectCalculation";
import { useState, useEffect } from "react";
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
  const [randomizedObjects, setRandomizedObjects] = useState([]);
  const [initialPositions, setInitialPositions] = useState([]); // Initial positions around cursor

  let timer;

  function cursorMovement() {
    setRemoveCursor(true);
    clearTimeout(timer);
    timer = setTimeout(() => setRemoveCursor(false), 3500);
  }

  function cursorClick() {
    setRemoveCursor(true);
    clearTimeout(timer);
    timer = setTimeout(() => setRemoveCursor(false), 800);
  }

  useEffect(() => {
    //shuffle the logos on page reload
    const shuffledObjects = shuffleArray(Object.keys(objectData));
    setRandomizedObjects(shuffledObjects);

    // Calculate initial positions around the cursor (in a circular pattern)
    const radius = 100; // You can adjust the radius for spacing
    const positions = shuffledObjects.slice(1).map((_, index) => {
      const angle = (index / (shuffledObjects.length - 1)) * Math.PI * 2; // Distribute angles around the circle
      return {
        x: radius * Math.cos(angle), // x position relative to the cursor
        y: radius * Math.sin(angle), // y position relative to the cursor
      };
    });
    // const radius = 100;
    // const positions = shuffledObjects.slice(1).map((_, index) => {
    //   const angle = (index / (shuffledObjects.length - 1)) * Math.PI * 2; // Evenly distribute around a circle
    //   return {
    //     x: radius * Math.cos(angle), // Horizontal position
    //     y: radius * Math.sin(angle), // Vertical position
    //   };
    // });
    setInitialPositions(positions);

    document.addEventListener("mousemove", (e1) => {
      window.addEventListener("mousemove", cursorMovement);
      return () => {
        window.removeEventListener("mousemove", cursorMovement);
      };
    });

    document.addEventListener("click", (e1) => {
      window.addEventListener("click", cursorClick);
      return () => {
        window.removeEventListener("click", cursorClick);
      };
    });
  }, []);

  return (
    <AnimatePresence mode="wait">
      {removeCursor && (
        <motion.div id="main" className="bg-white text-black">
          {/* {randomizedObjects.map((key, index) => (
            <FollowingObject
              key={key}
              id={key}
              movingSpeed={0.075 + index * 0.05} // Adjust speed if needed
              rotationSpeed={2 - index * 0.2} // Adjust rotation speed if needed
              width={objectData[key].width * (1.5 - index * 0.2)} // Decrease width progressively
              height={objectData[key].height * (1.5 - index * 0.2)} // Decrease height progressively
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
              rotationSpeed={2} // Adjust rotation speed if needed
              width={objectData[randomizedObjects[0]].width * 2} // Largest size
              height={objectData[randomizedObjects[0]].height * 2} // Largest size
              viewBox={objectData[randomizedObjects[0]].viewBox}
              paths={objectData[randomizedObjects[0]].paths} // Pass all paths here
              x={x} // Centered on the cursor
              y={y} // Centered on the cursor
              fill={"#FFFFFF"} // Set fill as needed
            />
          )}

          {/* Render the remaining objects around the cursor */}
          {randomizedObjects.slice(1).map((key, index) => (
            <FollowingObject
              key={key}
              id={key}
              movingSpeed={0.075 + index * 0.05} // Adjust speed if needed
              rotationSpeed={2 - index * 0.2} // Adjust rotation speed if needed
              width={objectData[key].width * (1.5 - index * 0.2)} // Decrease width progressively
              height={objectData[key].height * (1.5 - index * 0.2)} // Decrease height progressively
              viewBox={objectData[key].viewBox}
              paths={objectData[key].paths} // Pass all paths here
              x={x + initialPositions[index]?.x || 0} // Position relative to the cursor
              y={y + initialPositions[index]?.y || 0} // Position relative to the cursor
              fill={"#FFFFFF"} // Set fill as needed
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
