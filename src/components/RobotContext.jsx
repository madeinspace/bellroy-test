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
    position: null,
    direction: 'E',
  });

  useEffect(() => {
    const fetchSize = async () => {
      try {
        const size = await getGridSize();
        setGridSize(size);
        setRobotState({
          position: { x: Math.floor(size / 2), y: Math.floor(size / 2) },
          direction: 'E',
        });
      } catch (error) {
        console.error('Failed to fetch grid size:', error);
      }
    };

    fetchSize();
  }, []);

  const rotateRobot = useCallback(() => {
    setRobotState((prevState) => {
      const newDirection = getNextDirection(prevState.direction);
      return { ...prevState, direction: newDirection };
    });
  }, []);

  const moveRobot = useCallback(() => {
    setRobotState((prevState) => ({
      ...prevState,
      position: getNextPosition(prevState.direction, prevState.position, gridSize),
    }));
  }, [gridSize]);

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

  const handleKeyDown = useCallback(
    (event) => {
      const direction = directionMap[event.key];
      if (direction) {
        setDirectionAndMove(direction);
      }
    },
    [setDirectionAndMove]
  );

  const isRobotCell = useCallback(
    (x, y) => {
      return robotState.position?.x === x && robotState.position?.y === y;
    },
    [robotState.position]
  );

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
