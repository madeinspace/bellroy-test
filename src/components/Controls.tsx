import React from 'react'
import { useEffect } from 'react';
import { useRobot } from './RobotContext';

const Controls = () => {
  const { setDirectionAndMove, handleKeyDown, rotateRobot, moveRobot } = useRobot();

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <>
    <div className="controls">
      <button onClick={rotateRobot}>Rotate</button>
      <button onClick={moveRobot}>Move</button>
    </div>
    <div className="cardinal-controls">
      <button onClick={() => setDirectionAndMove('N')}>N</button>
      <button onClick={() => setDirectionAndMove('E')}>E</button>
      <button onClick={() => setDirectionAndMove('S')}>S</button>
      <button onClick={() => setDirectionAndMove('W')}>W</button>
    </div>
    <h3 className='bellroy-orange'>(You can also use your keyboard arrows to move the bellroy bot)</h3>
    </>
  );
};


export default Controls;
