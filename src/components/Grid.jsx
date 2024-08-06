import React from 'react';
import { useRobot } from './RobotContext';
import RobotSVG from './RobotSVG';

const Grid = () => {
  const { robotState, gridSize } = useRobot();
  const { position, direction } = robotState;

  const createGrid = () => {
    const grid = [];

    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {

        const isRobotCell = position.x === x && position.y === y 
        grid.push(
          <div key={`${x}-${y}`}  className={`cell ${isRobotCell ? 'robot-cell' : ''}`}>
            {/* {`${x}-${y}`} */}
            {isRobotCell && (
              <RobotSVG direction={direction} />
            )}
          </div>
        );
      }
    }

    return grid;
  };

  return (
    <div className="grid-container">
       <div className="grid" style={{ gridTemplateColumns: `repeat(${gridSize}, 50px)`, gridTemplateRows: `repeat(${gridSize}, 50px)` }}>
        {createGrid()}
      </div>
    </div>
  );
};

export default Grid;
