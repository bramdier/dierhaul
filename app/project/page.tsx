import HomeNav from "@/components/layout/HomeNav";
import PillBadge from "@/components/ui/PillBadge";
import MarketingButton from "@/components/ui/MarketingButton";
import ProjectsClient from "@/components/project/ProjectsClient";
import { db } from "@/lib/db";
import { projectConfig } from "@/lib/db/schema";
import { projectContent } from "@/lib/project-content";
import { applyStoredProjects } from "@/lib/project-images";
import { eq } from "drizzle-orm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Dierhaul",
  description:
    "Dierhaul projects: DHL shipment tracking and logistics systems for containers, fleet, contracts, and ERP.",
};

async function getProjects() {
  const slug = "default";
  let [row] = await db
    .select()
    .from(projectConfig)
    .where(eq(projectConfig.slug, slug))
    .limit(1);

  if (!row) {
    [row] = await db.insert(projectConfig).values({ slug }).returning();
  }

  return applyStoredProjects(row);
}

export default async function ProjectPage() {
  const projects = await getProjects();

  return (
    <>
      <main className="overflow-x-hidden bg-neutral-50">
        {/* ── Hero header ── */}
        <div className="relative border-b border-neutral-200/80 bg-white px-6 pb-20 pt-28">
          <HomeNav />
          <div className="mx-auto max-w-screen-2xl text-center">
            <PillBadge>{projectContent.eyebrow}</PillBadge>
            <h1 className="font-display mt-6 text-5xl font-medium tracking-tight text-neutral-950 sm:text-6xl">
              {projectContent.title}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-neutral-600 sm:text-lg">
              {projectContent.subtitle}
            </p>
          </div>
        </div>

        {/* ── Projects: featured + accordion ── */}
        <ProjectsClient projects={projects} />

        {/* ── CTA footer ── */}
        <section className="px-6 pb-24">
          <div className="mx-auto max-w-3xl rounded-3xl bg-neutral-950 px-8 py-14 text-center">
            <h2 className="font-display text-3xl font-medium tracking-tight text-white sm:text-4xl">
              Start with one module
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-neutral-300">
              Start with tracking or sign in to your Dierhaul hub.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <MarketingButton href="/track" variant="secondary">
                Track shipment
              </MarketingButton>
              <MarketingButton
                href="/login"
                variant="ghost"
                className="!text-white hover:!text-neutral-300"
              >
                Sign in
              </MarketingButton>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
