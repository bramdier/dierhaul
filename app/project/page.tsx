import MarketingShell from "@/components/layout/MarketingShell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProjectsClient from "@/components/project/ProjectsClient";
import { db } from "@/lib/db";
import { projectConfig } from "@/lib/db/schema";
import { projectContent } from "@/lib/project-content";
import { applyStoredProjects } from "@/lib/project-images";
import { eq } from "drizzle-orm";
import type { Metadata } from "next";
import Link from "next/link";

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
    <MarketingShell>
      <main className="overflow-x-hidden bg-background">
        <div className="border-b border-border bg-card px-6 py-16">
          <div className="mx-auto flex max-w-screen-2xl flex-col items-center gap-4 text-center">
            <Badge variant="secondary">{projectContent.eyebrow}</Badge>
            <h1 className="font-heading text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
              {projectContent.title}
            </h1>
            <p className="max-w-2xl text-base text-muted-foreground">
              {projectContent.subtitle}
            </p>
          </div>
        </div>

        {/* ── Projects: featured + accordion ── */}
        <ProjectsClient projects={projects} />

        {/* ── CTA footer ── */}
        <section className="px-6 py-16">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 rounded-xl bg-primary px-8 py-12 text-center text-primary-foreground">
            <h2 className="font-heading text-3xl font-medium tracking-tight">
              Request a demo
            </h2>
            <p className="max-w-xl text-primary-foreground/80">
              Walk through booking, acceptance, and the air waybill on your
              operation.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Button
                nativeButton={false}
                render={<Link href="/demo" />}
                variant="secondary"
              >
                Request a demo
              </Button>
              <Button
                nativeButton={false}
                render={<Link href="/login" />}
                variant="outline"
              >
                Login
              </Button>
            </div>
          </div>
        </section>
      </main>
    </MarketingShell>
  );
}
