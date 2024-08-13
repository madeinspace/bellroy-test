import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect,beforeEach } from 'vitest';
import { useRobot } from './RobotContext';
import Grid from './Grid';
import Cell from './Cell';

vi.mock('./RobotContext');
vi.mock('./Cell', () => ({
  __esModule: true,
  default: ({ x, y }) => <div data-testid={`cell-${x}-${y}`} />,
}));

describe('Grid component', () => {
  beforeEach(() => {
    useRobot.mockReturnValue({ gridSize: 3 }); // Mocking gridSize as 3 for testing
  });

  it('renders without crashing', () => {
    render(<Grid />);
  });

  it('renders the correct number of cells', () => {
    const gridSize = 3;
    useRobot.mockReturnValue({ gridSize });

    render(<Grid />);

    const expectedCellCount = gridSize * gridSize;
    const cells = screen.getAllByTestId(/cell-/);
    expect(cells.length).toBe(expectedCellCount);
  });

  it('renders cells with correct coordinates', () => {
    const gridSize = 2;
    useRobot.mockReturnValue({ gridSize });

    render(<Grid />);

    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        expect(screen.getByTestId(`cell-${x}-${y}`)).toBeInTheDocument();
      }
    }
  });

  // it('applies correct grid style based on gridSize', () => {
  //   const gridSize = 4;
  //   useRobot.mockReturnValue({ gridSize });

  //   render(<Grid />);

  //   const grid = screen.getByRole('grid');
  //   expect(grid).toHaveStyle({
  //     display: 'grid',
  //     gridTemplateColumns: `repeat(${gridSize}, 50px)`,
  //     gridTemplateRows: `repeat(${gridSize}, 50px)`,
  //   });
  // });
});
