import React from 'react';
import { useRobot } from './RobotContext';
import RobotSVG from './RobotSVG';

const Cell = ({ x, y }) => {
  const { isRobotCell } = useRobot();
  const robotCell = isRobotCell(x, y);

  return (
    <div className={`cell ${robotCell ? 'robot-cell' : ''}`}>
      {robotCell && <RobotSVG />}
    </div>
  );
};

export default Cell;
