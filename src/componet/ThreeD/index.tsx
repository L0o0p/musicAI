import { Canvas } from "@react-three/fiber"
// import { Bubble } from "./Bubble"
import { Character } from "./Character"
import { Air } from "./Air"
import { OrbitControls, PerspectiveCamera } from "@react-three/drei"
import {  useRef } from "react"
import * as THREE from 'three'
import { useAtom } from "jotai"
import {  ifClickShareAtom } from "../../store"
import { motion } from "framer-motion-3d";

export const ThreeD = () => {

    return (
        <Canvas style={{ position: "absolute", pointerEvents: 'none' }}>
            <Light />
            <Camera />
            <Objects />
        </Canvas>
    )
}

const Light = () => {
    return (
        <>
            <ambientLight intensity={Math.PI / 2} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
            <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
            <ambientLight intensity={1} />
        </>
    )
}


const Camera = () => {
    const cameraRef = useRef<THREE.PerspectiveCamera>(null)
    const [ifClickShare] = useAtom(ifClickShareAtom)

    return (
        <>
            <motion.group
                animate={{
                    z: ifClickShare ? 10 : 0,
                    transition: {
                        duration: ifClickShare ? .8 : .2,
                    }
                }}
            >
                <PerspectiveCamera
                    makeDefault
                    ref={cameraRef}
                    position={[0, 0, 10]}
                    fov={45}
                />
            </motion.group>
            <OrbitControls enabled={false} />
        </>
    )
}



const Objects = () => {
    return (
        <>
            <group position={[0 + 2, 2, -2]}>
                {/* <Bubble /> */}
            </group>
            <group
                scale={8}
                position={[0, -13, 0 - 2]}
            >
                <Character />
                <Air />
            </group>
        </>
    )
}



