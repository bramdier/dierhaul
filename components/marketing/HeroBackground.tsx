"use client";

import type { HeroSlide } from "@/lib/hero-images";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const SLIDE_INTERVAL_MS = 6000;

export default function HeroBackground({ slides }: { slides: HeroSlide[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const [preloadNext, setPreloadNext] = useState(false);
  const activeRef = useRef(0);
  const count = slides.length;

  useEffect(() => {
    activeRef.current = 0;
    setActiveIndex(0);
    setPreviousIndex(null);
    setPreloadNext(false);
    if (count < 2) return;

    const preloadId = window.setTimeout(() => setPreloadNext(true), 1200);
    const id = window.setInterval(() => {
      const current = activeRef.current;
      const next = (current + 1) % count;
      activeRef.current = next;
      setPreviousIndex(current);
      setActiveIndex(next);
    }, SLIDE_INTERVAL_MS);
    return () => {
      window.clearTimeout(preloadId);
      window.clearInterval(id);
    };
  }, [count]);

  if (count === 0) return null;

  const safeActive = activeIndex < count ? activeIndex : 0;
  const safePrevious =
    previousIndex !== null && previousIndex < count ? previousIndex : null;
  const nextIndex = (safeActive + 1) % count;
  const visibleIndexes = Array.from(
    new Set(
      safePrevious === null
        ? preloadNext
          ? [safeActive, nextIndex]
          : [safeActive]
        : [safePrevious, safeActive, nextIndex],
    ),
  );

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      {visibleIndexes.map((index) => {
        const slide = slides[index];
        if (!slide) return null;
        const isActive = index === safeActive;
        return (
          <div
            key={index}
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
