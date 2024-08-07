import React, { createContext, useContext, useState, useCallback } from 'react';

const RobotContext = createContext();

export const useRobot = () => useContext(RobotContext);

const directionMap = {
  ArrowUp: 'N',
  ArrowRight: 'E',
  ArrowDown: 'S',
  ArrowLeft: 'W',
};

export const RobotProvider = ({ children, gridSize }) => {

  const [robotState, setRobotState] = useState({
    position: { x: Math.floor(gridSize / 2), y: Math.floor(gridSize / 2) },
    direction: 'E',
  });

  const getNextDirection = (currentDirection) => {
    switch (currentDirection) {
      case 'N':
        return 'E';
      case 'E':
        return 'S';
      case 'S':
        return 'W';
      case 'W':
        return 'N';
      default:
        return 'E';
    }
  };

  const getNextPosition = (currentDirection, currentPosition) => {
    let { x, y } = currentPosition;
    switch (currentDirection) {
      case 'N':
        if (y > 0) y -= 1;
        break;
      case 'E':
        if (x < gridSize -1) x += 1;
        break;
      case 'S':
        if (y < gridSize -1 ) y += 1;
        break;
      case 'W':
        if (x > 0) x -= 1;
        break;
      default:
        break;
    }
    return {x, y}
  }

  const rotateRobot = () => {
    setRobotState(prevState => {
      const newDirection = getNextDirection(prevState.direction);
      return { ...prevState, direction: newDirection };
    });
  };

  const moveRobot = () => {
    setRobotState((prevState) => {
      const newPosition = getNextPosition(prevState.direction, prevState.position)
      return { ...prevState, position: newPosition };
    });
  };
  
  const handleKeyDown = useCallback(
    (event) => {
      setDirectionAndMove(directionMap[event.key]);
    },
    [moveRobot]
  );

  const setDirectionAndMove = useCallback(
    (direction) => {
      setRobotState((prevState) => ({
        ...prevState,
        direction,
      }));
      moveRobot();
    },
    [moveRobot]
  );

  return (
    <RobotContext.Provider
      value={{
        gridSize,
        robotState,
        rotateRobot,
        moveRobot,
        setDirectionAndMove,
        handleKeyDown,
      }}
    >
      {children}
    </RobotContext.Provider>
  );
};
