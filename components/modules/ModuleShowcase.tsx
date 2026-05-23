"use client";

import Image from "next/image";
import { useState } from "react";
import ImageSlider from "@/components/modules/ImageSlider";
import {
  DEMO_EMAIL,
  DEMO_WHATSAPP,
  type ModuleContent,
} from "@/lib/module-content";

export default function ModuleShowcase({ content }: { content: ModuleContent }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = content.slides[activeIndex];

  const emailHref = `mailto:${DEMO_EMAIL}?subject=${encodeURIComponent(content.demoSubject)}&body=${encodeURIComponent(content.demoMessage)}`;
  const whatsappHref = `https://wa.me/${DEMO_WHATSAPP}?text=${encodeURIComponent(content.demoMessage)}`;

  return (
    <div className="space-y-16 pb-8">
      {/* Section 1 — Image Slider */}
      <ImageSlider
        activeIndex={activeIndex}
        onSelect={setActiveIndex}
        slides={content.slides}
      />

      {/* Section 2 — Image Detail */}
      <section className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-outline-variant/20 shadow-xl">
          <Image
            alt={activeSlide.alt}
            className="object-cover transition-opacity duration-500"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            src={activeSlide.src}
          />
          <div className="absolute right-4 bottom-4 rounded-lg bg-primary/90 px-4 py-2 font-headline text-xs font-bold uppercase tracking-wider text-white backdrop-blur-sm">
            {activeSlide.caption}
          </div>
        </div>
        <div className="space-y-4">
          <p className="font-label text-[10px] font-bold uppercase tracking-[0.2em] text-on-tertiary-container">
            Image Detail
          </p>
          <h2 className="font-headline text-3xl font-extrabold text-primary sm:text-4xl">
            {content.detailTitle}
          </h2>
          <p className="text-base leading-relaxed text-secondary sm:text-lg">
            {content.detailDescription}
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {content.slides.map((slide, index) => (
              <button
                key={slide.src}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                  index === activeIndex
                    ? "signature-gradient text-white"
                    : "bg-surface-container text-secondary hover:bg-surface-dim"
                }`}
                onClick={() => setActiveIndex(index)}
                type="button"
              >
                View {index + 1}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3 — Explanation */}
      <section className="rounded-2xl border border-outline-variant/20 bg-white p-8 sm:p-12">
        <p className="mb-2 font-label text-[10px] font-bold uppercase tracking-[0.2em] text-on-tertiary-container">
          Explanation
        </p>
        <h2 className="font-headline text-3xl font-extrabold text-primary">
          {content.explanationTitle}
        </h2>
        <div className="mt-6 space-y-4">
          {content.explanationParagraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="text-secondary leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {content.highlights.map((item) => (
            <div
              key={item.title}
              className="flex gap-4 rounded-xl bg-surface-container-low p-5"
            >
              <span className="material-symbols-outlined text-2xl text-primary">
                {item.icon}
              </span>
              <div>
                <h3 className="font-headline font-bold text-primary">{item.title}</h3>
                <p className="mt-1 text-sm text-on-surface-variant">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4 — Book a Demo */}
      <section className="signature-gradient rounded-2xl p-8 text-center sm:p-12">
        <p className="font-label text-[10px] font-bold uppercase tracking-[0.2em] text-on-tertiary-container">
          Get Started
        </p>
        <h2 className="mt-2 font-headline text-3xl font-extrabold text-white sm:text-4xl">
          Book a Demo
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-primary-fixed-dim">
          See {content.title} in action. Reach out via email or WhatsApp and our
          team will schedule a personalized walkthrough for your operations.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-headline text-sm font-bold uppercase tracking-widest text-primary transition-colors hover:bg-tertiary-fixed"
            href={emailHref}
          >
            <span className="material-symbols-outlined text-base">mail</span>
            Email Us
          </a>
          <a
            className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-8 py-4 font-headline text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-white/10"
            href={whatsappHref}
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className="material-symbols-outlined text-base">chat</span>
            WhatsApp
          </a>
        </div>
        <p className="mt-6 text-sm text-primary-fixed-dim/80">
          {DEMO_EMAIL} · +{DEMO_WHATSAPP}
        </p>
      </section>
    </div>
  );
}
