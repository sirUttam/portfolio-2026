import { useEffect, useRef, useState } from 'react';

const isDesktopDevice = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth > 768 && !('ontouchstart' in window);
};

function ManTyping() {
  const [isTyping, setIsTyping] = useState(false);
  const lastMoveRef = useRef(performance.now());
  const typingRef = useRef(false);
  const frameRef = useRef(0);

  useEffect(() => {
    if (!isDesktopDevice()) return undefined;

    const handleMouseMove = () => {
      lastMoveRef.current = performance.now();
      if (!typingRef.current) {
        typingRef.current = true;
        setIsTyping(true);
      }
    };

    const update = () => {
      const elapsed = performance.now() - lastMoveRef.current;
      if (typingRef.current && elapsed > 140) {
        typingRef.current = false;
        setIsTyping(false);
      }
      frameRef.current = requestAnimationFrame(update);
    };

    window.addEventListener('mousemove', handleMouseMove);
    frameRef.current = requestAnimationFrame(update);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <div className="man-typing-container">
      <div className={`man-typing-card ${isTyping ? 'man-typing-active' : ''}`}>
        <div className="man-figure">
          <div className="man-head">
            <div className="man-hair" />
            <div className="man-face">
              <div className="man-eyebrow man-eyebrow-left" />
              <div className="man-eye man-eye-left">
                <div className="man-pupil" />
              </div>
              <div className="man-eyebrow man-eyebrow-right" />
              <div className="man-eye man-eye-right">
                <div className="man-pupil" />
              </div>
              <div className="man-nose" />
              <div className="man-mouth" />
            </div>
          </div>

          <div className="man-neck" />
          <div className="man-torso">
            <div className="man-shirt" />
          </div>

          <div className="man-arm man-arm-left">
            <div className="man-hand" />
          </div>
          <div className="man-arm man-arm-right">
            <div className="man-hand" />
          </div>
        </div>

        <div className="man-laptop">
          <div className={`man-screen ${isTyping ? 'screen-active' : ''}`}>
            <div className="screen-status">
              <span className="status-dot" />
              <span className="status-dot" />
              <span className="status-dot" />
            </div>
            <div className="screen-lines">
              {['long', 'medium', 'long', 'short', 'long'].map((size, index) => (
                <span key={index} className={`screen-line ${size}`} />
              ))}
            </div>
          </div>
          <div className={`man-keyboard ${isTyping ? 'keyboard-active' : ''}`}>
            <div className="key-row row-1">
              {Array.from({ length: 10 }).map((_, index) => (
                <span key={index} className="key" />
              ))}
            </div>
            <div className="key-row row-2">
              {Array.from({ length: 9 }).map((_, index) => (
                <span key={index} className="key small" />
              ))}
            </div>
            <div className="key-row row-3">
              {Array.from({ length: 8 }).map((_, index) => (
                <span key={index} className="key" />
              ))}
            </div>
            <div className="trackpad" />
          </div>
          <div className="man-laptop-base" />
        </div>
      </div>
    </div>
  );
}

export default ManTyping;
