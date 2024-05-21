import './App.css';
import AudioGenerator from './AudioGenerator'; // 确保路径正确
import MusicPlayer from './MusicPlayer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <MusicPlayer />
        <AudioGenerator />
      </header>
    </div>
  );
}

export default App;