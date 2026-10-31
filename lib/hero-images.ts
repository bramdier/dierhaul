export type HeroSlide = {
  src: string;
  alt: string;
};

export const HERO_SLIDE_LIMIT = 8;

export const DEFAULT_HERO_SLIDES: HeroSlide[] = [
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
];

export function defaultHeroSlides(): HeroSlide[] {
  return DEFAULT_HERO_SLIDES.map((slide) => ({ ...slide }));
}

export function resolveHeroSlides(
  source: { slides?: HeroSlide[] | null } | null | undefined
): HeroSlide[] {
  const stored = source?.slides;
  if (!stored || stored.length === 0) return defaultHeroSlides();

  return stored.slice(0, HERO_SLIDE_LIMIT).map((slide, index) => {
    const fallback = DEFAULT_HERO_SLIDES[index] ?? DEFAULT_HERO_SLIDES[0];
    return {
      src: slide?.src?.trim() || fallback.src,
      alt: slide?.alt?.trim() || fallback.alt,
    };
  });
}
