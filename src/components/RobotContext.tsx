import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import Loader from './Loader';
import { getGridSize } from '../api/getGridSize';

type Direction = 'N' | 'E' | 'S' | 'W';

type Position = {
  x: number;
  y: number;
};

type RobotState = {
  position: Position;
  direction: Direction;
};

type RobotContextType = {
  gridSize: number;
  robotState: RobotState;
  isRobotCell: (x: number, y: number) => boolean;
  rotateRobot: () => void;
  moveRobot: () => void;
  setDirectionAndMove: (direction: Direction) => void;
  handleKeyDown: (event: KeyboardEvent) => void;
};

const RobotContext = createContext<RobotContextType | undefined>(undefined);

export const useRobot = (): RobotContextType => {
  const context = useContext(RobotContext);
  if (!context) {
    throw new Error('useRobot must be used within RobotProvider');
  }
  return context;
};

const directionMap: Record<string, Direction> = {
  ArrowUp: 'N',
  ArrowRight: 'E',
  ArrowDown: 'S',
  ArrowLeft: 'W',
};

const getNextDirection = (currentDirection: Direction): Direction => {
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

const getNextPosition = (currentDirection: Direction, { x, y }: Position, gridSize: number): Position => {
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

// Define the props type for the provider component
type RobotProviderProps = {
  children: ReactNode;
};

export const RobotProvider = ({ children }: RobotProviderProps) => {
  const [gridSize, setGridSize] = useState<number | null>(null);
  const [robotState, setRobotState] = useState<RobotState>({
    position: { x: 0, y: 0 },
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
      position: getNextPosition(prevState.direction, prevState.position, gridSize!),
    }));
  }, [gridSize]);

  const setDirectionAndMove = useCallback(
    (direction: Direction) => {
      setRobotState((prevState) => ({
        ...prevState,
        direction,
      }));
      moveRobot();
    },
    [moveRobot]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const direction = directionMap[event.key];
      if (direction) {
        setDirectionAndMove(direction);
      }
    },
    [setDirectionAndMove]
  );

  const isRobotCell = useCallback(
    (x: number, y: number) => {
      return robotState.position.x === x && robotState.position.y === y;
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
