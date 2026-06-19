import { useEffect, useState } from 'react';
import styles from './CustomCursor.module.css';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Only enable custom cursor on devices with fine pointer (not touch)
    if (window.matchMedia('(pointer: fine)').matches) {
      document.body.classList.add('has-custom-cursor');
    }

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseOver = (e) => {
      // Check if hovering over interactive elements
      if (
        e.target.tagName.toLowerCase() === 'button' ||
        e.target.tagName.toLowerCase() === 'a' ||
        e.target.closest('button') ||
        e.target.closest('a') ||
        e.target.classList.contains('btn')
      ) {
        setIsHovering(true);
      }
    };

    const onMouseOut = () => {
      setIsHovering(false);
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
    };
  }, []);

  return (
    <div 
      className={`${styles.cursor} ${isHovering ? styles.hovering : ''}`}
      style={{ 
        transform: `translate3d(${position.x}px, ${position.y}px, 0)` 
      }}
    />
  );
}
