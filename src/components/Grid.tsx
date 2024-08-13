import React, { memo, useMemo, CSSProperties, ReactNode } from 'react';
import { useRobot } from './RobotContext';
import Cell from './Cell';

const Grid = () => {
  const { gridSize } = useRobot();

  const gridStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(${gridSize}, 50px)`,
    gridTemplateRows: `repeat(${gridSize}, 50px)`,
  };

  const grid = useMemo(() => {
    const cells: ReactNode[] = [];
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        cells.push(<Cell key={`${x}-${y}`} x={x} y={y} />);
      }
    }
    return cells;
  }, [gridSize]);

  return (
    <div role="grid" className="grid-container">
      <div className="grid" style={gridStyle}>
        {grid}
      </div>
    </div>
  );
};

export default memo(Grid);
