import './App.css';
import AudioGenerator from './AudioGenerator'; // 确保路径正确
import { DiskCover } from './DiskCover';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <DiskCover />
        <AudioGenerator />
      </header>
    </div>
  );
}

export default App;