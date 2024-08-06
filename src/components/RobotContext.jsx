import React, { createContext, useContext, useState, useCallback } from 'react';

const RobotContext = createContext();

export const RobotProvider = ({ children }) => {
  const [robotState, setRobotState] = useState({
    position: { x: 2, y: 2 },
    direction: 'E',
  });

  const rotateRobot = () => {
    setRobotState(prevState => {
      const newDirection = (() => {
        switch (prevState.direction) {
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
      })();
      return { ...prevState, direction: newDirection };
    });
  };

  const moveRobot = () => {
    setRobotState((prevState) => {
      let { x, y } = prevState.position;
      switch (prevState.direction) {
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
      return { ...prevState, position: { x, y } };
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

export const useRobot = () => useContext(RobotContext);
