"use client";

import Image from "next/image";
import { useCallback, useEffect } from "react";
import type { ModuleSlide } from "@/lib/module-content";

export default function ImageSlider({
  slides,
  activeIndex,
  onSelect,
}: {
  slides: ModuleSlide[];
  activeIndex: number;
  onSelect: (index: number) => void;
}) {
  const goTo = useCallback(
    (index: number) => {
      onSelect((index + slides.length) % slides.length);
    },
    [onSelect, slides.length]
  );

  useEffect(() => {
    const timer = setInterval(() => {
      onSelect((activeIndex + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [activeIndex, onSelect, slides.length]);

  return (
    <section className="relative overflow-hidden rounded-2xl border border-outline-variant/20 bg-primary shadow-2xl">
      <div className="relative aspect-[21/9] min-h-[280px] sm:min-h-[360px]">
        {slides.map((slide, index) => (
          <div
            key={slide.src}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === activeIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              alt={slide.alt}
              className="object-cover"
              fill
              priority={index === 0}
              sizes="(max-width: 1280px) 100vw, 1280px"
              src={slide.src}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent" />
          </div>
        ))}

        <div className="absolute right-0 bottom-0 left-0 p-6 sm:p-10">
          <p className="mb-2 font-label text-[10px] font-bold uppercase tracking-[0.2em] text-on-tertiary-container">
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(slides.length).padStart(2, "0")}
          </p>
          <p className="max-w-xl font-headline text-xl font-bold text-white sm:text-2xl">
            {slides[activeIndex].caption}
          </p>
        </div>

        <button
          aria-label="Previous slide"
          className="absolute top-1/2 left-4 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors hover:bg-white/30"
          onClick={() => goTo(activeIndex - 1)}
          type="button"
        >
          <span className="material-symbols-outlined">chevron_left</span>
        </button>
        <button
          aria-label="Next slide"
          className="absolute top-1/2 right-4 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors hover:bg-white/30"
          onClick={() => goTo(activeIndex + 1)}
          type="button"
        >
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      </div>

      <div className="flex justify-center gap-2 bg-primary px-4 py-4">
        {slides.map((slide, index) => (
          <button
            key={slide.src}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2 rounded-full transition-all ${
              index === activeIndex
                ? "w-8 bg-on-tertiary-container"
                : "w-2 bg-white/30 hover:bg-white/50"
            }`}
            onClick={() => onSelect(index)}
            type="button"
          />
        ))}
      </div>
    </section>
  );
}
