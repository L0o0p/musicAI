import { atom, useAtom } from "jotai";

// 初始播放列表
export const initialPlayList = [
    { imageUrl: '/conclusion.jpeg', audioUrl: '/Im-sorry.mp3', name: 'Im-sorry' },
    { imageUrl: '/conclusion.jpeg', audioUrl: '/Feline Fever.mp3', name: 'Feline Fever' },
    { imageUrl: '/conclusion.jpeg', audioUrl: '/Desperate Boy.mp3', name: 'Desperate Boy' },
];

// 暴露初始播放列表
export const playListAtom = atom(initialPlayList);

// 暴露当前播放的音频索引
export const currentAudioIndexAtom = atom(0);

// Hook to access and update current audio
export const useCurrentAudio = () => {
    // 读取、更新整个播放列表
    const [playList, setPlayList] = useAtom(playListAtom);
    // 读取、更新当前播放的音频索引
    const [currentAudioIndex, setCurrentAudioIndex] = useAtom(currentAudioIndexAtom);
    // 更新当前播放的音频，传入新的音频url，复制播放列表，使用当前索引，让当前播放的对象音频url接收新的音频url
    const setCurrentAudioUrl = (audioUrl: string) => {
        const newPlayList = [...playList];
        newPlayList[currentAudioIndex] = {
            ...newPlayList[currentAudioIndex],
            audioUrl: audioUrl // Update the audio URL
        };
        setPlayList(newPlayList);
    };

    const setCurrentAudioName = (audioName: string) => {
        const newPlayList = [...playList];
        newPlayList[currentAudioIndex] = {
            ...newPlayList[currentAudioIndex],
            name: audioName // Update the audio URL
        };
        setPlayList(newPlayList);
    };
    const currentAudio = playList[currentAudioIndex];
    return { currentAudio, setCurrentAudioIndex, currentAudioIndex, setCurrentAudioUrl, setCurrentAudioName };
};

// 当前音频封面url
export const currentImgUrl = atom('/conclusion.jpeg');
