import { useEffect, useRef, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from 'three';
import { useAtom } from "jotai";
import { ifClickShareAtom, isLoadingAtom, isPlayingAtom, useAction } from "../../../store";

export const Character = () => {
    const { actions, setActions } = useAction()
    const [ifClickShare] = useAtom(ifClickShareAtom)

    const glb_PATH = '/waterGuy.glb';
    const gltf = useLoader(GLTFLoader, glb_PATH);
    const expGltf = useLoader(GLTFLoader, '/expression.glb');
    const mixer = useRef<THREE.AnimationMixer | null>(null); // 使用 useRef 避免重复创建
    const [isPlay] = useAtom(isPlayingAtom)
    const [isLoading] = useAtom(isLoadingAtom)
    function setWeight(action: { enabled: boolean; setEffectiveTimeScale: (arg0: number) => void; setEffectiveWeight: (arg0: number) => void; }, weight: number) {
        action.enabled = true;
        action.setEffectiveTimeScale(1);
        action.setEffectiveWeight(weight);
    }
    function initializeAnimations(loadAnim: THREE.AnimationAction, singAnim: THREE.AnimationAction, standAnim: THREE.AnimationAction, throwAnim: THREE.AnimationAction) {

        setWeight(loadAnim, 0);
        setWeight(singAnim, 0);
        setWeight(standAnim, 1);
        setWeight(throwAnim, 0);


        actions.forEach(function (action) {
            action.play();
        });
    }
    function prepareCrossFade(startAction: THREE.AnimationAction, endAction: THREE.AnimationAction, defaultDuration = 0.4) {

        if (!startAction || !endAction) return; // 确保动作有效
        // Switch default / custom crossfade duration (according to the user's choice)

        const duration = defaultDuration;//setCrossFadeDuration(defaultDuration);

        // Make sure that we don't go on in singleStepMode, and that all actions are unpaused

        // singleStepMode = false;
        unPauseAllActions();

        // If the current action is 'idle' (duration 4 sec), execute the crossfade immediately;
        // else wait until the current action has finished its current loop
        executeCrossFade(startAction, endAction, duration);
    }
    function unPauseAllActions() {
        actions.forEach(action => {
            action.paused = false;
        });
    }
    function executeCrossFade(startAction: THREE.AnimationAction, endAction: THREE.AnimationAction, duration: number) {
        if (startAction && endAction) {
            setWeight(endAction, 1);
            endAction.time = 0;
            startAction.crossFadeTo(endAction, duration, true);
        }
    }
    useEffect(() => {
        console.log('loading?->', isLoading);
    }, [isLoading])
    useEffect(() => {
        if (gltf.scene && gltf.animations.length > 0) {
            mixer.current = new THREE.AnimationMixer(gltf.scene);
            console.log('gltf.animations', gltf.animations);

            const loadAnim = mixer.current.clipAction(gltf.animations[0]);
            const singAnim = mixer.current.clipAction(expGltf.animations[0]);
            const standAnim = mixer.current.clipAction(gltf.animations[2]);
            const throwAnim = mixer.current.clipAction(gltf.animations[3]);
            const actionsA = [loadAnim, singAnim, standAnim, throwAnim];
            setActions(actionsA);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        if (actions.length > 0) {
            initializeAnimations(actions[0], actions[1], actions[2], actions[3])
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [actions])
    const [currentIndex, setCurrentIndex] = useState(2)
    useEffect(() => {
        if (isPlay && !isLoading) {
            prepareCrossFade(actions[currentIndex], actions[1], 0.4)
            setCurrentIndex(1)
            console.log(actions[1]);
            console.log(isPlay);

        } else {
            prepareCrossFade(actions[currentIndex], actions[2], 0.4)
            setCurrentIndex(2)
            console.log(actions[2]);
            console.log(isPlay);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isPlay]);
    useEffect(() => {
        if (isLoading) {
            prepareCrossFade(actions[currentIndex], actions[0], 0.4)
            setCurrentIndex(0)
        } else {
            prepareCrossFade(actions[currentIndex], actions[2], 0.4)
            setCurrentIndex(2)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading]);
    useEffect(() => {
        if (ifClickShare) {
            prepareCrossFade(actions[currentIndex], actions[3], 0.4)
            setCurrentIndex(3)
        } else {
            prepareCrossFade(actions[currentIndex], actions[2], 0.4)
            setCurrentIndex(2)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ifClickShare]);
    useFrame((_, delta) => {
        mixer.current?.update(delta); // 更新动画
    });

    return <primitive object={gltf.scene} />;
};


