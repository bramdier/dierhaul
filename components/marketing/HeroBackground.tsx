"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % heroSlides.length);
    }, SLIDE_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      {heroSlides.map((slide, index) => (
        <div
          key={slide.src}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === activeIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.src}
            alt={index === activeIndex ? slide.alt : ""}
            fill
            priority={index === 0}
            quality={92}
            sizes="100vw"
            className="animate-cinematic object-cover object-center"
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.4)_42%,rgba(0,0,0,0.15)_100%)]" />
    </div>
  );
}
