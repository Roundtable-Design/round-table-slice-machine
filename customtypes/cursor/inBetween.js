import { useState, useEffect, useRef } from "react";
import FollowingObject from "./objects/FollowingObject";
import useMousePosition from "./utils/useMousePosition";
import objectData from "./svgs/svgs.json";
import { motion, AnimatePresence } from "framer-motion";

const isMobileDevice = () => {
  return /Mobi|Android/i.test(navigator.userAgent);
};

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

  const [bouquetAnimation, setBouquetAnimation] = useState(null);

  // Falling states
  const [fallingDown, setFallingDown] = useState(false);
  const [fallStartPositions, setFallStartPositions] = useState([]);
  const fallStartTime = useRef(null);
  const hitBottomRef = useRef(false);

  // Control whether to show any objects (used for mobile)
  // On mobile: initially no objects. Only show one on click (the falling one).
  const [removeCursor, setRemoveCursor] = useState(true);
  const timerRef = useRef(null);

  // New state to control showing only one falling object on mobile
  const [showSingleFallingObject, setShowSingleFallingObject] = useState(false);

  function shuffleAndSetObjects() {
    const shuffledObjects = shuffleArray([...Object.keys(objectData)]);
    setRandomizedObjects(shuffledObjects);
  }

  function cursorMovement() {
    if (timerRef.current) clearTimeout(timerRef.current);
    setRemoveCursor(true);
    setConvergingToMouse(false);

    if (!isMobileDevice()) {
      timerRef.current = setTimeout(() => {
        setConvergingToMouse(true);
        timerRef.current = setTimeout(() => {
          setRemoveCursor(false);
          shuffleAndSetObjects();
        }, 750);
      }, 3500);
    }
  }

  function cursorClick() {
    if (isMobileDevice()) {
      // On mobile:
      // 1. Show single falling object
      // 2. Trigger gravity fall
      if (randomizedObjects.length === 0) return;

      const firstId = randomizedObjects[0];
      setShowSingleFallingObject(true);

      // Start "bouquetAnimation" (straight fall)
      setBouquetAnimation({
        startX: x,
        startY: y,
        time: Date.now(),
      });
    } else {
      // Desktop behavior unchanged
      if (timerRef.current) clearTimeout(timerRef.current);

      setConvergingToMouse(false);
      timerRef.current = setTimeout(() => {
        setConvergingToMouse(true);
        timerRef.current = setTimeout(() => {
          setConvergingToMouse(false);
          shuffleAndSetObjects();
        }, 750);
      }, 3500);
    }
  }

  useEffect(() => {
    const shuffledObjects = shuffleArray([...Object.keys(objectData)]);
    setRandomizedObjects(shuffledObjects);
  }, []);

  useEffect(() => {
    document.addEventListener("click", cursorClick);
    return () => {
      document.removeEventListener("click", cursorClick);
    };
  }, [x, y]);

  // Gravity fall for the first object (for mobile)
  useEffect(() => {
    if (!bouquetAnimation) return;
    if (!isMobileDevice()) return; // Only run this logic on mobile

    const { startX, startY, time } = bouquetAnimation;
    const g = 500; // Gravity in px/s²
    let animationFrame;
    const firstId = randomizedObjects[0];
    const objData = objectData[firstId];
    const objHeight = objData.height * 4;
    const bottomY = window.innerHeight - objHeight;

    function animate() {
      const elapsedTime = (Date.now() - time) / 1000;
      const newX = startX;
      const newY = startY + 0.5 * g * elapsedTime ** 2;

      setTargetPositions([{ id: firstId, x: newX, y: newY }]);

      // Check if it hits the bottom
      if (newY < bottomY) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        // Clamp to bottom
        setTargetPositions([{ id: firstId, x: newX, y: bottomY }]);
        // Stay 3.5s, then remove object and reset
        setTimeout(() => {
          setRandomizedObjects((prev) => prev.slice(1));
          setShowSingleFallingObject(false);
          setBouquetAnimation(null);
        }, 3500);
      }
    }

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [bouquetAnimation, randomizedObjects]);

  // Detect mouse movement
  useEffect(() => {
    function handleMouseMove() {
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

  // Update target positions (desktop logic) only if not mobile or if we are not showing single falling object
  useEffect(() => {
    if (isMobileDevice() && !showSingleFallingObject) {
      // On mobile, if not showing single falling object, do nothing
      return;
    }

    if (
      randomizedObjects.length === 0 ||
      x === null ||
      y === null ||
      isMobileDevice()
    )
      return;

    if (inStarShape) {
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
      const positions = randomizedObjects.map((key, index) => {
        return {
          id: key,
          x: x - (index === 0 ? objectData[key].width * 1.5 : 20),
          y: y - (index === 0 ? objectData[key].height * 1.5 : 20),
        };
      });
      setTargetPositions(positions);
    }
  }, [randomizedObjects, x, y, inStarShape, showSingleFallingObject]);

  useEffect(() => {
    if (!isMobileDevice()) {
      if (!isMouseMoving) {
        if (!inStarShape) {
          setConvergingToMouse(true);
        }
      } else {
        setConvergingToMouse(false);
        setInStarShape(false);
      }
    }
  }, [isMouseMoving, inStarShape]);

  // Check convergence (desktop only)
  useEffect(() => {
    if (!convergingToMouse) return;
    if (randomizedObjects.length === 0) return;
    if (x === null || y === null) return;
    if (isMobileDevice()) return; // Skip on mobile

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

  const handleObjectUpdate = (id, currentX, currentY) => {
    objectPositions.current[id] = { x: currentX, y: currentY };
  };

  useEffect(() => {
    document.addEventListener("mousemove", cursorMovement);
    document.addEventListener("click", cursorClick);

    return () => {
      document.removeEventListener("mousemove", cursorMovement);
      document.removeEventListener("click", cursorClick);
    };
  }, []);

  // Rendering:
  // On mobile:
  // - If showSingleFallingObject is false, show nothing.
  // - If showSingleFallingObject is true, show only the first object in targetPositions.
  // On desktop: show all objects as before.

  let objectsToRender = [];
  if (isMobileDevice()) {
    if (showSingleFallingObject && randomizedObjects.length > 0) {
      // Show only the first object
      const firstId = randomizedObjects[0];
      const obj = objectData[firstId];
      const tp = targetPositions.find((p) => p.id === firstId) || { x, y };
      objectsToRender.push(
        <FollowingObject
          key={firstId}
          id={firstId}
          movingSpeed={0.05}
          rotationSpeed={2}
          width={obj.width * 4}
          height={obj.height * 4}
          viewBox={obj.viewBox}
          paths={obj.paths}
          x={tp.x}
          y={tp.y}
          fill={"#FFFFFF"}
          onObjectUpdate={handleObjectUpdate}
        />
      );
    }
    // else show nothing
  } else {
    // Desktop: render all objects normally
    objectsToRender = randomizedObjects.map((key, index) => {
      const obj = objectData[key];
      const tp = targetPositions.find((p) => p.id === key) || { x, y };
      return (
        <FollowingObject
          key={key}
          id={key}
          movingSpeed={0.05 + index * 0.05}
          rotationSpeed={2}
          width={index === 0 ? obj.width * 4 : obj.width * (2.5 - index * 0.3)}
          height={
            index === 0 ? obj.height * 4 : obj.height * (2.5 - index * 0.3)
          }
          viewBox={obj.viewBox}
          paths={obj.paths}
          x={tp.x}
          y={tp.y}
          fill={"#FFFFFF"}
          onObjectUpdate={handleObjectUpdate}
        />
      );
    });
  }

  return (
    <AnimatePresence mode="wait">
      {removeCursor && x !== null && y !== null && (
        <motion.div id="main" className="bg-white text-black">
          {objectsToRender}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
