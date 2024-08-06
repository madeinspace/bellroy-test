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
        grid.push(
          <div key={`${x}-${y}`} className="cell">
            {/* {`${x}-${y}`} */}
            {position.x === x && position.y === y && (
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
