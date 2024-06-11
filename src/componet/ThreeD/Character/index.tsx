


import { characterAnimationAtom, isLoadingAtom, isPlayingAtom } from '../../../store';
import * as THREE from 'three'
import { useGLTF, useAnimations, useFBX } from '@react-three/drei'
import { useEffect, useRef } from "react";
import { useAtom } from "jotai";

export function Character() {
    const { nodes, materials } = useGLTF('/character.glb')
    const ref = useRef<THREE.Group>(null);
    const { animations: idle } = useFBX('./animations/Idle.fbx')
    const { animations: listening } = useFBX('./animations/ListeningMusic.fbx')
    const { animations: singsing } = useFBX('./animations/singing.fbx')
    const [isloading] = useAtom(isLoadingAtom)
    console.log('listening:', listening);
    idle[0].name = 'idle'
    listening[0].name = 'listen'
    singsing[0].name = 'sing'
    const { actions } = useAnimations([listening[0], idle[0], singsing[0]], ref)
    const [isPlaying] = useAtom(isPlayingAtom)
    const [characterAnimation, setCharacterAnimation] = useAtom(characterAnimationAtom)

    useEffect(() => {
        actions[characterAnimation]?.play();
        const a = isloading ? 'listen' : (isPlaying ? 'sing' : 'idle')
        setCharacterAnimation(a)
    }, [isPlaying, characterAnimation, isloading])

    // 在组件挂载时播放动作 'Praying'，并在组件卸载时重置并停止它。
    // useEffect(() => {
    //     actions[characterAnimation]?.play();
    //     setTimeout(() => { setState(!state) }, 2400)
    // }, [state]);

    return (
        <group ref={ref} dispose={null}>
            <group name="Scene">
                <group name="Armature">
                    <primitive object={nodes.Hips} />
                    <skinnedMesh name="Wolf3D_Body" geometry={nodes.Wolf3D_Body.geometry} material={materials.Wolf3D_Body} skeleton={nodes.Wolf3D_Body.skeleton} />
                    <skinnedMesh name="Wolf3D_Hair" geometry={nodes.Wolf3D_Hair.geometry} material={materials.Wolf3D_Hair} skeleton={nodes.Wolf3D_Hair.skeleton} />
                    <skinnedMesh name="Wolf3D_Outfit_Bottom" geometry={nodes.Wolf3D_Outfit_Bottom.geometry} material={materials.Wolf3D_Outfit_Bottom} skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton} />
                    <skinnedMesh name="Wolf3D_Outfit_Footwear" geometry={nodes.Wolf3D_Outfit_Footwear.geometry} material={materials['aleksandr@readyplayer']} skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton} />
                    <skinnedMesh name="Wolf3D_Outfit_Top" geometry={nodes.Wolf3D_Outfit_Top.geometry} material={materials.Wolf3D_Outfit_Top} skeleton={nodes.Wolf3D_Outfit_Top.skeleton} />
                    <skinnedMesh name="EyeLeft" geometry={nodes.EyeLeft.geometry} material={materials.Wolf3D_Eye} skeleton={nodes.EyeLeft.skeleton} morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary} morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences} />
                    <skinnedMesh name="EyeRight" geometry={nodes.EyeRight.geometry} material={materials.Wolf3D_Eye} skeleton={nodes.EyeRight.skeleton} morphTargetDictionary={nodes.EyeRight.morphTargetDictionary} morphTargetInfluences={nodes.EyeRight.morphTargetInfluences} />
                    <skinnedMesh name="Wolf3D_Head" geometry={nodes.Wolf3D_Head.geometry} material={materials.Wolf3D_Skin} skeleton={nodes.Wolf3D_Head.skeleton} morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences} />
                    <skinnedMesh name="Wolf3D_Teeth" geometry={nodes.Wolf3D_Teeth.geometry} material={materials.Wolf3D_Teeth} skeleton={nodes.Wolf3D_Teeth.skeleton} morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences} />
                </group>
            </group>
        </group>
    )
}

useGLTF.preload('/character.glb')
