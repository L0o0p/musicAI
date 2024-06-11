import 'reset-css'
import './App.css';
import { ControlPannel } from './componet/ControlPannel';
import { DiskCover } from './componet/DiskCover';
import { InputPannel } from './componet/InputPannel';
import { Suspense } from 'react';
import { ListCom } from './componet/ListCom';
import { ThreeD } from './componet/ThreeD';
// import { useAtom } from 'jotai';
// import { showBubbleAtom } from './store';
function App() {
  // const [state, setState] = useAtom(showBubbleAtom)
  // const sendMessage = () => {
  //   setState(!state)
  // }
  return (
    <>
      <Suspense fallback={<Loading />}>
        {/* <button onClick={() => sendMessage()}>send</button> */}
        <ThreeD />
        <div className="container">
          <ListCom />
          <DiskCover />
          <ControlPannel />
          <InputPannel />
        </div>
      </Suspense>
    </>
  );
}

export default App;

const Loading = () => {
  console.log('loading')
  return (
    <img src={'loadingPage/logo.png'} alt="loading" />
  )
}

