import { getSession } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { projectConfig } from "@/lib/db/schema";
import {
  PROJECT_IMAGE_SLOTS,
  type ProjectImageSlot,
  type StoredProjectItem,
} from "@/lib/project-images";
import { eq } from "drizzle-orm";
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

function readProjects(body: Record<string, unknown>): StoredProjectItem[] | string {
  const projects = body.projects;
  if (!Array.isArray(projects) || projects.length === 0) {
    return "Add at least one project.";
  }
  if (projects.length > 40) return "Too many projects.";

  const items: StoredProjectItem[] = [];
  const seen = new Set<string>();

  for (const project of projects) {
    if (!project || typeof project !== "object" || Array.isArray(project)) {
      return "Each project must be an object.";
    }
    const id = (project as { id?: unknown }).id;
    const title = (project as { title?: unknown }).title;
    if (typeof id !== "string" || !/^[a-z0-9](?:[a-z0-9-]{0,59})$/.test(id)) {
      return "Invalid project id.";
    }
    if (seen.has(id)) return "Duplicate project.";
    seen.add(id);
    if (typeof title !== "string" || !title.trim() || title.trim().length > 80) {
      return "Each project needs a name.";
    }

    const slots = (project as { images?: unknown }).images;
    if (!Array.isArray(slots) || slots.length !== PROJECT_IMAGE_SLOTS.length) {
      return "Each project needs six images.";
    }

    const images: ProjectImageSlot[] = [];
    for (const slot of slots) {
      if (!slot || typeof slot !== "object" || Array.isArray(slot)) {
        return "Each image needs a src and alt.";
      }
      const src = (slot as { src?: unknown }).src;
      const alt = (slot as { alt?: unknown }).alt;
      if (typeof src !== "string" || !isSafeSrc(src.trim())) {
        return "Image address must be a site path or an https URL.";
      }
      if (typeof alt !== "string" || !alt.trim() || alt.trim().length > 180) {
        return "Each image needs a short description.";
      }
      images.push({ src: src.trim(), alt: alt.trim() });
    }

    items.push({ id, title: title.trim(), images });
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

  const items = readProjects(body as Record<string, unknown>);
  if (typeof items === "string") {
    return NextResponse.json({ error: items }, { status: 400 });
  }

  const images = Object.fromEntries(items.map((item) => [item.id, item.images]));
  const slug = DEFAULT_SLUG;
  const [existing] = await db
    .select({ id: projectConfig.id })
    .from(projectConfig)
    .where(eq(projectConfig.slug, slug))
    .limit(1);

  const [row] = existing
    ? await db
        .update(projectConfig)
        .set({ items, images, updatedAt: new Date() })
        .where(eq(projectConfig.slug, slug))
        .returning()
    : await db
        .insert(projectConfig)
        .values({ slug, items, images })
        .returning();

  return NextResponse.json(row);
}
