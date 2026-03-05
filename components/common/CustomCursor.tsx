"use client"

import React, { useEffect, useState, useRef } from 'react';
import '@/styles/components/common/CustomCursor.css'

const CustomCursor: React.FC = () => {
  const mousePos = useRef({ x: 0, y: 0 });
  const [followerPos, setFollowerPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice] = useState(() => {
    return typeof window !== 'undefined' && (
      'ontouchstart' in window || navigator.maxTouchPoints > 0
    );
  });

  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }

      const target = e.target as HTMLElement;
      setIsHovering(
        !!target.closest('[data-cursor="pointer"]') ||
        target.tagName === 'A' ||
        target.tagName === 'BUTTON'
      );
    };

    window.addEventListener('mousemove', handleMouseMove);

    let rafId: number;
    const updateFollower = () => {
      setFollowerPos(prev => ({
        x: prev.x + (mousePos.current.x - prev.x) * 0.15,
        y: prev.y + (mousePos.current.y - prev.y) * 0.15,
      }));
      rafId = requestAnimationFrame(updateFollower);
    };
    rafId = requestAnimationFrame(updateFollower);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [isTouchDevice]);

  if (isTouchDevice) return null; 

  return (
    <>
      <div ref={dotRef} className={`cursor-dot ${isHovering ? 'hovering' : ''}`} />
      <div 
        className={`cursor-follower ${isHovering ? 'hovering' : ''}`} 
        style={{ transform: `translate(${followerPos.x}px, ${followerPos.y}px)` }} 
      />
    </>
  );
};

export default CustomCursor;