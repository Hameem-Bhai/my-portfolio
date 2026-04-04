import React, { useEffect, useState } from 'react';
import './Cursor.css';

const Cursor = () => {
  const [positions, setPositions] = useState([]);
  const word = " HAMEEM ".split(""); 

  useEffect(() => {
    let currentPos = { x: -100, y: -100 };
    
    const handleMouseMove = (e) => {
      currentPos = { x: e.clientX, y: e.clientY };
    };

    const updatePositions = () => {
      setPositions(prev => {
        const newPositions = [...prev];
        newPositions.unshift({ ...currentPos });
        if (newPositions.length > word.length * 4) {
          newPositions.pop();
        }
        return newPositions;
      });
      requestAnimationFrame(updatePositions);
    };

    window.addEventListener('mousemove', handleMouseMove);
    const animId = requestAnimationFrame(updatePositions);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, [word.length]);

  return (
    <div className="cursor-container">
      {word.map((char, index) => {
        const pos = positions[index * 3] || { x: -100, y: -100 };
        return (
          <span
            key={index}
            className="cursor-char"
            style={{
              left: pos.x,
              top: pos.y + 20,
              opacity: 1 - index * 0.1,
              transform: `translate(-50%, -50%) scale(${1 - index * 0.05})`
            }}
          >
            {char}
          </span>
        );
      })}
    </div>
  );
};
export default Cursor;
