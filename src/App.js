import React, { useEffect, useRef, useState } from "react";
import { useInterval } from "./useInterval";
import "./App.scss";
import * as constant from "./Constants";

const App = () => {
  const canvasRef = useRef();
  const [snake, setSnake] = useState(constant.snake_start);
  const [apple, setApple] = useState(constant.apple_start);
  const [dir, setDir] = useState([0, -1]);
  const [speed, setSpeed] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  // start game
  const startGame = () => {
    setSnake(constant.snake_start);
    setApple(constant.apple_start);
    setDir([0, -1]);
    setSpeed(constant.speed);
    setGameOver(false);
  };

  // end game
  const endGame = () => {
    setSpeed(null);
    setGameOver(true);
  };

  //move snake
  const moveSnake = event => {
    if (event.keycode >= 37 || event.keyCode <= 40) {
      console.log("key", event.keyCode);
      setDir(constant.directions[event.keyCode]);
    }
  };

  //create apple
  const createApple = () => {
    return apple.map((x, i) => {
      return Math.floor(Math.random() * (constant.canvas_size[i] / constant.scale));
    });
  };

  // check collision
  const checkCollision = (piece, snk = snake) => {
    if (
      piece[0] * constant.scale >= constant.canvas_size[0] ||
      piece[1] * constant.scale >= constant.canvas_size[1] ||
      piece[0] < 0 ||
      piece[1] < 0
    ) {
      return true;
    } else {
      return false;
    }
  };

  //check apple collision
  const checkAppleCollision = newSnake => {
    console.log('new snake', newSnake);
    if (newSnake[0][0] === apple[0] && newSnake[0][1] === apple[1]) {
      let newApple = createApple();
      console.log('newApple', newApple);
      setApple(newApple);
      return true;
    } else {
      return false;
    }
  };

  // run snake
  const gameLoop = () => {
    // deep copy snake
    const snakeCopy = JSON.parse(JSON.stringify(snake));
    const newSnakeHead = [snakeCopy[0][0] + dir[0], snakeCopy[0][1] + dir[1]];

    //shift head
    snakeCopy.unshift(newSnakeHead);

    // check collision
    if (checkCollision(newSnakeHead)) {
      endGame();
    }
    
    if (!checkAppleCollision(snakeCopy)) {
      //remove tail
      snakeCopy.pop();
    }

    //setting the new coordinates for new snake position
    setSnake(snakeCopy);
  };

  useEffect(() => {
    const context = canvasRef.current.getContext("2d");

    context.setTransform(constant.scale, 0, 0, constant.scale, 0, 0);

    // clear the rectangle
    context.clearRect(0, 0, constant.canvas_size[0], constant.canvas_size[1]);

    // create snake
    context.fillStyle = "green";
    snake.forEach(([x, y]) => context.fillRect(x, y, 1, 1));

    //create apple
    context.fillStyle = "lightgreen";
    context.fillRect(apple[0], apple[1], 1, 1);
  }, [snake, apple, gameOver]);

  useInterval(() => gameLoop(), speed);

  return (
    <div
      className="App"
      role="button"
      tabIndex="0"
      onKeyDown={e => moveSnake(e)}
    >
      <canvas
        id="canvas"
        className="canvas"
        ref={canvasRef}
        width="800"
        height="800"
      >
      </canvas>
      <div id="gameOverText">{gameOver && <p className="gameOver">Game Over</p>}</div>
      <div id="game-control">
        <img src="/images/snake.jpg"></img>
        <a class="btn-slice" onClick={startGame} style={{cursor:"pointer"}}>
          <div class="top"><span>Start Snake</span></div>
          <div class="bottom"><span>Start Snake</span></div>
        </a>
      </div>
    </div>
  );
};

export default App;
