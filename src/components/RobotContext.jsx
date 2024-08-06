import React, { createContext, useContext, useState, useCallback } from 'react';

const RobotContext = createContext();

export const useRobot = () => useContext(RobotContext);

export const RobotProvider = ({ children }) => {
  const [robotState, setRobotState] = useState({
    position: { x: 2, y: 2 },
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
        if (x < 4) x += 1;
        break;
      case 'S':
        if (y < 4) y += 1;
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
      switch (event.key) {
        case 'ArrowUp':
          setRobotState((prevState) => ({
            ...prevState,
            direction: 'N',
          }));
          moveRobot();
          break;
        case 'ArrowRight':
          setRobotState((prevState) => ({
            ...prevState,
            direction: 'E',
          }));
          moveRobot();
          break;
        case 'ArrowDown':
          setRobotState((prevState) => ({
            ...prevState,
            direction: 'S',
          }));
          moveRobot();
          break;
        case 'ArrowLeft':
          setRobotState((prevState) => ({
            ...prevState,
            direction: 'W',
          }));
          moveRobot();
          break;
        default:
          break;
      }
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


