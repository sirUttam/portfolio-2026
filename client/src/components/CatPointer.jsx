import { useEffect, useRef } from 'react';
import useMousePosition from '../hooks/useMousePosition';

const isDesktopDevice = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth > 768 && !('ontouchstart' in window);
};

function CatPointer() {
  const catRef = useRef(null);
  const leftPupilRef = useRef(null);
  const rightPupilRef = useRef(null);
  const currentAngleRef = useRef(0);
  const currentEyeRef = useRef({ x: 0, y: 0 });
  const targetEyeRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef(null);
  const mousePos = useMousePosition();

  useEffect(() => {
    if (!isDesktopDevice() || !catRef.current) return undefined;

    const cat = catRef.current;
    const leftPupil = leftPupilRef.current;
    const rightPupil = rightPupilRef.current;
    const maxEyeOffset = 4;

    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

    const updateFollow = () => {
      const rect = cat.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = mousePos.current.x - centerX;
      const dy = mousePos.current.y - centerY;
      const rawAngle = Math.atan2(dy, dx);
      const angleDegrees = rawAngle * (180 / Math.PI);

      const targetAngle = clamp(angleDegrees * 0.12, -14, 14);
      const targetEyeX = clamp(Math.cos(rawAngle) * maxEyeOffset, -maxEyeOffset, maxEyeOffset);
      const targetEyeY = clamp(Math.sin(rawAngle) * maxEyeOffset, -maxEyeOffset, maxEyeOffset);

      currentAngleRef.current += (targetAngle - currentAngleRef.current) * 0.14;
      currentEyeRef.current.x += (targetEyeX - currentEyeRef.current.x) * 0.18;
      currentEyeRef.current.y += (targetEyeY - currentEyeRef.current.y) * 0.18;

      cat.style.transform = `translate3d(-50%, -50%, 0) rotate(${currentAngleRef.current}deg)`;
      const pupilTransform = `translate(-50%, -50%) translate(${currentEyeRef.current.x}px, ${currentEyeRef.current.y}px)`;

      leftPupil?.style.setProperty('transform', pupilTransform);
      rightPupil?.style.setProperty('transform', pupilTransform);

      frameRef.current = requestAnimationFrame(updateFollow);
    };

    frameRef.current = requestAnimationFrame(updateFollow);

    return () => {
      cancelAnimationFrame(frameRef.current);
    };
  }, [mousePos]);

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <div className="cat-pointer-wrapper relative h-[340px] w-[340px] sm:h-[420px] sm:w-[420px] animate-cat-bob">
        <img
          ref={catRef}
          src="/cat.png"
          alt="Interactive cat"
          className="absolute left-1/2 top-1/2 h-full w-full max-w-full -translate-x-1/2 -translate-y-1/2 object-contain"
        />
        <div className="cat-eye cat-eye-left">
          <div ref={leftPupilRef} className="cat-pupil" />
        </div>
        <div className="cat-eye cat-eye-right">
          <div ref={rightPupilRef} className="cat-pupil" />
        </div>
      </div>
    </div>
  );
}

export default CatPointer;
