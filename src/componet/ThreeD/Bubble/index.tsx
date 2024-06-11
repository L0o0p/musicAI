import { motion } from "framer-motion-3d"
import { BubbleModel } from "./BubbleModel"
import { BubbleContent } from "./BubbleContent"
import { useAtomValue } from "jotai"
import { showBubbleAtom } from "../../../store"


const initial = { opacity: 0, scale: 0 }
const animate = {
    opacity: 1,
    scale: [0, 1.2, 1],
}

export const Bubble = () => {
    const state = useAtomValue(showBubbleAtom)
    return (
        <motion.group
            initial={initial}
            animate={state ? animate : initial}
        >
            <BubbleModel />
            <BubbleContent />
        </motion.group>
    )
}