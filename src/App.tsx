import 'reset-css'
import './App.css';
import { ControlPannel } from './componet/ControlPannel';
import { DiskCover } from './componet/DiskCover';
import { InputPannel } from './componet/InputPannel';
function App() {
  return (
    <div className="container">
      <DiskCover />
      <ControlPannel />
      <InputPannel />
    </div>
  );
}

export default App;