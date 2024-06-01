import { useAtom } from 'jotai';

// import { useState } from 'react';
import styles from './index.module.scss'
import { currentImgUrl, diskRotationAtom } from '../../store';
import { MusicPlayer } from '../MusicPlayer';
// import { ListCom } from '../ListCom';

export const DiskCover = () => {
    const [imgUrl] = useAtom(currentImgUrl);
    const [diskRotation] = useAtom(diskRotationAtom);
    // const [display, setDis] = useState(false)
    // const changeDisplay = () => setDis(!display)

    return (
        <div className={styles.cover}>

            {/* <div className={styles.ListCom} style={display ? { backgroundColor: ' #242424' } : {}}>
                <ListCom display={display} setDis={changeDisplay} />
            </div> */}
            <img
                className={diskRotation ? styles.diskImg : styles.img}
                src={imgUrl}
                alt="💿 Cover"
            />
            <MusicPlayer />

        </div>
    )
}