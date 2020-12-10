import React, { useEffect, useRef } from 'react';
import { useSpring, animated } from 'react-spring';

export const Drag = ({ children, ...props }) => {
  const [{ xy }, set] = useSpring(() => ({ xy: [0, 0] }));

  const ref = useRef({ xOffset: 0, yOffset: 0 });
  const elRef = useRef();
  const dragStart = (e) => {
    ref.current.initialX = e.clientX - ref.current.xOffset;
    ref.current.initialY = e.clientY - ref.current.yOffset;
    ref.current.active = true;

    document.body.style.cursor = 'grabbing';
    document.body.style.pointerEvents = 'none';
    if (!elRef.current) return;
    elRef.current.style.cursor = 'grabbing';
  };

  const dragEnd = () => {
    ref.current.initialX = ref.current.currentX;
    ref.current.initialY = ref.current.currentY;
    ref.current.active = false;
    document.body.style.cursor = 'auto';
    document.body.style.pointerEvents = 'all';
    if (!elRef.current) return;
    elRef.current.style.cursor = 'grab';
  };
  const drag = (e) => {
    if (!ref.current.active) return;

    e.preventDefault();
    // console.log(ref.current);
    // console.log(e.clientX);
    ref.current.currentX = e.clientX - ref.current.initialX;
    ref.current.currentY = e.clientY - ref.current.initialY;

    ref.current.xOffset = ref.current.currentX;
    ref.current.yOffset = ref.current.currentY;
    set({ xy: [ref.current.currentX, ref.current.currentY] });
  };
  useEffect(() => {
    if (!elRef.current) return;

    elRef.current.addEventListener('mousedown', dragStart, false);
    window.addEventListener('mouseup', dragEnd, false);
    window.addEventListener('mousemove', drag, false);

    return () => {
      if (!elRef.current) return;
      elRef.current.removeEventListener('mousedown', dragStart, false);
      window.removeEventListener('mouseup', dragEnd, false);
      window.removeEventListener('mousemove', drag, false);
    };
  });

  // arg1 === x; arg2 === y
  const setTransform = (x, y) => {
    ref.current = { xOffset: x, yOffset: y };
    set({ xy: [x, y] });
  };
  return (
    <animated.div
      {...props}
      ref={elRef}
      style={{
        pointerEvents: 'all',
        willChange: 'transform',
        cursor: 'grab',
        transform: xy.interpolate((x, y) => `translate3d(${x}px,${y}px,0)`),
      }}
    >
      {typeof children === 'function' ? children({ setTransform }) : children}
    </animated.div>
  );
};
