import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect,beforeEach } from 'vitest';
import { RobotProvider, useRobot } from './RobotContext';
import Loader from './Loader';
import { getGridSize } from '../api/getGridSize';

vi.mock('../api/getGridSize');
vi.mock('./Loader', () => ({
  __esModule: true,
  default: () => <div data-testid="loader" />,
}));

const TestComponent = () => {
  const {
    gridSize,
    robotState,
    rotateRobot,
    moveRobot,
    setDirectionAndMove,
    isRobotCell,
  } = useRobot();

  return (
    <div>
      <div data-testid="grid-size">{gridSize}</div>
      <div data-testid="robot-position">
        {robotState.position ? `${robotState.position.x},${robotState.position.y}` : 'null'}
      </div>
      <div data-testid="robot-direction">{robotState.direction}</div>
      <button onClick={rotateRobot} data-testid="rotate-button">Rotate</button>
      <button onClick={moveRobot} data-testid="move-button">Move</button>
      <button onClick={() => setDirectionAndMove('N')} data-testid="move-north-button">Move North</button>
      <div data-testid="robot-cell">
        {isRobotCell(1, 1) ? 'Robot is here' : 'Robot is not here'}
      </div>
    </div>
  );
};

describe('RobotProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows the Loader while gridSize is being fetched', async () => {
    getGridSize.mockResolvedValueOnce(5);

    render(
      <RobotProvider>
        <TestComponent />
      </RobotProvider>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
    expect(await screen.findByTestId('grid-size')).toHaveTextContent('5');
  });

  it('initializes gridSize and robot state correctly', async () => {
    getGridSize.mockResolvedValueOnce(5);

    render(
      <RobotProvider>
        <TestComponent />
      </RobotProvider>
    );

    expect(await screen.findByTestId('grid-size')).toHaveTextContent('5');
    expect(screen.getByTestId('robot-position')).toHaveTextContent('2,2');
    expect(screen.getByTestId('robot-direction')).toHaveTextContent('E');
  });

  it('rotates the robot', async () => {
    getGridSize.mockResolvedValueOnce(5);

    render(
      <RobotProvider>
        <TestComponent />
      </RobotProvider>
    );

    const rotateButton = await screen.findByTestId('rotate-button');
    fireEvent.click(rotateButton);
    expect(screen.getByTestId('robot-direction')).toHaveTextContent('S');

    fireEvent.click(rotateButton);
    expect(screen.getByTestId('robot-direction')).toHaveTextContent('W');
  });

  it('moves the robot based on direction', async () => {
    getGridSize.mockResolvedValueOnce(5);

    render(
      <RobotProvider>
        <TestComponent />
      </RobotProvider>
    );

    const moveButton = await screen.findByTestId('move-button');
    fireEvent.click(moveButton);
    expect(screen.getByTestId('robot-position')).toHaveTextContent('3,2');

    fireEvent.click(moveButton);
    expect(screen.getByTestId('robot-position')).toHaveTextContent('4,2');
  });

  it('sets direction and moves the robot', async () => {
    getGridSize.mockResolvedValueOnce(5);

    render(
      <RobotProvider>
        <TestComponent />
      </RobotProvider>
    );

    const moveNorthButton = await screen.findByTestId('move-north-button');
    fireEvent.click(moveNorthButton);
    expect(screen.getByTestId('robot-direction')).toHaveTextContent('N');
    expect(screen.getByTestId('robot-position')).toHaveTextContent('2,1');
  });

  it.skip('handles errors during grid size fetching', async () => {
    getGridSize.mockRejectedValueOnce(new Error('Failed to fetch grid size'));

    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <RobotProvider>
        <TestComponent />
      </RobotProvider>
    );

    expect(consoleError).toHaveBeenCalledWith('Failed to fetch grid size:', expect.any(Error));
    consoleError.mockRestore();
  });
});
