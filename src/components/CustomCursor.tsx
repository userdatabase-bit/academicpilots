import { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [ringPosition, setRingPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setTimeout(() => {
        setRingPosition({ x: e.clientX, y: e.clientY });
      }, 50);
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <>
      <div 
        className="custom-cursor hidden md:block" 
        style={{ left: `${position.x}px`, top: `${position.y}px`, transform: 'translate(-50%, -50%)' }} 
      />
      <div 
        className="custom-cursor-ring hidden md:block" 
        style={{ left: `${ringPosition.x}px`, top: `${ringPosition.y}px`, transform: 'translate(-50%, -50%)' }} 
      />
    </>
  );
};

export default CustomCursor;
