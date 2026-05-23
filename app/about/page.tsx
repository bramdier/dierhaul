import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { aboutContent } from "@/lib/about-content";
import { DEMO_EMAIL, DEMO_WHATSAPP } from "@/lib/module-content";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us | Dierhaul",
  description:
    "Meet Abraham Dier Spiez — Software Engineer specializing in enterprise applications, ERP systems, and logistics optimization.",
};

export default function AboutPage() {
  const emailHref = `mailto:${DEMO_EMAIL}?subject=${encodeURIComponent("Contact — Dierhaul")}`;
  const whatsappHref = `https://wa.me/${DEMO_WHATSAPP}?text=${encodeURIComponent("Hi, I'd like to connect regarding Dierhaul.")}`;

  return (
    <>
      <Header />
      <main className="overflow-x-hidden pt-24">
        <section className="industrial-grid px-6 py-20 lg:px-12">
          <div className="mx-auto max-w-screen-2xl">
            <div className="grid items-center gap-12 lg:grid-cols-12">
              <div className="lg:col-span-7 space-y-6">
                <span className="inline-block rounded bg-primary-container px-3 py-1 font-label text-[10px] font-bold uppercase tracking-[0.2em] text-on-primary-container">
                  About Us
                </span>
                <h1 className="font-headline text-4xl font-extrabold leading-tight text-primary sm:text-5xl lg:text-6xl">
                  {aboutContent.name}
                </h1>
                <p className="font-headline text-xl font-bold text-secondary">
                  {aboutContent.role}
                </p>
                <p className="max-w-2xl text-lg text-on-surface-variant">
                  {aboutContent.tagline}
                </p>
              </div>
              <div className="space-y-6 lg:col-span-5">
                <div className="relative mx-auto aspect-square max-w-sm overflow-hidden rounded-2xl border border-outline-variant/20 bg-surface-container-lowest shadow-2xl">
                  <Image
                    alt={aboutContent.image.alt}
                    className="object-cover"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 384px"
                    src={aboutContent.image.src}
                  />
                </div>
                <div className="signature-gradient rounded-2xl p-8 text-white shadow-2xl">
                  <p className="font-label text-[10px] font-bold uppercase tracking-[0.2em] text-on-tertiary-container">
                    Dierhaul Founder
                  </p>
                  <p className="mt-4 font-headline text-2xl font-bold">
                    Engineering logistics platforms that scale.
                  </p>
                  <div className="mt-6 space-y-3 border-t border-white/20 pt-6">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-on-tertiary-container">
                        work_history
                      </span>
                      <span className="text-sm text-primary-fixed-dim">
                        5 years enterprise software experience
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-on-tertiary-container">
                        groups
                      </span>
                      <span className="text-sm text-primary-fixed-dim">
                        Platforms serving 500+ users & units
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-on-tertiary-container">
                        psychology
                      </span>
                      <span className="text-sm text-primary-fixed-dim">
                        AI Agent integration specialist
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-outline-variant/15 bg-white px-6 py-20">
          <div className="mx-auto max-w-3xl">
            <p className="mb-2 font-label text-[10px] font-bold uppercase tracking-[0.2em] text-on-tertiary-container">
              Profile
            </p>
            <h2 className="font-headline text-3xl font-extrabold text-primary">
              Background & Expertise
            </h2>
            <p className="mt-6 text-base leading-relaxed text-secondary sm:text-lg">
              {aboutContent.bio}
            </p>
          </div>
        </section>

        <section className="bg-surface-container-low px-6 py-20">
          <div className="mx-auto max-w-screen-2xl">
            <div className="mb-12 text-center">
              <h2 className="font-headline text-3xl font-extrabold text-primary">
                Core Capabilities
              </h2>
              <div className="mx-auto mt-4 h-1 w-24 bg-tertiary" />
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {aboutContent.highlights.map((item) => (
                <div
                  key={item.title}
                  className="border border-outline-variant/20 bg-white p-6 transition-colors hover:border-primary"
                >
                  <span className="material-symbols-outlined text-3xl text-primary">
                    {item.icon}
                  </span>
                  <h3 className="mt-4 font-headline text-lg font-bold text-primary">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-20">
          <div className="mx-auto max-w-screen-2xl">
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <p className="mb-2 font-label text-[10px] font-bold uppercase tracking-[0.2em] text-on-tertiary-container">
                  Specializations
                </p>
                <h2 className="font-headline text-3xl font-extrabold text-primary">
                  Technical Focus Areas
                </h2>
                <ul className="mt-6 space-y-3">
                  {aboutContent.expertise.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 border-b border-outline-variant/10 pb-3 text-secondary"
                    >
                      <span className="material-symbols-outlined text-base text-on-tertiary-container">
                        check_circle
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="signature-gradient flex flex-col justify-center rounded-2xl p-8 text-white sm:p-10">
                <p className="font-label text-[10px] font-bold uppercase tracking-[0.2em] text-on-tertiary-container">
                  Get in Touch
                </p>
                <h2 className="mt-2 font-headline text-2xl font-extrabold sm:text-3xl">
                  Let&apos;s build smarter logistics together.
                </h2>
                <p className="mt-4 text-primary-fixed-dim">
                  Interested in Dierhaul or enterprise logistics solutions? Reach
                  out directly via email or WhatsApp.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-headline text-sm font-bold uppercase tracking-widest text-primary transition-colors hover:bg-tertiary-fixed"
                    href={emailHref}
                  >
                    <span className="material-symbols-outlined text-base">mail</span>
                    Email
                  </a>
                  <a
                    className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3 font-headline text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-white/10"
                    href={whatsappHref}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span className="material-symbols-outlined text-base">chat</span>
                    WhatsApp
                  </a>
                </div>
                <Link
                  href="/#modules"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-primary-fixed hover:text-white"
                >
                  Explore Dierhaul Platform
                  <span className="material-symbols-outlined text-base">
                    arrow_forward
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
