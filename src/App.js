import React, { useEffect, useRef } from 'react';
import { useInterval } from './useInterval'
import './App.scss';
import * as constant from './Constants';

const App = () => {
  const canvasRef = useRef();

  return (
    <div className="App" role="button" tabIndex="0">
      <canvas 
        className="canvas" 
        ref={canvasRef}
        width={`${constant.canvas_size[0]}`}
        height={`${constant.canvas_size[1]}`}
      />
    </div>
  );
}

export default App;
