import { atom, useAtom } from "jotai";

// 初始播放列表
export const Lib = [
    { imageUrl: '/conclusion.jpeg', audioUrl: '/Im-sorry.mp3' },
    { imageUrl: '/conclusion.jpeg', audioUrl: '/Feline Fever.mp3' },
    { imageUrl: '/conclusion.jpeg', audioUrl: '/Desperate Boy.mp3' },
];

// 当前播放曲目编号
export const currentIndexAtom = atom(0);

// 当前播放曲目
export function useCurrentPlay() {
    const [index] = useAtom(currentIndexAtom)// 取出当前索引
    const currentPlayAtom = atom(Lib[index]);// 定义当前播放曲目变量
    return currentPlayAtom
}