import ProjectImagesForm from "@/components/admin/ProjectImagesForm";
import { db } from "@/lib/db";
import { projectConfig } from "@/lib/db/schema";
import { listImageLibrary } from "@/lib/image-library";
import { toProjectImagesDraft } from "@/lib/project-images";
import { eq } from "drizzle-orm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Project images | Dierhaul",
};

async function getStoredProjects() {
  const slug = "default";
  let [row] = await db
    .select()
    .from(projectConfig)
    .where(eq(projectConfig.slug, slug))
    .limit(1);

  if (!row) {
    [row] = await db.insert(projectConfig).values({ slug }).returning();
  }

  return row;
}

export default async function AdminProjectPage() {
  const [stored, library] = await Promise.all([getStoredProjects(), listImageLibrary()]);

  return <ProjectImagesForm initial={toProjectImagesDraft(stored)} library={library} />;
}
