import { useState } from 'react';
import axios from 'axios';
import { useCurrentAudio } from '../store';

interface AudioInfo {
    id: string;
    status: string;
    audio_url: string;
}
function AudioGenerator() {
    const [prompt, setPrompt] = useState<string>('');
    const [audioInfo, setAudioInfo] = useState<AudioInfo | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const { setCurrentAudioUrl } = useCurrentAudio();

    const baseUrl = "http://localhost:3000";

    const handleGenerateAudio = async () => {
        setLoading(true);
        try {
            const response = await axios.post(`${baseUrl}/api/generate`, {
                prompt: prompt,
                make_instrumental: false,
                wait_audio: false
            }, {
                headers: { "Content-Type": "application/json" }
            });

            console.log(response.data);

            if (response.data.status === "processing") {
                const intervalId = setInterval(async () => {
                    const checkResponse = await axios.get(`${baseUrl}/api/get?ids=${response.data.id}`);
                    if (checkResponse.data.status !== "processing") {
                        clearInterval(intervalId);
                        updateAudioInfo(checkResponse.data);
                    }
                }, 5000);
            }
            else {
                updateAudioInfo(response.data);
            }
        } catch (error) {
            console.error('Error generating audio:', error);
            alert('Failed to generate audio. Check console for more details.');
        }
        setLoading(false);
    };

    const updateAudioInfo = (data: AudioInfo) => {
        setAudioInfo(data);
        if (!data.audio_url) { console.log('没有接收到可用audioUrl') }
        const newUrl = data.audio_url;
        setCurrentAudioUrl(newUrl);
        console.log(newUrl);
    };

    return (
        <div>
            <h1>音频生成器</h1>
            <textarea
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                placeholder="输入描述..."
                style={{ resize: 'none', width: '300px', height: '100px' }}
            />
            <button onClick={handleGenerateAudio} disabled={loading}>
                {loading ? '生成中...' : '生成音频'}
            </button>
            {audioInfo && (
                <div>
                    <h2>音频信息</h2>
                    <p>ID: {audioInfo.id}</p>
                    <p>状态: {audioInfo.status}</p>
                    <p>URL: {audioInfo.audio_url}</p>
                </div>
            )}
        </div>
    );
}

export default AudioGenerator;