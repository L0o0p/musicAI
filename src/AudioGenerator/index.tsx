import { useEffect, useState } from 'react';
import axios from 'axios';
import { useCurrentAudio, currentImgUrl } from '../store';
import { useAtom } from 'jotai';
import styles from './index.module.scss'
import { MusicPlayer } from '../MusicPlayer';

interface AudioInfo {
    id: string;
    status: string;
    audio_url: string;
    image_url: string;
}

function AudioGenerator() {
    const [prompt, setPrompt] = useState<string>('');
    const [audioInfo, setAudioInfo] = useState<AudioInfo | null>(null);
    const [, setimgUrl] = useAtom<string>(currentImgUrl);
    const [loading, setLoading] = useState<boolean>(false);
    const [intervalId, setIntervalId] = useState<number | null>(null);
    const { setCurrentAudioUrl } = useCurrentAudio();

    // const baseUrl = "https://suno-api-eta-seven.vercel.app";
    const baseUrl = "http://localhost:3000";


    useEffect(() => {
        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [intervalId]);

    const handleGenerateAudio = async () => {
        setLoading(true);
        try {
            const response = await axios.post(`${baseUrl}/api/generate`, {
                prompt,
                make_instrumental: false,
                wait_audio: false
            }, {
                headers: { "Content-Type": "application/json" }
            });

            if (response.status === 200) {
                console.log('status:', response.status, 'response', response);
                let pollCount = 0;  // 轮询计数器
                const maxPolls = 12;  // 最大轮询次数

                const newIntervalId = setInterval(async () => {
                    console.log('轮询开始');
                    pollCount++;  // 每次轮询时增加计数器

                    console.log('response.data', response.data);
                    const checkResponse = await axios.get(`${baseUrl}/api/get?ids=${(response.data as { id: string }[]).map(d => d.id).join(',')}`);
                    console.log('接收到response:', checkResponse);

                    // 这里应该检查 checkResponse 的状态，而不是 response
                    if (checkResponse.data[0].audio_url && checkResponse.data[0].audio_url !== '') {
                        clearInterval(newIntervalId);
                        setIntervalId(null);  // 假设你有一个函数setIntervalId来管理这个ID
                        updateAudioInfo(checkResponse.data[0]);  // 确保传递正确的信息到 updateAudioInfo
                        updateImageInfo(checkResponse.data[0]);
                        console.log('信息获取完毕，结束轮询');
                    }

                    // 如果达到最大轮询次数，停止轮询
                    if (pollCount >= maxPolls) {
                        clearInterval(newIntervalId);
                        setIntervalId(null);  // 假设你有一个函数setIntervalId来管理这个ID
                        console.log('达到最大轮询次数，结束轮询');
                    }
                }, 5000);
                setIntervalId(newIntervalId);  // 假设你有一个函数setIntervalId来管理这个ID
            } else {
                console.log('轮询失败', response);
                updateAudioInfo(response.data);  // 确保传递正确的信息到 updateAudioInfo
            }
            console.log('轮训结束', response)// here
        } catch (error) {
            console.error('Error generating audio:', error);
            alert('Failed to generate audio. Check console for more details.');
        }
        setLoading(false);
    };

    const updateAudioInfo = (data: AudioInfo) => {
        setAudioInfo(data);

        // 立即检查audio_url是否存在
        if (!data.audio_url) {
            console.log('没有接收到可用 audioUrl，但是 audioInfo 包含', data);
            return; // 如果没有url则不执行后续操作
        }

        const newUrl = data.audio_url;
        setCurrentAudioUrl(newUrl);
    }
    const updateImageInfo = (data: AudioInfo) => {
        setAudioInfo(data);

        // 立即检查audio_url是否存在
        if (!data.image_url) {
            console.log('没有接收到可用 imgUrl，但是包含', data);
            return; // 如果没有url则不执行后续操作
        }

        const newImgUrl = data.image_url;
        setimgUrl(newImgUrl);
    }

    return (
        <div>
            <h1>MusicMaker</h1>
            <div className={styles.input}>
                <textarea
                    value={prompt}
                    onChange={e => setPrompt(e.target.value)}
                    placeholder="descrbe you mind..."
                    className={styles.inputPrompt}
                />
                <button
                    onClick={handleGenerateAudio} disabled={loading}
                    className={styles.inputButton}
                >
                    {loading ? 'Composing...' : 'Sing it'}
                </button>
            </div>
            <MusicPlayer />

            {audioInfo && (
                <div>
                    <h2>音频信息</h2>
                    <p>ID: {audioInfo.id}</p>
                    <p>状态: {audioInfo.status}</p>
                    <p>URL: {audioInfo.audio_url ? <a href={audioInfo.audio_url} target="_blank">点击播放</a> : '音频正在处理中'}</p>
                </div>
            )}
        </div>
    );
}

export default AudioGenerator;