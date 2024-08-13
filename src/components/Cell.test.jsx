import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import { useRobot } from './RobotContext';
import Cell from './Cell';
import RobotSVG from './RobotSVG';

vi.mock('./RobotContext');
vi.mock('./RobotSVG', () => ({
  __esModule: true,
  default: () => <div data-testid="robot-svg" />,
}));

describe('Cell component', () => {

  it('renders without crashing', () => {
     useRobot.mockReturnValue({ isRobotCell: vi.fn().mockReturnValue(false) });
    render(<Cell x={0} y={0} /> );
  });

  it('renders a normal cell when isRobotCell returns false', () => {
    useRobot.mockReturnValue({ isRobotCell: vi.fn().mockReturnValue(false) });

    render(<Cell x={0} y={0} />);

    const cell = screen.getByRole('cell');
    expect(cell).toBeInTheDocument();
    expect(cell).not.toHaveClass('robot-cell');
    expect(screen.queryByTestId('robot-svg')).toBeNull();
  });

  it('renders a robot cell when isRobotCell returns true', () => {
    useRobot.mockReturnValue({ isRobotCell: vi.fn().mockReturnValue(true) });

    render(<Cell x={0} y={0} />);

    const cell = screen.getByRole('cell'); 
    expect(cell).toBeInTheDocument();
    expect(cell).toHaveClass('robot-cell');
    expect(screen.getByTestId('robot-svg')).toBeInTheDocument();
  });

  it('calls isRobotCell with correct coordinates', () => {
    const mockIsRobotCell = vi.fn().mockReturnValue(false);
    useRobot.mockReturnValue({ isRobotCell: mockIsRobotCell });

    const x = 1;
    const y = 2;

    render(<Cell x={x} y={y} />);

    expect(mockIsRobotCell).toHaveBeenCalledWith(x, y);
  });
});
