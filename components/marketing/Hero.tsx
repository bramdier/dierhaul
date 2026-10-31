import HeroBackground from "@/components/marketing/HeroBackground";
import { headline } from "@/lib/cargo-site";
import { defaultHeroSlides } from "@/lib/hero-images";

export default function Hero() {
  const slides = defaultHeroSlides();

  return (
    <section className="relative flex min-h-svh items-end overflow-hidden">
      <HeroBackground slides={slides} />
      <div className="relative z-10 w-full max-w-4xl px-4 pb-12 sm:px-6 sm:pb-16">
        <h1 className="font-heading text-4xl font-medium tracking-tight whitespace-pre-line text-white sm:text-5xl">
          {headline}
        </h1>
      </div>
    </section>
  );
}
