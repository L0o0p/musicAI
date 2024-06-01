import { atom, useAtom } from "jotai";


// 生成请求地址
// export const baseUrl = "https://suno-api-eta-seven.vercel.app";
export const baseUrl = "http://localhost:3000";

// 初始播放列表
export const initialPlayList = [
    { imageUrl: '/conclusion.jpeg', audioUrl: '/Im-sorry.mp3', name: 'Im-sorry' ,id: ''},
    { imageUrl: '/conclusion.jpeg', audioUrl: '/Feline Fever.mp3', name: 'Feline Fever', id: '' },
    { imageUrl: '/conclusion.jpeg', audioUrl: '/Desperate Boy.mp3', name: 'Desperate Boy', id: '' },
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
export const currentImgUrl = atom('https://telegraph-image-3k8.pages.dev/file/d03ab5e77f91cf312aa73.png');

// 碟片的旋转状态
export const diskRotationAtom = atom(true)

// 跨组件共享audioRef
export const audioRefAtom = atom(null);

// 监听音频实际播放状态
export const isPlayingAtom = atom<boolean>(false);
export const currentTimeAtom = atom<number>(0);
export const currentDurationAtom = atom<number>(0);

// 枚举播放模式
export const PlaybackModes = {
    REPEAT_ALL: 'REPEAT_ALL',  // 全部循环
    REPEAT_ONE: 'REPEAT_ONE',  // 单曲循环
    SHUFFLE: 'SHUFFLE',        // 随机播放
    SEQUENTIAL: 'SEQUENTIAL'   // 顺序播放
};
// 当前的播放模式状态
export const playbackModeAtom = atom(PlaybackModes.SEQUENTIAL)