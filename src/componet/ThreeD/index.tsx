import { Canvas } from "@react-three/fiber"
// import { Bubble } from "./Bubble"
import { Character } from "./Character"
import { Bubble } from "./Bubble"

export const ThreeD = () => {

    return (
        <Canvas style={{ position: "absolute", pointerEvents: 'none' }}>
            <Environment />
            <group position={[0 + 2, 2, -2]}>
                <Bubble />
            </group>
            <group
                scale={8}
                position={[0, -13, 0 - 2]}
            >
                <Character />
            </group>
        </Canvas>
    )
}

const Environment = () => {
    return (
        <>
            <ambientLight intensity={10} />
        </>
    )
}




