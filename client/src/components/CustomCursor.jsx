import { useEffect, useRef } from 'react';

const cursorTargets = 'a, button, input, textarea, select, label, .cursor-pointer';

const isDesktopDevice = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth > 768 && !('ontouchstart' in window);
};

function CustomCursor() {
  const cursorRef = useRef(null);
  const frameRef = useRef(null);
  const positionRef = useRef({ targetX: 0, targetY: 0 });
  const hoverRef = useRef(false);

  useEffect(() => {
    if (!isDesktopDevice()) return undefined;

    const cursor = cursorRef.current;
    const position = positionRef.current;

    const setTranslate = (element, x, y) => {
      if (element) {
        element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
    };

    const animate = () => {
      setTranslate(cursor, position.targetX, position.targetY);
      frameRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (event) => {
      position.targetX = event.clientX;
      position.targetY = event.clientY;
      if (cursor) cursor.style.opacity = '1';
    };

    const handleMouseLeave = () => {
      if (cursor) cursor.style.opacity = '0';
    };

    const updateHover = (event) => {
      const isHover = Boolean(event.target.closest(cursorTargets));
      if (hoverRef.current !== isHover) {
        hoverRef.current = isHover;
        cursor?.classList.toggle('fire-cursor-hover', isHover);
      }
    };

    const handleMouseDown = () => {
      cursor?.classList.add('fire-cursor-click');
    };

    const handleMouseUp = () => {
      cursor?.classList.remove('fire-cursor-click');
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', updateHover);
    document.addEventListener('mouseout', updateHover);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    frameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameRef.current);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', updateHover);
      document.removeEventListener('mouseout', updateHover);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  if (!isDesktopDevice()) return null;

  return (
    <div ref={cursorRef} className="fire-cursor-base">
      <div className="fire-cursor-flame" />
    </div>
  );
}

export default CustomCursor;
