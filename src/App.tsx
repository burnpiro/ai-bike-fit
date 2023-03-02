import React, {useEffect, useState} from 'react';
import '@tensorflow/tfjs-backend-webgl';
import logo from './logo.svg';
import './App.css';
import {initializeModel, setBackendAndEnvFlags} from "./utils/modelHelper";
import {STATE} from "./utils/pose-detection/params";
import {createDetector, PoseDetector, SupportedModels} from "./utils/pose-detection";

function App() {
  const [detector, setDetector] = useState<PoseDetector | null>(null);

  useEffect(() => {
    const setupTF = async () => {
      console.log('setting TF');
      await setBackendAndEnvFlags(STATE.flags, STATE.backend as SupportedModels);

      const newDetector = await createDetector(STATE.model, STATE.modelConfig);

      setDetector(newDetector);
    }

    setupTF()
  }, [])

  console.log(detector);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
