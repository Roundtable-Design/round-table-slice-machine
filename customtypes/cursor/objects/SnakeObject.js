import { motion } from "framer-motion";
import useMousePosition from "../utils/useMousePosition";

export default function SnakeObject() {

    const { x, y } = useMousePosition();
    const radius = 0;

    const angles = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 
                    100, 110, 120, 130, 140, 150, 160, 170, 180, 
                    190, 200, 210, 220, 230, 240, 250, 260, 270, 
                    280, 290, 300, 310, 320, 330, 340,, 350, 360];

    return (
        <motion.div
            animate={{ x: x-radius, y: y-radius, }}
            transition={{ duration: 0.20 }} >
            <motion.div
                className="h-20px w-20px absolute" 
                animate={{ rotate: angles }}
                transition={{ repeat: Infinity, duration: 1.3 }} >
                <motion.svg
                    width="21" height="11" viewBox="0 0 21 11" fill="none" xmlns="http://www.w3.org/2000/svg"
                    className="absolute"
                    animate={{ x: 0 }} >
                    <path d="M15.5336 10.5092L18.4161 9.79349C19.517 9.52015 20.3322 8.59162 20.4607 7.46463C20.6893 5.46026 18.7167 3.91983 16.8204 4.60825C15.7302 5.00402 14.5029 4.67004 13.7689 3.77205L12.985 2.81303C11.8752 1.45523 10.0019 0.993868 8.38847 1.68102L6.48261 2.49272C5.71825 2.81826 4.83135 2.51658 4.42403 1.79248C3.68551 0.479619 1.71378 0.785919 1.40836 2.26096L0.973495 4.36112C0.77762 5.30709 1.16009 6.27932 1.94798 6.83828L2.75464 7.41055C3.73225 8.1041 4.97212 8.31563 6.12438 7.98546L7.05382 7.71913C8.63664 7.26558 10.3369 7.80847 11.364 9.09536C12.3582 10.341 13.9869 10.8932 15.5336 10.5092Z" fill="white"/>
                </motion.svg>
            </motion.div>
        </motion.div>
    );
  }
  