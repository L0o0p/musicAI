import { useAtom } from "jotai";
import { icon } from '../iconStore'
import styles from './index.module.scss';
import { audioInfoAtom, baseUrl, isPlayingAtom, playListAtom, useCurrentAudio } from "../../../store";
import axios from "axios";
import { useEffect, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { playMode, usePlayMode } from "../../../store/mode";

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
    // console.log(1)
    const { currentPlayModeIndex, setCurrentPlayModeIndex, currentPlayMode } = usePlayMode()
    const changeMode = () => {
        const newPlaymodeIndex = (currentPlayModeIndex < playMode.length - 1 ? (currentPlayModeIndex + 1) : 0)
        setCurrentPlayModeIndex(newPlaymodeIndex)
        console.log('播放模式切换为：', currentPlayMode);
    }
    return (
        <div className={styles.playmode} onClick={changeMode}>
            <img className={styles.featherButton} src={icon.playmode0} />
        </div>
    )
}

// 下载按钮
const Download = () => {
    // 假设 useCurrentAudio 是一个 Hook，返回当前音频的相关信息
    const [loading, setLoading] = useState<boolean>(false);
    const { currentAudio } = useCurrentAudio()
    const [audioInfo, setAudioInfo] = useAtom(audioInfoAtom)
    // 函数：重新获取当前音频的信息（包含生成的mp3）
    async function getAudioInformation(audioIds: string) {
        setLoading(true);
        const url = `${baseUrl}/api/get?ids=${audioIds}`;
        const response = await axios.get(url)
            .catch(error => {
                console.error('API请求失败:', error);
                if (error.response) {
                    alert(`错误: ${error.response.status} ${error.response.data.message}`);
                } else if (error.request) {
                    alert('服务器响应超时，请检查您的网络连接或稍后再试。');
                } else {
                    alert('请求失败，请检查您的请求配置或稍后再试。');
                }
                return null;  // 返回 null 以避免后续代码执行
            });

        if (response && response.data) {  // 确保 response 和 response.data 都有效
            setAudioInfo(response.data[0]);
        }
        setLoading(false);
    }
    // 函数：根据重新获取到的url下载mp3文件
    function downloadAudio() {
        if (audioInfo && audioInfo.audio_url !== '') {
            const audioUrl = audioInfo.audio_url;
            // 使用 fetch API 下载文件
            fetch(audioUrl)
                .then(response => response.blob()) // 转换为 blob
                .then(blob => {
                    // 创建一个指向该 Blob 的 URL
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.style.display = 'none';
                    a.href = url;
                    a.download = audioInfo.title, ".mp3"; // 指定下载文件名
                    document.body.appendChild(a);
                    a.click();

                    // 清理
                    window.URL.revokeObjectURL(url);
                    document.body.removeChild(a);
                })
                .catch(e => console.error('下载失败:', e));
        }
    }
    // 点击下载
    async function downloadMP3(audioId = currentAudio) {
        getAudioInformation(audioId.id);
    }
    // 获取到自动执行下载方法
    useEffect(() => {
        downloadAudio()
    }, [audioInfo?.audio_url])
    return (
        <div className={styles.download}>
            {loading ? <LoadingOutlined /> : <img className={styles.featherButton} src={icon.download} onClick={() => { downloadMP3(); console.log('Download clicked') }} />
            }
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


