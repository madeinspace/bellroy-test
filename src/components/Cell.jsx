import React from 'react';
import RobotSVG from './RobotSVG';

const Cell = ({ isRobotCell }) => {
  return (
    <div className={`cell ${isRobotCell ? 'robot-cell' : ''}`}>
      {isRobotCell && <RobotSVG />}
    </div>
  );
};

export default Cell;
