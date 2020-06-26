import React, { useEffect, useRef, useState } from 'react';
import { useInterval } from './useInterval'
import './App.scss';
import * as constant from './Constants';

const App = () => {
  const canvasRef = useRef();
  const [snake, setSnake] = useState(constant.snake_start);
  const [apple, setApple] = useState(constant.apple_start);
  const [dir, setDir] = useState([0,-1]);
  const [speed, setSpeed] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const context = canvasRef.current.getContext("2d");

    context.setTransform(constant.scale, 0, 0, constant.scale, 0, 0);

    // clear the rectangle
    context.clearRect(0,0, constant.canvas_size[0], constant.canvas_size[1]);

    // create snake
    context.fillStyle = "green";
    snake.forEach(([x,y]) => context.fillRect(x,y,1,1));

    //create apple
    context.fillStyle = "lightgreen";
    context.fillRect(apple[0], apple[1],1,1);

  },[snake,apple, gameOver])

  return (
    <div className="App" role="button" tabIndex="0">
      <canvas 
        id="canvas"
        className="canvas" 
        ref={canvasRef}
        width="800"
        height="800"
      />
    </div>
  );
}

export default App;
