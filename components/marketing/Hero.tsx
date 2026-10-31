import HeroBackground from "@/components/marketing/HeroBackground";
import { headline } from "@/lib/cargo-site";
import { db } from "@/lib/db";
import { isMissingRelation } from "@/lib/db/missing-relation";
import { heroConfig } from "@/lib/db/schema";
import { resolveHeroSlides } from "@/lib/hero-images";
import { eq } from "drizzle-orm";

async function loadHeroSlides() {
  try {
    const [row] = await db
      .select({ slides: heroConfig.slides })
      .from(heroConfig)
      .where(eq(heroConfig.slug, "default"))
      .limit(1);

    return resolveHeroSlides(row);
  } catch (error) {
    if (isMissingRelation(error)) return resolveHeroSlides(null);
    throw error;
  }
}

export default async function Hero() {
  const slides = await loadHeroSlides();

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
