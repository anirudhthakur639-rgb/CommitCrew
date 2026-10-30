"use client";

import React, { useEffect, useState, useRef } from "react";

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const requestRef = useRef<number | null>(null);
  const posRef = useRef({ x: -100, y: -100 });
  const trailingRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Only activate custom cursor on devices with mouse/fine pointer
    if (typeof window === "undefined" || !window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check if target or parent is an interactive element
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest("button, a, input, [role='button'], .pixel-btn, .cursor-pointer");
        setIsHovered(!!interactive);
      }
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Smooth lerp loop for the trailing outer ring
    const animateTrailingCursor = () => {
      trailingRef.current.x += (posRef.current.x - trailingRef.current.x) * 0.22;
      trailingRef.current.y += (posRef.current.y - trailingRef.current.y) * 0.22;
      setTrailingPos({ x: trailingRef.current.x, y: trailingRef.current.y });
      requestRef.current = requestAnimationFrame(animateTrailingCursor);
    };

    requestRef.current = requestAnimationFrame(animateTrailingCursor);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Animated Glow Ring (Smooth Trailing) */}
      <div
        className={`fixed top-0 left-0 pointer-events-none z-[9999] rounded-full transition-transform duration-100 ease-out will-change-transform ${
          isHovered
            ? "w-12 h-12 -ml-6 -mt-6 border-2 border-[#06d6a0] bg-[#06d6a0]/15 shadow-[0_0_20px_#06d6a0] scale-110"
            : isClicked
            ? "w-7 h-7 -ml-3.5 -mt-3.5 border-2 border-[#ffd166] bg-[#ffd166]/30 shadow-[0_0_15px_#ffd166] scale-90"
            : "w-8 h-8 -ml-4 -mt-4 border-2 border-[#06d6a0]/70 bg-transparent shadow-[0_0_8px_rgba(6,214,160,0.4)]"
        }`}
        style={{
          transform: `translate3d(${trailingPos.x}px, ${trailingPos.y}px, 0)`,
        }}
      >
        {/* Animated Crosshair Pulse Dots on hover */}
        {isHovered && (
          <div className="absolute inset-0 rounded-full animate-ping opacity-30 border border-[#06d6a0]" />
        )}
      </div>

      {/* Inner Precision Point (Snappy Instant Follow) */}
      <div
        className={`fixed top-0 left-0 pointer-events-none z-[10000] rounded-full will-change-transform ${
          isHovered
            ? "w-2.5 h-2.5 -ml-1.25 -mt-1.25 bg-[#ffd166] shadow-[0_0_8px_#ffd166]"
            : isClicked
            ? "w-3 h-3 -ml-1.5 -mt-1.5 bg-[#ef476f] shadow-[0_0_10px_#ef476f]"
            : "w-2 h-2 -ml-1 -mt-1 bg-[#06d6a0] shadow-[0_0_6px_#06d6a0]"
        }`}
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        }}
      />
    </>
  );
};

