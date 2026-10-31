import { getSession } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { heroConfig } from "@/lib/db/schema";
import { HERO_SLIDE_LIMIT, type HeroSlide } from "@/lib/hero-images";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const DEFAULT_SLUG = "default";

function isSafeSrc(src: string) {
  if (src.length > 2000) return false;
  if (src.startsWith("/")) {
    return !src.startsWith("//") && !src.includes("..") && !src.includes("\\") && !/\s/.test(src);
  }
  try {
    return new URL(src).protocol === "https:";
  } catch {
    return false;
  }
}

function readSlides(body: Record<string, unknown>): HeroSlide[] | string {
  const slides = body.slides;
  if (!Array.isArray(slides) || slides.length === 0) {
    return "Add at least one hero image.";
  }
  if (slides.length > HERO_SLIDE_LIMIT) {
    return `Use at most ${HERO_SLIDE_LIMIT} hero images.`;
  }

  const items: HeroSlide[] = [];
  for (const slide of slides) {
    if (!slide || typeof slide !== "object" || Array.isArray(slide)) {
      return "Each image needs a src and alt.";
    }
    const src = (slide as { src?: unknown }).src;
    const alt = (slide as { alt?: unknown }).alt;
    if (typeof src !== "string" || !isSafeSrc(src.trim())) {
      return "Image address must be a site path or an https URL.";
    }
    if (typeof alt !== "string" || !alt.trim() || alt.trim().length > 180) {
      return "Each image needs a short description.";
    }
    items.push({ src: src.trim(), alt: alt.trim() });
  }

  return items;
}

export async function PATCH(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ error: "Expected an object." }, { status: 400 });
  }

  const slides = readSlides(body as Record<string, unknown>);
  if (typeof slides === "string") {
    return NextResponse.json({ error: slides }, { status: 400 });
  }

  const slug = DEFAULT_SLUG;
  const [existing] = await db
    .select({ id: heroConfig.id })
    .from(heroConfig)
    .where(eq(heroConfig.slug, slug))
    .limit(1);

  const [row] = existing
    ? await db
        .update(heroConfig)
        .set({ slides, updatedAt: new Date() })
        .where(eq(heroConfig.slug, slug))
        .returning()
    : await db.insert(heroConfig).values({ slug, slides }).returning();

  revalidatePath("/");
  return NextResponse.json(row);
}
