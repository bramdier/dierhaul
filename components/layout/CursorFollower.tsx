"use client";

import { useEffect, useRef } from "react";

export default function CursorFollower() {
  const oval = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = oval.current;
    if (!el) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let visible = false;
    let frame = 0;

    const onMove = (event: MouseEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      if (!visible) {
        visible = true;
        currentX = targetX;
        currentY = targetY;
        el.style.opacity = "1";
      }
    };

    const onLeave = () => {
      visible = false;
      el.style.opacity = "0";
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.35;
      currentY += (targetY - currentY) * 0.35;
      el.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    frame = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={oval}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[80] h-1.5 w-2 rounded-full bg-[#ff7a1a] opacity-0 shadow-[0_0_5px_rgba(255,122,26,0.65)] will-change-transform"
    />
  );
}
