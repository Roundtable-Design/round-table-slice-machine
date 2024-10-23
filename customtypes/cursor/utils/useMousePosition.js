import { useState, useEffect } from "react";

export default function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });

  //   let clientScrollY = 0;
  //   let totalScrollY = 0;

  //   const updateMousePosition = (e) => {
  //     setMousePosition({ x: e.clientX, y: e.clientY });
  //     //                           -20              -900
  //   };

  //   useEffect(() => {
  //     document.addEventListener("mousemove", (e1) => {
  //       document.addEventListener("mousemove", updateMousePosition);
  //       return () => {
  //         document.removeEventListener("mousemove", updateMousePosition);
  //       };
  //     });
  //   }, []);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener("mousemove", updateMousePosition);

    return () => {
      document.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return mousePosition;
}
