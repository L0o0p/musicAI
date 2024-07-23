import { Canvas } from "@react-three/fiber"
// import { Bubble } from "./Bubble"
import { Character } from "./Character"
import { Bubble } from "./Bubble"
// import { OrthographicCamera } from "@react-three/drei"

export const ThreeD = () => {

    return (
        <Canvas style={{ position: "absolute", pointerEvents: 'none' }}>
            <Environment />
            {/* <OrthographicCamera /> */}
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
            <ambientLight intensity={Math.PI / 2} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
            <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
            <ambientLight intensity={1} />
        </>
    )
}




