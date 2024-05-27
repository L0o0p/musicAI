import { useState, useRef, useEffect } from 'react';
import { useCurrentAudio } from '../store';
import './index.module.scss'

const AudioPlayer = () => {
    const { currentAudio, setCurrentAudioIndex } = useCurrentAudio();
    const audioRef = useRef(new Audio(currentAudio.audioUrl));
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(1);  // 默认音量为1

    const handleVolumeChange = (event) => {
        const newVolume = event.target.value;
        audioRef.current.volume = newVolume;
        setVolume(newVolume);
    };

    useEffect(() => {
        const audio = audioRef.current;
        audio.addEventListener('loadedmetadata', () => {
            setDuration(audio.duration);
        });
        audio.addEventListener('timeupdate', () => {
            setCurrentTime(audio.currentTime);
        });

        return () => {
            audio.removeEventListener('loadedmetadata', () => setDuration(audio.duration));
            audio.removeEventListener('timeupdate', () => setCurrentTime(audio.currentTime));
        };
    }, []);

    const togglePlayPause = () => {
        const audio = audioRef.current;
        if (audio.paused) {
            audio.play();
            setIsPlaying(true);
        } else {
            audio.pause();
            setIsPlaying(false);
        }
    };

    const handleSliderChange = (e) => {
        const audio = audioRef.current;
        audio.currentTime = (audio.duration / 100) * e?.target.value;
        setCurrentTime(audio.currentTime);
    };

    return (
        <div className="audioPlayer">
            <button onClick={togglePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
            <input
                type="range"
                value={(currentTime / duration) * 100 || 0}
                onChange={handleSliderChange}
            />
            <div>
                <label htmlFor="volumeControl">Volume: </label>
                <input
                    id="volumeControl"
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                />
            </div>
            <div>
                <a href={currentAudio.audioUrl} download>
                    <button>Download</button>
                </a>
            </div>
        </div>
    );
};

export default AudioPlayer;