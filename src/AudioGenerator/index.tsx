import { useState } from 'react';
import axios from 'axios';

function AudioGenerator() {
    const [prompt, setPrompt] = useState('');
    const [audioInfo, setAudioInfo] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const baseUrl = "http://localhost:3000"; // 替换为你的 API 服务器地址

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
            setAudioInfo(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error generating audio:', error);
            alert('Failed to generate audio. Check console for more details.');
        }
        setLoading(false);
    };

    return (
        <div>
            <h1>音频生成器</h1>
            <textarea
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                placeholder="输入描述..."
                style={{
                    resize: 'none',
                    width: '300px',
                    height: '100px',
                }}

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