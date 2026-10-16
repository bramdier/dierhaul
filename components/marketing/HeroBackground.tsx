"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const SLIDE_INTERVAL_MS = 6000;

export const heroSlides = [
  {
    src: "/images/01_container_yard.jpg",
    alt: "Container terminal walkway at sunrise with trucks and gantry cranes",
  },
  {
    src: "/images/02_mega_chiller.jpg",
    alt: "Heavy industrial cargo transport with coordinated yard operations",
  },
  {
    src: "/images/03_board_meeting.jpg",
    alt: "Global logistics planning with world map and operations team",
  },
  {
    src: "/images/04_reach_stacker.jpg",
    alt: "Reach stacker lifting a container in a busy port terminal",
  },
] as const;

export default function HeroBackground() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const [preloadNext, setPreloadNext] = useState(false);
  const activeRef = useRef(0);

  useEffect(() => {
    const preloadId = window.setTimeout(() => setPreloadNext(true), 1200);
    const id = window.setInterval(() => {
      const current = activeRef.current;
      const next = (current + 1) % heroSlides.length;
      activeRef.current = next;
      setPreviousIndex(current);
      setActiveIndex(next);
    }, SLIDE_INTERVAL_MS);
    return () => {
      window.clearTimeout(preloadId);
      window.clearInterval(id);
    };
  }, []);

  const nextIndex = (activeIndex + 1) % heroSlides.length;
  const visibleIndexes = Array.from(
    new Set(
      previousIndex === null
        ? preloadNext
          ? [activeIndex, nextIndex]
          : [activeIndex]
        : [previousIndex, activeIndex, nextIndex],
    ),
  );

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      {visibleIndexes.map((index) => {
        const slide = heroSlides[index];
        const isActive = index === activeIndex;
        return (
          <div
            key={slide.src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.src}
              alt={isActive ? slide.alt : ""}
              fill
              priority={index === 0}
              quality={92}
              sizes="100vw"
              className={`object-cover object-center ${isActive ? "animate-cinematic" : ""}`}
            />
          </div>
        );
      })}
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.4)_42%,rgba(0,0,0,0.15)_100%)]" />
    </div>
  );
}
