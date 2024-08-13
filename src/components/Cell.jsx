import React, { memo, useCallback } from 'react';
import { useRobot } from './RobotContext';
import RobotSVG from './RobotSVG';

const Cell = ({ x, y }) => {
  const { isRobotCell } = useRobot();
  
  const isRobot = useCallback(() => isRobotCell(x, y), [isRobotCell, x, y]);

  return (
    <div role="cell" className={`cell ${isRobot() ? 'robot-cell' : ''}`}>
      {isRobot() && <RobotSVG />}
    </div>
  );
};

export default memo(Cell);