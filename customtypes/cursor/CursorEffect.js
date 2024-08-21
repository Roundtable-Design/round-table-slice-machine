import FlowerObject from "./objects/FlowerObject";
import BlotObject from "./objects/BlotObject";
import UnionObject from "./objects/UnionObject";
import LeavesObject from "./objects/LeavesObject";
import SnakeObject from "./objects/SnakeObject";

import { motion } from "framer-motion";

export default function CursorEffect() {

  return (
    <motion.div
        className="bg-white  absolute  mix-blend-difference pointer-events-none">

        <UnionObject />
        <LeavesObject />
        <FlowerObject />
        <SnakeObject />
        <BlotObject />

    </motion.div>

  );
}