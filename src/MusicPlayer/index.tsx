import { useState, useEffect, useRef } from 'react';
import { currentImgUrl, initialPlayList, useCurrentAudio } from '../store';
import { useAtom } from 'jotai';

function MusicPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [imgUrl] = useAtom(currentImgUrl);
    const audioPlayer = useRef<HTMLAudioElement>(null); // 访问audio元素
    const { currentAudio, setCurrentAudioIndex } = useCurrentAudio();
    const audioUrl = currentAudio.audioUrl;

    // 播放或暂停音乐
    const togglePlayPause = () => {
        const prevValue = isPlaying;
        setIsPlaying(!prevValue);
        if (audioPlayer.current) {
            if (!prevValue) {
                audioPlayer.current.play();
            } else {
                audioPlayer.current.pause();
            }
        }
    }

    // 当音频加载元数据时，设置总时长
    useEffect(() => {
        if (!audioPlayer.current) return;
        const audio = audioPlayer.current;
        const setAudioData = () => {
            setDuration(audio.duration);
            setCurrentTime(audio.currentTime);
        };

        const setAudioTime = () => setCurrentTime(audio.currentTime);

        audio.addEventListener('loadedmetadata', setAudioData);
        audio.addEventListener('timeupdate', setAudioTime);

        return () => {
            audio.removeEventListener('loadedmetadata', setAudioData);
            audio.removeEventListener('timeupdate', setAudioTime);
        };
    }, []);

    // 格式化时间显示
    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${String(seconds).padStart(2, '0')}`;
    };

    // 处理进度条的改变
    const handleProgress = (e: { target: { value: unknown; }; }) => {
        const manualChange = Number(e.target.value);
        if (audioPlayer.current) {
            audioPlayer.current.currentTime = (duration / 100) * manualChange;
        }
    };

    const preSongClick = () => {
        setCurrentAudioIndex((currentIndex) => (currentIndex - 1 + initialPlayList.length) % initialPlayList.length);
    }

    const nextSongClick = () => {
        setCurrentAudioIndex((currentIndex) => (currentIndex + 1) % initialPlayList.length);
    }

    return (
        <div>
            <div className='footageContainer' >
                <img style={{ height: '200px', width: '200px', borderRadius: '30px' }} src={imgUrl} alt="conclusion" />
                <audio
                    ref={audioPlayer}
                    src={audioUrl}
                    preload="metadata"
                />
            </div>
            <input
                type="range"
                value={duration ? (currentTime / duration) * 100 : 0}
                onChange={handleProgress}
            />
            <div>
                <span>{formatTime(currentTime)}</span> / <span>{formatTime(duration)}</span>
            </div>

            <button id={'preSong'} onClick={preSongClick}>⬅️</button>
            <button id={'playSong'} onClick={togglePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
            <button id={'nextSong'} onClick={nextSongClick}>➡️</button>

        </div>
    );
}

export default MusicPlayer;