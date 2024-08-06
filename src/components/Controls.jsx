import { useEffect } from 'react';
import { useRobot } from './RobotContext';

const Controls = () => {
  const { setDirectionAndMove, handleKeyDown } = useRobot();

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="controls">
      <button onClick={() => setDirectionAndMove('N')}>N</button>
      <button onClick={() => setDirectionAndMove('E')}>E</button>
      <button onClick={() => setDirectionAndMove('S')}>S</button>
      <button onClick={() => setDirectionAndMove('W')}>W</button>
    </div>
  );
};


export default Controls;
