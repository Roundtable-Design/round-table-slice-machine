import { useState, useEffect, useRef } from "react";
import FollowingObject from "./objects/FollowingObject";
import useMousePosition from "./utils/useMousePosition";
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

  const [randomizedObjects, setRandomizedObjects] = useState([]);
  const [isMouseMoving, setIsMouseMoving] = useState(false);
  const [convergingToMouse, setConvergingToMouse] = useState(false);
  const [inStarShape, setInStarShape] = useState(true);

  const [targetPositions, setTargetPositions] = useState([]);
  const objectPositions = useRef({});
  const mouseStoppedTimeout = useRef(null);

  // ---- Reintroduced states and timer logic from old version ----
  const [removeCursor, setRemoveCursor] = useState(true);
  const timerRef = useRef(null);

  // This function re-shuffles the objects, as in old code
  function shuffleAndSetObjects() {
    const shuffledObjects = shuffleArray([...Object.keys(objectData)]);
    setRandomizedObjects(shuffledObjects);
  }

  // Logic from old version: On mouse move, show cursor immediately, then after a delay hide it, then show again.
  function cursorMovement() {
    // Cancel any existing timer
    if (timerRef.current) clearTimeout(timerRef.current);

    // Immediately show cursor (if it was hidden) and stop any convergence
    setRemoveCursor(true);
    setConvergingToMouse(false);

    // After some delay, start convergence and then hide
    timerRef.current = setTimeout(() => {
      setConvergingToMouse(true);
      timerRef.current = setTimeout(() => {
        setRemoveCursor(false);
        shuffleAndSetObjects();
      }, 750);
    }, 2500);
  }

  // Logic from old version: On click, do the same as cursor movement
  function cursorClick() {
    if (timerRef.current) clearTimeout(timerRef.current);

    setRemoveCursor(true);
    setConvergingToMouse(false);

    timerRef.current = setTimeout(() => {
      setConvergingToMouse(true);
      timerRef.current = setTimeout(() => {
        setRemoveCursor(false);
        shuffleAndSetObjects();
      }, 750);
    }, 2500);
  }

  // -------------------------------------------------------------

  useEffect(() => {
    const shuffledObjects = shuffleArray([...Object.keys(objectData)]);
    setRandomizedObjects(shuffledObjects);
  }, []);

  // Detect if mouse is moving or stopped.
  useEffect(() => {
    function handleMouseMove(e) {
      setIsMouseMoving(true);
      if (mouseStoppedTimeout.current)
        clearTimeout(mouseStoppedTimeout.current);
      mouseStoppedTimeout.current = setTimeout(() => {
        setIsMouseMoving(false);
      }, 50);
    }

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // When mouse stops, we start converging all objects to the mouse position.
  // When mouse moves, objects just follow the mouse position.
  useEffect(() => {
    if (!isMouseMoving) {
      if (!inStarShape) {
        setConvergingToMouse(true);
      }
    } else {
      setConvergingToMouse(false);
      setInStarShape(false);
    }
  }, [isMouseMoving, inStarShape]);

  // Calculate the target positions based on current mode:
  useEffect(() => {
    if (randomizedObjects.length === 0 || x === null || y === null) return;

    if (inStarShape) {
      // STAR SHAPE:
      const a = 100;
      const b = 15;
      const rotationOffset = Math.PI / 4;

      const positions = randomizedObjects.map((key, index) => {
        if (index === 0) {
          return {
            id: key,
            x: x - objectData[key].width * 1.5,
            y: y - objectData[key].height * 1.5,
          };
        }
        const angle = -index * 1.2 + rotationOffset;
        const radius = a + b * Math.pow(index, 1.5);
        return {
          id: key,
          x: x + radius * Math.cos(angle),
          y: y + radius * Math.sin(angle),
        };
      });
      setTargetPositions(positions);
    } else {
      // LINE/CONVERGING MODE:
      const positions = randomizedObjects.map((key, index) => {
        return {
          id: key,
          x: x - (index === 0 ? objectData[key].width * 1.5 : 20),
          y: y - (index === 0 ? objectData[key].height * 1.5 : 20),
        };
      });
      setTargetPositions(positions);
    }
  }, [randomizedObjects, x, y, inStarShape]);

  // Check for convergence when convergingToMouse is true.
  useEffect(() => {
    if (!convergingToMouse) return;
    if (randomizedObjects.length === 0) return;
    if (x === null || y === null) return;

    const checkConvergence = () => {
      const threshold = 10;
      let allClose = true;

      for (let key of randomizedObjects) {
        const pos = objectPositions.current[key];
        if (!pos) {
          allClose = false;
          break;
        }
        const dist = Math.sqrt(Math.pow(pos.x - x, 2) + Math.pow(pos.y - y, 2));
        if (dist > threshold) {
          allClose = false;
          break;
        }
      }

      if (allClose) {
        setInStarShape(true);
        setConvergingToMouse(false);
      } else {
        requestAnimationFrame(checkConvergence);
      }
    };
    requestAnimationFrame(checkConvergence);
  }, [convergingToMouse, randomizedObjects, x, y]);

  // Callback from FollowingObject to track current positions
  const handleObjectUpdate = (id, currentX, currentY) => {
    objectPositions.current[id] = { x: currentX, y: currentY };
  };

  // Reintroduce event listeners for removeCursor logic:
  useEffect(() => {
    // On component mount, set up the movement and click listeners
    document.addEventListener("mousemove", cursorMovement);
    document.addEventListener("click", cursorClick);

    return () => {
      document.removeEventListener("mousemove", cursorMovement);
      document.removeEventListener("click", cursorClick);
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {removeCursor && x !== null && y !== null && (
        <motion.div id="main" className="bg-white text-black">
          {randomizedObjects.map((key, index) => {
            const obj = objectData[key];
            const tp = targetPositions.find((p) => p.id === key) || { x, y };

            return (
              <FollowingObject
                key={key}
                id={key}
                movingSpeed={0.05 + index * 0.05} // different speeds
                rotationSpeed={2}
                width={
                  index === 0 ? obj.width * 4 : obj.width * (2.5 - index * 0.3)
                }
                height={
                  index === 0
                    ? obj.height * 4
                    : obj.height * (2.5 - index * 0.3)
                }
                viewBox={obj.viewBox}
                paths={obj.paths}
                x={tp.x}
                y={tp.y}
                fill={"#FFFFFF"}
                onObjectUpdate={handleObjectUpdate}
              />
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
