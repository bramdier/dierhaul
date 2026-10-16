import HomeNav from "@/components/layout/HomeNav";
import OutlineBadge from "@/components/ui/OutlineBadge";
import MarketingButton from "@/components/ui/MarketingButton";
import { aboutContent } from "@/lib/about-content";
import { DEMO_EMAIL, DEMO_WHATSAPP } from "@/lib/module-content";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us | Dierhaul",
  description:
    "Meet Abraham Dier Spiez and Dhea Octa — the team behind Dierhaul's logistics platform.",
};

export default function AboutPage() {
  const emailHref = `mailto:${DEMO_EMAIL}?subject=${encodeURIComponent("Contact — Dierhaul")}`;
  const whatsappHref = `https://wa.me/${DEMO_WHATSAPP}?text=${encodeURIComponent("Hi, I'd like to connect regarding Dierhaul.")}`;

  return (
    <main className="min-h-svh overflow-x-hidden bg-neutral-100">
      <div className="relative px-6 pb-16 pt-28">
        <HomeNav />

        <div className="mx-auto max-w-6xl">
          <section className="overflow-hidden rounded-[2rem] bg-neutral-200/60 p-6 sm:p-8 lg:p-12">
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
              <div className="order-2 lg:order-1">
                <OutlineBadge>About us</OutlineBadge>
                <h1 className="mt-6 text-4xl font-bold tracking-tight text-neutral-950 sm:text-5xl">
                  {aboutContent.firmHeading}
                </h1>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-neutral-600 sm:text-lg">
                  {aboutContent.firmIntro}
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link
                    href="/login"
                    className="inline-flex items-center rounded-full bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                  >
                    Get Started
                  </Link>
                  <Link
                    href="/track"
                    className="inline-flex items-center justify-center rounded-full border-2 border-blue-600 px-6 py-2.5 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50"
                  >
                    Track shipment
                  </Link>
                </div>
                <div className="mt-10 border-t border-neutral-300/80 pt-8">
                  <div className="grid gap-8 sm:grid-cols-3">
                    {aboutContent.stats.map((stat) => (
                      <div key={stat.label}>
                        <p className="text-3xl font-bold tracking-tight text-neutral-950 sm:text-4xl">
                          {stat.value}
                        </p>
                        <p className="mt-2 text-sm leading-snug text-neutral-600">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <div className="relative mx-auto aspect-[4/3] w-full max-w-md overflow-hidden rounded-[1.75rem] bg-neutral-300 lg:max-w-none">
                  <Image
                    alt={aboutContent.image.alt}
                    className="object-cover object-center"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    src={aboutContent.image.src}
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="mt-10 rounded-[2rem] bg-white p-6 sm:p-8 lg:p-10">
            <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-4">
                <div className="relative mx-auto aspect-[4/5] w-full max-w-xs overflow-hidden rounded-[1.75rem] bg-neutral-200">
                  <Image
                    alt={aboutContent.founderImage.alt}
                    className="object-cover object-top"
                    fill
                    sizes="(max-width: 1024px) 100vw, 320px"
                    src={aboutContent.founderImage.src}
                  />
                </div>
              </div>
              <div className="lg:col-span-8">
                <OutlineBadge>Founder</OutlineBadge>
                <h2 className="font-display mt-5 text-3xl font-medium tracking-tight text-neutral-950">
                  {aboutContent.name}
                </h2>
                <p className="mt-2 text-base font-medium text-neutral-800">
                  {aboutContent.role}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-neutral-600">
                  {aboutContent.tagline}
                </p>
                <p className="mt-4 text-base leading-relaxed text-neutral-600">
                  {aboutContent.bio}
                </p>
              </div>
            </div>
          </section>

          <section className="mt-10 rounded-[2rem] bg-white p-6 sm:p-8 lg:p-10">
            <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-4">
                <div className="relative mx-auto aspect-[4/5] w-full max-w-xs overflow-hidden rounded-[1.75rem] bg-neutral-200">
                  <Image
                    alt={aboutContent.ceo.image.alt}
                    className="object-cover object-top"
                    fill
                    sizes="(max-width: 1024px) 100vw, 320px"
                    src={aboutContent.ceo.image.src}
                  />
                </div>
              </div>
              <div className="lg:col-span-8">
                <OutlineBadge>Operational</OutlineBadge>
                <h2 className="font-display mt-5 text-3xl font-medium tracking-tight text-neutral-950">
                  {aboutContent.ceo.name}
                </h2>
                <p className="mt-2 text-base font-medium text-neutral-800">
                  {aboutContent.ceo.role}
                </p>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-neutral-600 sm:text-base">
                  {aboutContent.ceo.tagline}
                </p>
              </div>
            </div>
          </section>

          <section className="mt-10 rounded-[2rem] bg-white p-6 sm:p-8 lg:p-10">
            <div className="mb-10 text-center sm:text-left">
              <OutlineBadge>Capabilities</OutlineBadge>
              <h2 className="font-display mt-5 text-3xl font-medium tracking-tight text-neutral-950 sm:text-4xl">
                Core capabilities
              </h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {aboutContent.highlights.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white">
                    <span className="material-symbols-outlined text-2xl text-blue-600">
                      {item.icon}
                    </span>
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-neutral-950">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-10 grid gap-6 rounded-[2rem] bg-neutral-950 p-6 text-white sm:p-8 lg:grid-cols-2 lg:p-10">
            <div>
              <span className="inline-block rounded-full border border-white/25 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white">
                Specializations
              </span>
              <h2 className="font-display mt-5 text-2xl font-medium tracking-tight sm:text-3xl">
                Technical focus areas
              </h2>
              <ul className="mt-6 space-y-3">
                {aboutContent.expertise.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-sm text-neutral-200"
                  >
                    <span className="material-symbols-outlined text-base text-blue-400">
                      check_circle
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col justify-center lg:items-end lg:text-right">
              <h2 className="font-display text-2xl font-medium tracking-tight">
                Let&apos;s build smarter logistics together.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-neutral-300">
                Reach out for Dierhaul demos, integrations, or enterprise
                logistics projects.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 lg:justify-end">
                <a
                  href={emailHref}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-100"
                >
                  <span className="material-symbols-outlined text-base">mail</span>
                  Email
                </a>
                <a
                  href={whatsappHref}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
                >
                  <span className="material-symbols-outlined text-base">chat</span>
                  WhatsApp
                </a>
              </div>
              <MarketingButton
                href="/project"
                variant="ghost"
                className="mt-4 !text-white hover:!text-neutral-300 lg:mr-0"
              >
                View projects
              </MarketingButton>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
