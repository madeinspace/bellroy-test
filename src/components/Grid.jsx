import React from 'react';
import { useRobot } from './RobotContext';
import RobotSVG from './RobotSVG';

const Grid = () => {
  const { robotState } = useRobot();
  const { position, direction } = robotState;

  const createGrid = () => {
    const grid = [];

    for (let y = 0; y < 5; y++) {
      for (let x = 0; x < 5; x++) {

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

    console.log(grid);

    return grid;
  };

  return (
    <div className="grid-container">
      <div className="grid">{createGrid()}</div>
    </div>
  );
};

export default Grid;
