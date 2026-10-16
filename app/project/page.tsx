import HomeNav from "@/components/layout/HomeNav";
import PillBadge from "@/components/ui/PillBadge";
import MarketingButton from "@/components/ui/MarketingButton";
import { projectContent } from "@/lib/project-content";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Projects | Dierhaul",
  description:
    "Dierhaul projects: DHL shipment tracking and logistics systems for containers, fleet, contracts, and ERP.",
};

export default function ProjectPage() {
  const featured = projectContent.items.find((project) => project.highlighted);
  const projects = projectContent.items.filter((project) => !project.highlighted);

  return (
    <>
      <main className="overflow-x-hidden bg-neutral-50">
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

        <section className="px-6 py-20">
          <div className="mx-auto flex max-w-screen-2xl flex-col gap-8">
            {featured ? (
              <article className="rounded-3xl bg-neutral-950 p-8 text-white sm:p-10">
                <p className="inline-block rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-medium text-emerald-300">
                  Live
                </p>
                <h2 className="font-display mt-5 max-w-3xl text-3xl font-medium tracking-tight sm:text-4xl">
                  {featured.title}
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-neutral-300 sm:text-base">
                  {featured.context}
                </p>
                <p className="mt-6 inline-block rounded-2xl bg-white/10 px-4 py-3 text-sm font-medium text-emerald-200">
                  {featured.outcome}
                </p>
                {featured.href && featured.cta ? (
                  <Link
                    href={featured.href}
                    className="mt-8 flex w-fit items-center text-sm font-medium text-white transition-colors hover:text-neutral-300"
                  >
                    {featured.cta}
                  </Link>
                ) : null}
              </article>
            ) : null}

            <div className="grid gap-8 lg:grid-cols-3">
              {projects.map((project) => (
                <article
                  key={project.id}
                  className="flex flex-col rounded-3xl border border-neutral-200/80 bg-white p-8 marketing-shadow-float"
                >
                  <h2 className="font-display text-2xl font-medium tracking-tight text-neutral-950">
                    {project.title}
                  </h2>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-neutral-600">
                    {project.context}
                  </p>
                  <p className="mt-6 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
                    {project.outcome}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

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
