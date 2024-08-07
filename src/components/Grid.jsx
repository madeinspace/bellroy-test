import React from 'react';
import { useRobot } from './RobotContext';
import Cell from './Cell';

const Grid = () => {
  const { gridSize } = useRobot();

  const gridStyle = {
     gridTemplateColumns: `repeat(${gridSize}, 50px)`, 
     gridTemplateRows: `repeat(${gridSize}, 50px)` 
  }

  const createGrid = () => {
    const grid = [];

    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        grid.push(<Cell key={`${x}-${y}`} x={x} y={y} />);
      }
    }

    return grid;
  };

  return (
    <div className="grid-container">
      <div
        className="grid"
        style={gridStyle}
      >
        {createGrid()}
      </div>
    </div>
  );
};

export default Grid;
