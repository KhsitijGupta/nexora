import { useState, useEffect } from 'react';

export function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
  });

  useEffect(() => {
    let animationFrameId;

    const handleMouseMove = (event) => {
      // Cancel previous frame to avoid excessive state updates
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      animationFrameId = requestAnimationFrame(() => {
        const { clientX, clientY } = event;
        const { innerWidth, innerHeight } = window;

        // Normalized from -1 to 1
        const normalizedX = (clientX / innerWidth) * 2 - 1;
        const normalizedY = -(clientY / innerHeight) * 2 + 1;

        setMousePosition({
          x: clientX,
          y: clientY,
          normalizedX,
          normalizedY,
        });
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return mousePosition;
}

