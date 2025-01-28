import { useState, useEffect, useRef } from "react";
import FollowingObject from "./objects/FollowingObject";
import useMousePosition from "./utils/useMousePosition";
import objectData from "./svgs/svgs.json";
import { motion, AnimatePresence } from "framer-motion";

// Detect if user is on a mobile device
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
  // 1. COMMON STATE: randomisedObjects
  const mobile = isMobileDevice();
  const [randomizedObjects, setRandomizedObjects] = useState([]);
  const [bouquets, setBouquets] = useState([]);

  useEffect(() => {
    const shuffled = shuffleArray([...Object.keys(objectData)]);
    setRandomizedObjects(shuffled);
  }, []);

  // 2. MOBILE LOGIC: Throw objects
  const throwBouquet = (startX, startY) => {
    if (randomizedObjects.length === 0) {
      console.warn("No objects left. Resetting...");
      const shuffled = shuffleArray([...Object.keys(objectData)]);
      setRandomizedObjects(shuffled);
      return;
    }
    const randomIndex = Math.floor(Math.random() * randomizedObjects.length);
    const objKey = randomizedObjects[randomIndex];

    // Validate objKey
    if (!objKey || !objectData[objKey]) {
      console.error(`Invalid objectKey at index ${randomIndex}:`, objKey);
      return;
    }

    const angle = Math.random() * Math.PI - Math.PI / 2; // Narrower upward angle (-30° to 30°)
    const speed = Math.random() * 3 + 3; // Adjusted speed range (6 to 10)
    const vx = Math.cos(angle) * speed; // Horizontal velocity
    const vy = -Math.abs(Math.sin(angle) * speed) - 2; // Stronger upward vertical velocity (additional -2 for upward boost)

    const newBouquet = {
      id: `${objKey}-${Date.now()}-${Math.random()}`,
      objectKey: objKey,
      x: startX,
      y: startY,
      vx,
      vy,
    };

    setBouquets((curr) => [...curr, newBouquet]);
  };

  // Animate the “thrown” objects each frame (only if mobile)
  useEffect(() => {
    if (!mobile) return;

    let animationFrameId;

    const animate = () => {
      setBouquets((curr) =>
        curr
          .map((item) => ({
            ...item,
            x: item.x + item.vx,
            y: item.y + item.vy,
            vy: item.vy + 0.5,
          }))
          .filter((item) => item.y < window.innerHeight)
      );
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [mobile]);

  //new
  useEffect(() => {
    const handleClick = (event) => {
      if (mobile) {
        throwBouquet(event.clientX, event.clientY);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [mobile, throwBouquet]);

  // 3. DESKTOP LOGIC: original swirling/following objects
  const { x, y } = useMousePosition();
  const [isMouseMoving, setIsMouseMoving] = useState(false);
  const [convergingToMouse, setConvergingToMouse] = useState(false);

  const [targetPositions, setTargetPositions] = useState([]);
  const objectPositions = useRef({});
  const mouseStoppedTimeout = useRef(null);

  const [removeCursor, setRemoveCursor] = useState(true);
  const timerRef = useRef(null);

  function cursorMovement() {
    // On mobile, do nothing with the swirl logic
    if (mobile) return;

    if (timerRef.current) clearTimeout(timerRef.current);

    setRemoveCursor(true);
    setConvergingToMouse(false);

    timerRef.current = setTimeout(() => {
      setConvergingToMouse(true);
      timerRef.current = setTimeout(() => {
        setRemoveCursor(false);
      }, 750);
    }, 2500);
  }

  function cursorClick(event) {
    const { clientX, clientY } = event;
    // On mobile, we do the throw
    if (mobile) {
      throwBouquet(clientX, clientY);
    } else {
      // On desktop, the original swirl/ convergence
      if (timerRef.current) clearTimeout(timerRef.current);

      setRemoveCursor(true);
      setConvergingToMouse(false);

      timerRef.current = setTimeout(() => {
        setConvergingToMouse(true);
        timerRef.current = setTimeout(() => {
          setRemoveCursor(false);
        }, 750);
      }, 2500);
    }
  }

  // On desktop, track mouse moving or stopped
  useEffect(() => {
    if (mobile) return;
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
  }, [mobile]);

  // Star shape once objects converge
  useEffect(() => {
    if (mobile) return;
    if (!isMouseMoving) {
      setConvergingToMouse(true);
    } else {
      setConvergingToMouse(false);
    }
  }, [isMouseMoving, mobile]);

  // Calculate target positions for the swirl
  useEffect(() => {
    if (mobile) return;

    if (!randomizedObjects.length || x == null || y == null) return;
    const positions = randomizedObjects.map((key, index) => {
      const obj = objectData[key];
      return {
        id: key,
        x: x - (index === 0 ? obj.width * 1.5 : 20),
        y: y - (index === 0 ? obj.height * 1.5 : 20),
      };
    });
    setTargetPositions(positions);
  }, [randomizedObjects, x, y, mobile]);

  // Desktop mode switching
  useEffect(() => {
    if (!mobile) {
      if (!isMouseMoving) {
        setConvergingToMouse(true);
      } else {
        setConvergingToMouse(false);
      }
    }
  }, [isMouseMoving]);

  // Check for convergence
  useEffect(() => {
    if (mobile) return;
    if (!convergingToMouse) return;
    if (!randomizedObjects.length) return;
    if (x == null || y == null) return;

    const checkConvergence = () => {
      const threshold = 10;
      let allClose = true;

      for (let key of randomizedObjects) {
        const pos = objectPositions.current[key];
        if (!pos) {
          allClose = false;
          break;
        }
        const dist = Math.sqrt((pos.x - x) ** 2 + (pos.y - y) ** 2);
        if (dist > threshold) {
          allClose = false;
          break;
        }
      }

      if (allClose) {
        setConvergingToMouse(false);
      } else {
        requestAnimationFrame(checkConvergence);
      }
    };

    requestAnimationFrame(checkConvergence);
  }, [convergingToMouse, randomizedObjects, x, y]);

  //Track each FollowingObject’s position
  const handleObjectUpdate = (id, currentX, currentY) => {
    objectPositions.current[id] = { x: currentX, y: currentY };
  };

  // Attach the “mousemove” and “click” handlers to the document
  useEffect(() => {
    if (!mobile) {
      document.addEventListener("mousemove", cursorMovement);
      document.addEventListener("click", cursorClick);

      return () => {
        document.removeEventListener("mousemove", cursorMovement);
        document.removeEventListener("click", cursorClick);
      };
    }
  }, [mobile]);

  // 4. RENDER
  return (
    <>
      {/* Mobile: the thrown objects logic */}
      {bouquets.map((bouquet) => {
        const obj = objectData[bouquet.objectKey];
        if (!obj) {
          console.warn(`Missing object data for key: ${bouquet.objectKey}`);
          return null; // Skip rendering this object
        }
        const sizeMultiplier = 2.5;

        return (
          <FollowingObject
            key={bouquet.id}
            id={bouquet.objectKey}
            movingSpeed={0.05}
            rotationSpeed={1}
            width={obj.width * sizeMultiplier}
            height={obj.height * sizeMultiplier}
            viewBox={obj.viewBox}
            paths={obj.paths}
            x={bouquet.x}
            y={bouquet.y}
            fill={"#FFFFFF"}
          />
        );
      })}
      {/* Desktop: the swirl logic */}
      {!mobile && (
        <AnimatePresence mode="wait">
          {removeCursor && x !== null && y !== null && (
            <motion.div id="main" className="bg-white text-black">
              {randomizedObjects.map((key, index) => {
                const obj = objectData[key];
                const tp = targetPositions.find((p) => p.id === key) || {
                  x,
                  y,
                };

                return (
                  <FollowingObject
                    key={key}
                    id={key}
                    movingSpeed={0.05 + index * 0.05}
                    rotationSpeed={2}
                    width={
                      index === 0
                        ? obj.width * 4
                        : obj.width * (2.5 - index * 0.3)
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
      )}
    </>
  );
}
