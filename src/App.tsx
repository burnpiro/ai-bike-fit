import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import {initializeModel} from "./utils/modelHelper";
import ort from "onnxruntime-web";

function App() {

  useEffect(() => {
    const makePrediction = async () => {
      const session = await initializeModel();

      console.log(session.inputNames)

      const dataA = Float32Array.from(Array(512*512*3).fill(1));
      const testTensor = new ort.Tensor(dataA,[1, 3, 512, 512]);

      console.log(testTensor);

      // const results = await session.run(testTensor);
    }

    makePrediction()
  }, [])
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
