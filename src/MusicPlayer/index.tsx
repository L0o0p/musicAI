import { initialPlayList, useCurrentAudio } from '../store';
import styles from './index.module.scss'

export const MusicPlayer = () => {
    const { currentAudio, setCurrentAudioIndex } = useCurrentAudio();
    // 下一曲
    const State = '当前曲目:' + currentAudio.audioUrl
    const next = () => {
        console.log('next', currentAudio.audioUrl)
        setCurrentAudioIndex((currentIndex) => (currentIndex + 1) % initialPlayList.length);
    }
    const Previous = () => {
        console.log('next', currentAudio.audioUrl)
        setCurrentAudioIndex((currentIndex) => (currentIndex - 1 + initialPlayList.length) % initialPlayList.length);
    }
    // 
    return (
        <>
            <p className={styles.butttt}>
                <audio preload='true' controls={true} autoPlay={true} key={currentAudio.audioUrl}>
                    {<source src={currentAudio.audioUrl} type="audio/mp3" />}
                </audio>
            </p>
            <p className={styles.butttt}>
                <div className={styles.butP} onClick={Previous}>⏮</div>
                <div className={styles.butN} onClick={next}>⏭</div>
            </p>
            <p>{State}</p>
        </>
    );
}
