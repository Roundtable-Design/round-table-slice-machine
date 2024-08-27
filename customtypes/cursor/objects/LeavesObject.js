import { motion } from "framer-motion";
import useMousePosition from "../utils/useMousePosition";

export default function LeavesObject(props) {

    const angles = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 
                    100, 110, 120, 130, 140, 150, 160, 170, 180, 
                    190, 200, 210, 220, 230, 240, 250, 260, 270, 
                    280, 290, 300, 310, 320, 330, 340,, 350, 360];
    const smth = Math.floor(Math.floor((Math.random())*1000)/(1000/360))

    return (
        <motion.div
            initial={{ scale: 1, rotate: smth, x: props.x, y: props.y, }}
            animate={{ scale: 1, x: props.x, y: props.y, }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.15 }} >
            <motion.div
                className="h-20px w-20px absolute" 
                animate={{ rotate: angles }}
                transition={{ repeat: Infinity, duration: 1.1 }} >
                <motion.svg
                    width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg"
                    className="absolute"
                    animate={{ x: 0 }} >
                    <path d="M0.133883 14.5717C-0.87461 8.58985 4.06158 3.48114 6.65574 1.67452C7.75539 0.818647 7.87957 1.88503 8.04472 2.74217C8.20987 3.59931 8.15368 15.2756 7.72665 17.8273C7.29961 20.379 5.63334 20.8761 5.30604 20.9511C4.97873 21.026 1.3945 22.049 0.133883 14.5717Z" fill="#FFFFFF"/>
                    <path d="M19.9905 13.7791C20.2656 7.32974 14.4762 2.10861 11.5471 0.30422C10.2938 -0.556988 10.3026 0.589996 10.2417 1.51516C10.1808 2.44032 11.7478 14.9291 12.5213 17.6378C13.2947 20.3466 15.0904 20.7959 15.4402 20.8599C15.79 20.9239 19.6467 21.8409 19.9905 13.7791Z" fill="#FFFFFF"/>
                </motion.svg>
            </motion.div>
        </motion.div>
    );
  }
  