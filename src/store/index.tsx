import { atom, useAtom } from "jotai";

// 初始播放列表
export const initialPlayList = [
    { imageUrl: '/conclusion.jpeg', audioUrl: '/Im-sorry.mp3' },
    { imageUrl: '/conclusion.jpeg', audioUrl: '/Feline Fever.mp3' },
    { imageUrl: '/conclusion.jpeg', audioUrl: '/Desperate Boy.mp3' },
];

// Atom to store the playlist
export const playListAtom = atom(initialPlayList);

// Atom to store the current audio index
export const currentAudioIndexAtom = atom(0);

// Hook to access and update current audio
export const useCurrentAudio = () => {
    const [playList, setPlayList] = useAtom(playListAtom);
    const [currentAudioIndex, setCurrentAudioIndex] = useAtom(currentAudioIndexAtom);

    const setCurrentAudioUrl = (audioUrl:string) => {
        const newPlayList = [...playList];
        newPlayList[currentAudioIndex] = {
            ...newPlayList[currentAudioIndex],
            audioUrl: audioUrl // Update the audio URL
        };
        setPlayList(newPlayList);
    };

    const currentAudio = playList[currentAudioIndex];
    return { currentAudio, setCurrentAudioIndex, setCurrentAudioUrl };
};