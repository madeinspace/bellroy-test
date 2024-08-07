import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import Loader from './Loader';
import { getGridSize } from '../api/getGridSize';

const RobotContext = createContext();

export const useRobot = () => useContext(RobotContext);

const directionMap = {
  ArrowUp: 'N',
  ArrowRight: 'E',
  ArrowDown: 'S',
  ArrowLeft: 'W',
};

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

const getNextPosition = (currentDirection, { x, y }, gridSize) => {
  switch (currentDirection) {
    case 'N':
      return { x, y: y > 0 ? y - 1 : y };
    case 'E':
      return { x: x < gridSize - 1 ? x + 1 : x, y };
    case 'S':
      return { x, y: y < gridSize - 1 ? y + 1 : y };
    case 'W':
      return { x: x > 0 ? x - 1 : x, y };
    default:
      return { x, y };
  }
};


export const RobotProvider = ({ children }) => {

  const [gridSize, setGridSize] = useState(null);
  const [robotState, setRobotState] = useState({
    position: { x: Math.floor(gridSize / 2), y: Math.floor(gridSize / 2) },
    direction: 'E',
  });

  useEffect(() => {
    async function fetchSize() {
      const size = await getGridSize();
      setGridSize(size);
      setRobotState({
        position: { x: Math.floor(size / 2), y: Math.floor(size / 2) },
        direction: 'E',
      });
    }

    fetchSize();
  }, []);

  const rotateRobot = () => {
    setRobotState(prevState => {
      const newDirection = getNextDirection(prevState.direction);
      return { ...prevState, direction: newDirection };
    });
  };

  const moveRobot = useCallback(() => {
    setRobotState((prevState) => ({
      ...prevState,
      position: getNextPosition(prevState.direction, prevState.position, gridSize),
    }));
  }, [gridSize]);
  
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

  const isRobotCell = (x, y) => {
    return robotState.position.x === x && robotState.position.y === y;
  };

  if (gridSize === null) {
    return <Loader />;
  }

  return (
    <RobotContext.Provider
      value={{
        gridSize,
        robotState,
        isRobotCell,
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
