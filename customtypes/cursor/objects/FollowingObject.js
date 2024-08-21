import { motion } from "framer-motion";
import useMousePosition from "../utils/useMousePosition";

export default function FollowingObject( movingSpeed, rotationSpeed, width, height, viewBox, paths) {
 
    const { x, y } = useMousePosition();
    const radius = 20;

    const angles = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 
                    100, 110, 120, 130, 140, 150, 160, 170, 180, 
                    190, 200, 210, 220, 230, 240, 250, 260, 270, 
                    280, 290, 300, 310, 320, 330, 340,, 350, 360];

    return (
        <motion.div
            animate={{ x: x-radius, y: y-radius, }}
            transition={{ duration: 0.1 }} >
            <motion.div
                className="h-20px w-20px absolute" 
                animate={{ rotate: angles }}
                transition={{ repeat: Infinity, duration: 1.5 }} >
                <motion.svg
                    width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg"
                    className="absolute"
                    animate={{ x: 0 }} >
                    <path d="M9.66291 0.436112C7.52667 1.21383 6.06401 1.58792 3.97418 1.62453C1.85718 1.49974 -0.00208319 2.0074 0.649776 3.6826C1.31123 5.38246 3.21909 4.71472 3.81792 4.58644C4.17091 4.51083 4.52793 4.68306 4.43946 5.28921C4.33717 5.99005 3.11029 6.65251 2.60982 7.07034C2.10935 7.48818 0.322663 8.5699 0.642138 9.38595C0.961612 10.202 2.33041 9.83973 3.56099 9.04279C4.79158 8.24585 6.00061 7.31404 6.57656 7.69129C7.15251 8.06855 6.52487 9.73439 6.35091 10.1518C6.17696 10.5691 4.93426 14.0871 6.59565 14.6954C8.25703 15.3036 9.12846 12.3666 9.25573 11.7647C9.38301 11.1628 9.56571 9.40171 10.1632 9.59078C10.7606 9.77986 11.0389 11.0912 11.1646 11.6626C11.2903 12.2339 11.8056 15.0288 13.1188 14.5335C14.4319 14.0382 13.5014 11.7159 12.8812 9.81946C12.2644 7.93365 12.4429 6.6464 12.6474 6.31241C12.8518 5.97842 13.2099 5.61626 13.845 5.71831C14.4801 5.82036 15.7244 7.71207 16.7543 8.77915C17.7843 9.84624 19.5749 10.9406 20.6171 9.6097C21.6592 8.27875 20.1899 6.31588 18.5319 4.65329C16.8739 2.9907 15.4526 2.37735 14.188 1.68267C12.9946 1.02704 12.2988 -0.523507 9.66291 0.436112Z" fill="#FFFFFF"/>
                </motion.svg>
            </motion.div>
        </motion.div>  
    );
  }
  