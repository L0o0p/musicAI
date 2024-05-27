import { useAtom } from 'jotai';
import { currentImgUrl } from '../store';
import { useState } from 'react';
import styles from './index.module.scss'
import { ListCom } from '../ListCom';

export const DiskCover = () => {
    const [imgUrl] = useAtom(currentImgUrl);
    const [display, setDis] = useState(true)
    const changeDisplay = () => setDis(!display)

    return (
        <div className={styles.cover}>

            <div className={styles.ListCom} style={display ? { backgroundColor: ' #242424' } : {}}>
                <ListCom display={display} setDis={changeDisplay} />
            </div>
            <img
                className={styles.img}
                src={imgUrl}
                alt="💿 Cover"
            />
        </div>
    )
}