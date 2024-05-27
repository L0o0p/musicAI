import { useEffect, useState } from 'react'
import { initialPlayList, useCurrentAudio } from '../store'
import styles from './index.module.scss'
// 歌单组件
export const ListCom = () => {
    // 歌单初始状态
    const initSelect = [true, false, false]
    const [select, selected] = useState(initSelect)
    // 自动切换歌单状态（根据当前播放音乐）
    const { currentAudioIndex, setCurrentAudioIndex } = useCurrentAudio()
    useEffect(() => {
        const newSelect = select.slice().fill(false)
        newSelect[currentAudioIndex] = true;
        selected(newSelect);
        console.log('clicked playlist', currentAudioIndex, select);
    }, [currentAudioIndex, select])
    //歌单点击事件
    const handleClick = (index: number) => {
        setCurrentAudioIndex(index)
    }
    return (
        <div className={styles.playlist}>
            <div className={styles.header}>播放列表</div>
            <div className={styles.line}></div>
            <div className={styles.content}>
                {initialPlayList.map((item, index) => (
                    <div
                        key={index}
                        className={styles.item}
                        onClick={() => { handleClick(index) }} // 暂时禁用
                        style={select[index] ? { fontWeight: 500, backgroundColor: 'gray', color: 'white' } : {}}
                    >
                        {item.audioUrl}
                    </div>
                ))}
            </div>
        </div>

    )
}