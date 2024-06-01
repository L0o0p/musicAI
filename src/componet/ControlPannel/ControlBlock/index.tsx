import { useAtom } from "jotai";
import { icon } from '../iconStore'
import styles from './index.module.scss';
import { PlaybackModes, audioRefAtom, baseUrl, currentAudioIndexAtom, isPlayingAtom, playListAtom, playbackModeAtom, useCurrentAudio } from "../../../store";
import axios from "axios";

export const ControlBlock = () => {

    return (
        <div className={styles.controlBlock}>
            <PlayMode />
            <PlayControl />
            <Download />
        </div>
    )
}

// 变更播放模式按钮
const PlayMode = () => {
    const [playbackMode, setPlaybackMode] = useAtom(playbackModeAtom);
    const handleModeChange = () => {
        const modes = Object.values(PlaybackModes);
        const currentModeIndex = modes.indexOf(playbackMode);
        const nextModeIndex = (currentModeIndex + 1) % modes.length;
        setPlaybackMode(modes[nextModeIndex]);
        console.log('更改了播放模式，当前为：', playbackMode, '模式')
    };
    return (
        <div className={styles.playmode} onClick={handleModeChange}>
            <img className={styles.featherButton} src={icon.playmode} />
        </div>
    )
}
const fetchNewAudioUrl = async (id: string) => {
    try {
        const response = await fetch(`http://localhost:3000//api/feed/ids=${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch audio:', error);
        return null;
    }
};
// 下载按钮
const Download = () => {
    // const { currentAudio } = useCurrentAudio()
    const download = () => {
        // const baseUrl = 'https://studio-api.suno.ai/api/gen/';
        // const url = `${baseUrl}${currentAudio.id}/increment_action_count/`;
        const url = '/api/e7458276-2a70-4437-aca8-7a0128830813/increment_action_count/';

        fetch(url, {
            method: 'POST', // 或 'POST'
            headers: {
                'Authorization': 'Bearer', // 如果需要的话
                'Content-Type': 'application/json/mp3'
            }
        })
            .then(response => {
                if (response.ok) return response.blob();
                throw new Error('Network response was not ok.');
            })
            .then(blob => {
                // 创建一个链接并模拟点击以下载音频文件
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = 'audio.mp3'; // 或其他文件名
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
            })
            .catch(error => console.error('Failed to fetch audio:', error));
    };
    return (
        <div className={styles.download}>
            <img className={styles.featherButton} src={icon.download} onClick={() => { download(); console.log('功能键') }} />
        </div>
    )
}

// 播放控制按钮组件（上一曲、暂停｜播放、下一曲）
const PlayControl = () => {
    const { setCurrentAudioIndex, currentAudio } = useCurrentAudio()
    const [playList] = useAtom(playListAtom)
    const [isPlay, setIsPlaying] = useAtom(isPlayingAtom)

    const next = () => {
        console.log('next', currentAudio.audioUrl)
        setCurrentAudioIndex((currentIndex) => (currentIndex + 1) % playList.length);
        setIsPlaying(true);

    }
    const previous = () => {
        console.log('next', currentAudio.audioUrl)
        setCurrentAudioIndex((currentIndex) => (currentIndex - 1 + playList.length) % playList.length);
        setIsPlaying(true);
    }
    const play = () => {
        setIsPlaying(true);
    };
    const pause = () => {
        setIsPlaying(false);
    };
    // 播放或暂停音乐
    const togglePlayPause = () => {
        isPlay ? pause() : play()

    };

    return (
        <div className={styles.playControl}>
            <img
                className={styles.featherButton}
                src={icon.previousbutton}
                onClick={previous}
            />
            <img
                className={styles.playbutton}
                src={isPlay ? icon.playButtonT : icon.playButtonF}
                onClick={togglePlayPause}
            />
            <img
                className={styles.featherButton}
                src={icon.nextbutton}
                onClick={next}
            />
        </div>
    )
}


