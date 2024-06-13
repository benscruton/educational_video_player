import './App.css';

import {logoWhite} from './img';
import {VideoPage} from "./views";

function App() {
  return (
    <div className="App" style={{backgroundColor: "gray"}}>
      <img src={logoWhite} height={64}/>
      <p>hello this is App.js</p>

      <VideoPage />
    </div>
  );
}

export default App;
