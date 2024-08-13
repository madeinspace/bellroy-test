import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect,beforeEach } from 'vitest';
import Controls from './Controls';
import { useRobot } from './RobotContext';

vi.mock('./RobotContext');

describe('Controls component', () => {
  const mockSetDirectionAndMove = vi.fn();
  const mockHandleKeyDown = vi.fn();
  const mockRotateRobot = vi.fn();
  const mockMoveRobot = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    useRobot.mockReturnValue({
      setDirectionAndMove: mockSetDirectionAndMove,
      handleKeyDown: mockHandleKeyDown,
      rotateRobot: mockRotateRobot,
      moveRobot: mockMoveRobot,
    });
  });

  it('renders without crashing', () => {
    render(<Controls />);
    expect(screen.getByText('(You can also use your keyboard arrows to move the bellroy bot)')).toBeInTheDocument();
  });

  it('calls rotateRobot when the Rotate button is clicked', () => {
    render(<Controls />);
    
    const rotateButton = screen.getByText('Rotate');
    fireEvent.click(rotateButton);

    expect(mockRotateRobot).toHaveBeenCalledTimes(1);
  });

  it('calls moveRobot when the Move button is clicked', () => {
    render(<Controls />);

    const moveButton = screen.getByText('Move');
    fireEvent.click(moveButton);

    expect(mockMoveRobot).toHaveBeenCalledTimes(1);
  });

  it('calls setDirectionAndMove with correct direction when cardinal buttons are clicked', () => {
    render(<Controls />);

    const directions = ['N', 'E', 'S', 'W'];
    directions.forEach((direction) => {
      const button = screen.getByText(direction);
      fireEvent.click(button);
      expect(mockSetDirectionAndMove).toHaveBeenCalledWith(direction);
    });
    
    expect(mockSetDirectionAndMove).toHaveBeenCalledTimes(directions.length);
  });

  it('adds and removes keydown event listener on mount and unmount', () => {
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

    const { unmount } = render(<Controls />);

    expect(addEventListenerSpy).toHaveBeenCalledWith('keydown', mockHandleKeyDown);

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', mockHandleKeyDown);

    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });

  it('calls handleKeyDown when a key is pressed', () => {
    render(<Controls />);

    fireEvent.keyDown(window, { key: 'ArrowUp' });

    expect(mockHandleKeyDown).toHaveBeenCalledTimes(1);
    expect(mockHandleKeyDown).toHaveBeenCalledWith(expect.objectContaining({ key: 'ArrowUp' }));
  });
});
