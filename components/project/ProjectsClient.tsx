"use client";

import type { ProjectItem } from "@/lib/project-content";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

/* ─────────────────────────────────────────────
   Shared: image gallery (right column)
───────────────────────────────────────────── */
function GalleryImage({
  src,
  alt,
  sizes,
}: {
  src: string;
  alt: string;
  sizes: string;
}) {
  if (src.startsWith("/")) {
    return <Image src={src} alt={alt} fill className="object-cover" sizes={sizes} />;
  }

  return (
    // Remote addresses chosen in admin are not limited to the image optimizer allowlist.
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className="absolute inset-0 h-full w-full object-cover" />
  );
}

function ProjectGallery({ project }: { project: ProjectItem }) {
  return (
    <div className="flex flex-col gap-3">
      {/* Row 1 — wide (1920×1080) */}
      {project.images[0] && (
        <div className="relative w-full overflow-hidden rounded-2xl aspect-video bg-neutral-100">
          <GalleryImage
            src={project.images[0].src}
            alt={project.images[0].alt}
            sizes="(max-width: 1024px) 100vw, 66vw"
          />
        </div>
      )}

      {/* Row 2 — two squares (1080×1080) */}
      {(project.images[1] || project.images[2]) && (
        <div className="grid grid-cols-2 gap-3">
          {project.images[1] && (
            <div className="relative overflow-hidden rounded-2xl aspect-square bg-neutral-100">
              <GalleryImage
                src={project.images[1].src}
                alt={project.images[1].alt}
                sizes="(max-width: 1024px) 50vw, 33vw"
              />
            </div>
          )}
          {project.images[2] && (
            <div className="relative overflow-hidden rounded-2xl aspect-square bg-neutral-100">
              <GalleryImage
                src={project.images[2].src}
                alt={project.images[2].alt}
                sizes="(max-width: 1024px) 50vw, 33vw"
              />
            </div>
          )}
        </div>
      )}

      {/* Row 3 — two squares (1080×1080) */}
      {(project.images[3] || project.images[4]) && (
        <div className="grid grid-cols-2 gap-3">
          {project.images[3] && (
            <div className="relative overflow-hidden rounded-2xl aspect-square bg-neutral-100">
              <GalleryImage
                src={project.images[3].src}
                alt={project.images[3].alt}
                sizes="(max-width: 1024px) 50vw, 33vw"
              />
            </div>
          )}
          {project.images[4] && (
            <div className="relative overflow-hidden rounded-2xl aspect-square bg-neutral-100">
              <GalleryImage
                src={project.images[4].src}
                alt={project.images[4].alt}
                sizes="(max-width: 1024px) 50vw, 33vw"
              />
            </div>
          )}
        </div>
      )}

      {/* Row 4 — wide (1920×1080) */}
      {project.images[5] && (
        <div className="relative w-full overflow-hidden rounded-2xl aspect-video bg-neutral-100">
          <GalleryImage
            src={project.images[5].src}
            alt={project.images[5].alt}
            sizes="(max-width: 1024px) 100vw, 66vw"
          />
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Shared: left-column info panel
───────────────────────────────────────────── */
function ProjectInfo({
  project,
  index,
  dark = false,
}: {
  project: ProjectItem;
  index: number;
  dark?: boolean;
}) {
  const muted = dark ? "text-neutral-400" : "text-neutral-400";
  const heading = dark ? "text-white" : "text-neutral-950";
  const body = dark ? "text-neutral-300" : "text-neutral-600";
  const outcomeClass = dark
    ? "bg-emerald-400/15 text-emerald-300"
    : "bg-emerald-50 text-emerald-800";
  const metaLabel = dark ? "text-neutral-400" : "text-neutral-400";
  const metaValue = dark ? "text-neutral-100" : "text-neutral-800";
  const divider = dark ? "border-white/10" : "border-neutral-200/80";

  return (
    <>
      {project.highlighted && (
        <span className="mb-4 inline-block w-fit rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-medium text-emerald-400">
          Live
        </span>
      )}
      <span className={`text-xs font-semibold uppercase tracking-widest ${muted}`}>
        {String(index + 1).padStart(2, "0")}
      </span>
      <h2 className={`font-display mt-3 text-3xl font-medium tracking-tight sm:text-4xl ${heading}`}>
        {project.title}
      </h2>
      <p className={`mt-4 text-sm leading-relaxed ${body}`}>{project.context}</p>
      <p className={`mt-5 rounded-2xl px-4 py-3 text-sm font-medium ${outcomeClass}`}>
        {project.outcome}
      </p>

      <dl className={`mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t pt-6 ${divider}`}>
        <div>
          <dt className={`text-xs font-semibold uppercase tracking-wider ${metaLabel}`}>
            Developer
          </dt>
          <dd className={`mt-1 text-sm font-medium ${metaValue}`}>{project.developer}</dd>
        </div>
        <div>
          <dt className={`text-xs font-semibold uppercase tracking-wider ${metaLabel}`}>
            Date Created
          </dt>
          <dd className={`mt-1 text-sm font-medium ${metaValue}`}>{project.dateCreated}</dd>
        </div>
      </dl>

      {project.href && project.cta && (
        <Link
          href={project.href}
          className={`mt-8 inline-flex w-fit items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
            dark
              ? "bg-white text-neutral-950 hover:bg-neutral-200"
              : "bg-neutral-950 text-white hover:bg-neutral-700"
          }`}
        >
          {project.cta}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      )}
    </>
  );
}

/* ─────────────────────────────────────────────
   Main client component
───────────────────────────────────────────── */
export default function ProjectsClient({ projects }: { projects: ProjectItem[] }) {
  const [featured, ...rest] = projects;
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section className="px-6 py-20">
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-8">

        {/* ── Featured (highlighted) project ── */}
        {featured && (
          <article className="rounded-3xl bg-neutral-950 p-8 sm:p-12">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
              {/* Left — sticky within the article */}
              <div className="flex flex-col lg:sticky lg:top-24 lg:self-start">
                <ProjectInfo project={featured} index={0} dark />
              </div>
              {/* Right — gallery */}
              <ProjectGallery project={featured} />
            </div>
          </article>
        )}

        {/* ── Accordion for remaining projects ── */}
        <div className="divide-y divide-neutral-200/80 rounded-3xl border border-neutral-200/80 bg-white overflow-hidden">
          {rest.map((project, i) => {
            const isOpen = openId === project.id;
            return (
              <div key={project.id}>
                {/* Accordion trigger */}
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : project.id)}
                  className="flex w-full items-center justify-between gap-4 px-8 py-6 text-left transition-colors hover:bg-neutral-50"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
                      {String(i + 2).padStart(2, "0")}
                    </span>
                    <span className="font-display text-lg font-medium text-neutral-950">
                      {project.title}
                    </span>
                  </div>
                  {/* Chevron */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className={`shrink-0 text-neutral-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>

                {/* Accordion panel */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="grid grid-cols-1 gap-10 px-8 pb-10 pt-4 lg:grid-cols-[1fr_2fr] lg:gap-16">
                      {/* Left — sticky within the open panel */}
                      <div className="flex flex-col lg:sticky lg:top-24 lg:self-start">
                        <ProjectInfo project={project} index={i + 1} />
                      </div>
                      {/* Right — gallery */}
                      <ProjectGallery project={project} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
