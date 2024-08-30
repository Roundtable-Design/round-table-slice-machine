import { motion } from "framer-motion";
import useMousePosition from "../utils/useMousePosition";

export default function FollowingObject(props) {

    const angles = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 
                    100, 110, 120, 130, 140, 150, 160, 170, 180, 
                    190, 200, 210, 220, 230, 240, 250, 260, 270, 
                    280, 290, 300, 310, 320, 330, 340,, 350, 360];
    const smth = Math.floor(Math.floor((Math.random())*1000)/(1000/360))
   
    // let angles = []
    // let smth = Math.floor(Math.floor((Math.random())*1000)/(1000/360))
    // for (let i = 0; i <= 36; i++) {
    //     angles.push(smth+(i*10))
    // }

    
    

    return (
        <motion.div
            // className={`h-20px w-20px absolute rotate-180`}
            initial={{ scale: 0, rotate: smth, x: props.x, y: props.y, }}
            animate={{ scale: 2, x: props.x, y: props.y, }}
            exit={{ scale: 0 }}
            transition={{ duration: props.movingSpeed }} >
            <motion.div
                // initial={{ rotate: smth }}
                animate={{ rotate: angles }}
                transition={{ repeat: Infinity, duration: props.rotationSpeed }} 
                className={`h-10px w-10px absolute`}
                >
                    <motion.svg 
                        width={props.width} height={props.height} viewBox={props.viewBox} fill="none" xmlns="http://www.w3.org/2000/svg"
                        className="absolute" >
                        <path d={props.paths[0]} fill="#FFFFFF"/>
                </motion.svg>
            </motion.div>
        </motion.div>  
    );
  }
  