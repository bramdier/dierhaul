import HeroImagesForm from "@/components/admin/HeroImagesForm";
import { db } from "@/lib/db";
import { heroConfig } from "@/lib/db/schema";
import { resolveHeroSlides } from "@/lib/hero-images";
import { listImageLibrary } from "@/lib/image-library";
import { eq } from "drizzle-orm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hero image | Dierhaul",
};

async function getStoredHero() {
  const slug = "default";
  let [row] = await db.select().from(heroConfig).where(eq(heroConfig.slug, slug)).limit(1);

  if (!row) {
    [row] = await db.insert(heroConfig).values({ slug }).returning();
  }

  return row;
}

export default async function AdminHeroPage() {
  const [stored, library] = await Promise.all([getStoredHero(), listImageLibrary()]);
  return <HeroImagesForm initial={resolveHeroSlides(stored)} library={library} />;
}
