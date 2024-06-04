import 'reset-css'
import './App.css';
import { ControlPannel } from './componet/ControlPannel';
import { DiskCover } from './componet/DiskCover';
import { InputPannel } from './componet/InputPannel';
import { Suspense } from 'react';
import { ListCom } from './componet/ListCom';
function App() {
  return (
    <div className="container">
      <Suspense fallback={<Loading />}>
        <ListCom />
        <DiskCover />
        <ControlPannel />
        <InputPannel />
      </Suspense>
    </div>
  );
}

export default App;

const Loading = () => {
  console.log('loading')
  return (
    <img src={'loadingPage/logo.png'} alt="loading" />
  )
}