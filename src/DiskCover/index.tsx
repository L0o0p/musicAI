import { useAtom } from 'jotai';
import { currentImgUrl } from '../store';
import styles from './index.module.scss'

export const DiskCover = () => {
    const [imgUrl] = useAtom(currentImgUrl);

    return (
        <img
            className={styles.cover}
            src={imgUrl}
            alt="💿 Cover"
        />
    )
}