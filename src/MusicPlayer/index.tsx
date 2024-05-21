import { useState, useEffect, useRef } from 'react';
function MusicPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const audioPlayer = useRef(); // 访问audio元素
    const footage = { imagUrl: '/conclusion.jpeg', audioUrl: '/conclusion.mp3' }

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
        };
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
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${String(seconds).padStart(2, '0')}`;
    };

    // 处理进度条的改变
    const handleProgress = (e) => {
        const manualChange = Number(e.target.value);
        audioPlayer.current.currentTime = (duration / 100) * manualChange;
    };

    return (
        <div>
            <div className='footageContainer' >
                <img style={{ height: '200px', width: '200px', borderRadius: '30px' }} src={footage.imagUrl} alt="conclusion" />
                <audio
                    ref={audioPlayer}
                    src={footage.audioUrl}
                    preload="metadata"
                />
            </div>
            <button onClick={togglePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
            <input
                type="range"
                value={duration ? (currentTime / duration) * 100 : 0}
                onChange={handleProgress}
            />
            <div>
                <span>{formatTime(currentTime)}</span> / <span>{formatTime(duration)}</span>
            </div>
        </div>
    );
}

export default MusicPlayer;