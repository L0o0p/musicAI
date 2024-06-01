import { useCurrentAudio } from '../../../store';
import { icon } from '../iconStore'
import styles from './index.module.scss';


export const TitleBlock = () => {
    const { currentAudio } = useCurrentAudio();
    const songName = currentAudio.name
    const getShareLink = () => {
        console.log('点击分享', songName, currentAudio.audioUrl);
        document.getElementById('shareLink')?.addEventListener('click', function () {
            const textToCopy = currentAudio.audioUrl;// 需要复制的文本内容
            navigator.clipboard.writeText(textToCopy).then(() => {
                console.log('分享链接已成功复制到剪贴板->', currentAudio.audioUrl);
                alert('分享链接已成功复制到剪贴板');
            }).catch(err => {
                console.error('无法复制链接: ', err);
                alert('无法复制链接: ');
            });
        });
    }
    return (
        <div className={styles.titleBlock}>
            <div className={styles.title}>
                {songName}
            </div>
            <div id={'shareLink'} className={styles.shareIcon} onClick={getShareLink}>
                <img style={{ width: '24px', height: '24px' }} src={icon.shareIcon} />
            </div>
        </div>
    )
}