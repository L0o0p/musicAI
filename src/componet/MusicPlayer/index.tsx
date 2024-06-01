import { useAtom } from 'jotai';
import { audioRefAtom, isPlayingAtom, useCurrentAudio, currentTimeAtom, currentDurationAtom, PlaybackModes, playbackModeAtom, diskRotationAtom } from '../../store';
import styles from './index.module.scss'
import { useEffect, useRef } from 'react';

export const MusicPlayer = () => {
    const { currentAudio } = useCurrentAudio();
    const audioRef = useRef<HTMLAudioElement>(null);
    const [, setAudioRef] = useAtom(audioRefAtom);
    const [isPlay] = useAtom(isPlayingAtom);
    const [, setCurrentTime] = useAtom(currentTimeAtom)
    const [, setCurrentDuration] = useAtom(currentDurationAtom)
    const [diskRotation, setDiskRotation] = useAtom(diskRotationAtom)

    // 吧ref赋值给更新的audio
    useEffect(() => {
        setAudioRef(audioRef);
    }, [audioRef, setAudioRef]);

    // 监听audio实际播放情况改变记录状态
    // 并且安装状态自动化：暂停 ｜ 播放
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handlePlay = () => {
            console.log('Play event triggered');
            setDiskRotation(true)// 这样自动播放的时候也会自动开启旋转
            console.log('变换了旋转状态', diskRotation)
        };

        const handlePause = () => {
            console.log('Pause event triggered');
            setDiskRotation(false)
            console.log('变换了旋转状态', diskRotation)
        };

        audio.addEventListener('play', handlePlay);
        audio.addEventListener('pause', handlePause);

        return () => {
            audio.removeEventListener('play', handlePlay);
            audio.removeEventListener('pause', handlePause);
        };
    }, []);
    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            if (isPlay) {
                // 监听canplaythrough事件，表示音频已经可以无缓冲播放
                audio.addEventListener('canplaythrough', function () {
                    console.log("Audio is fully loaded and can play through.");
                    // 显示音频时长
                    console.log("Duration: " + audio.duration + " seconds");
                    // 可以选择在这里自动播放
                    // audio.play();
                }, false);
                audio.play().catch(e => console.error('Error playing audio:', e));
                setDiskRotation(true)
                console.log('变换了旋转状态', diskRotation)
            } else {
                audio.pause();
                setDiskRotation(false)
                console.log('变换了旋转状态', diskRotation)
            }
        }
    }, [isPlay]);  // 只有当 isPlay 改变时，这个 useEffect 才会运行

    // 当音频加载元数据时，设置总时长
    useEffect(() => {
        if (!audioRef.current) return;
        const audio = audioRef.current;

        // 方法：更新音频【总时长】&&【已播放时长】
        const setAudioData = () => {
            setCurrentDuration(audio.duration);
            setCurrentTime(audio.currentTime);
        };
        // 方法：更新音频【已播放时长】
        const setAudioTime = () => setCurrentTime(audio.currentTime);

        audio.addEventListener('loadedmetadata', setAudioData);
        audio.addEventListener('timeupdate', setAudioTime);

        return () => {
            audio.removeEventListener('loadedmetadata', setAudioData);
            audio.removeEventListener('timeupdate', setAudioTime);
        };
    }, [currentAudio, setCurrentDuration, setCurrentTime]);

    // 处理多种播放模式的方法
    const [playbackMode] = useAtom(playbackModeAtom);
    const handleEnd = (mode: string, audioElement: HTMLAudioElement) => {
        switch (mode) {
            case PlaybackModes.REPEAT_ONE:
                if (audioElement) {
                    audioElement.currentTime = 0;
                    audioElement.play();
                }
                break;
            case PlaybackModes.REPEAT_ALL:
                // 如果是列表的最后一首，重新开始
                break;
            case PlaybackModes.SHUFFLE:
                // 随机选择一首歌曲播放
                break;
            case PlaybackModes.SEQUENTIAL:
                // 播放下一首歌曲，如果是最后一首则停止或重新开始
                break;
            default:
                // 默认处理方式
                break;
        }
    };
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.onended = () => handleEnd(playbackMode, audioRef.current);
        }
    }, [playbackMode]);

    return (
        <>
            <p className={styles.butttt}>
                <audio
                    ref={audioRef}
                    preload={'auto'}
                    controls={true}
                    autoPlay={true}
                    key={currentAudio.audioUrl}
                // muted
                >
                    <source src={currentAudio.audioUrl} type="audio/mp3" />
                </audio>
            </p>
        </>
    );
}
