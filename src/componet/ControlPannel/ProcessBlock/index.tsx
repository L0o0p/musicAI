import styles from './index.module.scss';
import { useAtom } from "jotai";
import { audioRefAtom, currentDurationAtom, currentTimeAtom } from "../../../store";

export const ProcessBlock = () => {
    const [currentTime, setCurrentTime] = useAtom(currentTimeAtom)
    const [currentDuration] = useAtom(currentDurationAtom)
    const [audioRef] = useAtom(audioRefAtom)


    // 格式化时间显示
    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${String(seconds).padStart(2, '0')}`;
    };
    // 处理进度条的改变
    const handleProgress = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = (e.target.valueAsNumber / 100) * currentDuration;
        // setCurrentTime((currentDuration / 100) * newTime); 
        if (audioRef) {
            audioRef.current.currentTime = (currentDuration / 100) * newTime;
        }
    };

    return (
        <div className={styles.processBlock}>
            <div className={styles.processBar}>
                <input
                    type="range"
                    className={styles.bar}
                    min="0"
                    max="100"
                    value={currentDuration ? (currentTime / currentDuration) * 100 : 0}
                    onChange={handleProgress}
                />
            </div>

            <div className={styles.processTime}>
                <span>{formatTime(currentTime)}</span>  <span>{formatTime(currentDuration)}</span>
            </div>
        </div>
    )
}
