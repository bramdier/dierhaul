"use client";

import ImagePicker from "@/components/admin/ImagePicker";
import {
  HERO_SLIDE_LIMIT,
  defaultHeroSlides,
  resolveHeroSlides,
  type HeroSlide,
} from "@/lib/hero-images";
import { useState } from "react";

const inputClass =
  "w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition-shadow placeholder:text-neutral-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-500/20";

export default function HeroImagesForm({
  initial,
  library,
}: {
  initial: HeroSlide[];
  library: { src: string; label: string }[];
}) {
  const [slides, setSlides] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  function markDirty() {
    setSaved(false);
  }

  function updateSlide(index: number, patch: Partial<HeroSlide>) {
    markDirty();
    setSlides((current) =>
      current.map((slide, slideIndex) =>
        slideIndex === index ? { ...slide, ...patch } : slide
      )
    );
  }

  function moveSlide(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= slides.length) return;
    markDirty();
    setSlides((current) => {
      const next = [...current];
      const [item] = next.splice(index, 1);
      next.splice(target, 0, item);
      return next;
    });
  }

  function removeSlide(index: number) {
    if (slides.length <= 1) return;
    markDirty();
    setSlides((current) => current.filter((_, slideIndex) => slideIndex !== index));
  }

  function addSlide() {
    if (slides.length >= HERO_SLIDE_LIMIT) return;
    markDirty();
    const fallback = defaultHeroSlides()[0];
    setSlides((current) => [...current, { ...fallback }]);
  }

  function resetSlides() {
    markDirty();
    setSlides(defaultHeroSlides());
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setSaved(false);
    setSaving(true);

    try {
      const response = await fetch("/api/hero-images", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slides }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(typeof data.error === "string" ? data.error : "Could not save the hero.");
        return;
      }
      setSlides(resolveHeroSlides(data));
      setSaved(true);
    } catch {
      setError("Could not reach the server. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-3xl">
      <h1 className="text-xl font-semibold tracking-tight text-neutral-950">Hero image</h1>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-600">
        Choose the photos behind the homepage headline. They play in this order. One photo
        stays on screen; two or more crossfade.
      </p>

      <form onSubmit={handleSubmit} className="mt-8">
        <div className="rounded-3xl border border-neutral-200/80 bg-white p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-semibold tracking-tight text-neutral-950">Slideshow</h2>
            <button
              type="button"
              onClick={resetSlides}
              className="text-sm font-medium text-neutral-600 hover:text-neutral-950"
            >
              Reset to built-in photos
            </button>
          </div>

          <div className="mt-6 space-y-6">
            {slides.map((slide, index) => (
              <div
                key={`${index}-${slide.src}`}
                className="grid gap-4 border-t border-neutral-100 pt-6 first:border-t-0 first:pt-0 sm:grid-cols-[11rem_minmax(0,1fr)]"
              >
                <div className="relative aspect-video overflow-hidden rounded-xl bg-neutral-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={slide.src} alt="" className="h-full w-full object-cover" />
                </div>
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm font-medium text-neutral-800">
                      Photo {String(index + 1).padStart(2, "0")}
                    </p>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        aria-label={`Move photo ${index + 1} earlier`}
                        disabled={index === 0}
                        onClick={() => moveSlide(index, -1)}
                        className="rounded-lg px-2 py-1 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-950 disabled:opacity-30"
                      >
                        <span className="material-symbols-outlined text-base">arrow_upward</span>
                      </button>
                      <button
                        type="button"
                        aria-label={`Move photo ${index + 1} later`}
                        disabled={index === slides.length - 1}
                        onClick={() => moveSlide(index, 1)}
                        className="rounded-lg px-2 py-1 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-950 disabled:opacity-30"
                      >
                        <span className="material-symbols-outlined text-base">arrow_downward</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => removeSlide(index)}
                        disabled={slides.length <= 1}
                        className="rounded-lg px-2 py-1 text-sm font-medium text-neutral-500 hover:bg-neutral-100 hover:text-neutral-950 disabled:opacity-30"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <ImagePicker
                    label="Site image"
                    value={slide.src}
                    options={library}
                    onChange={(src) => updateSlide(index, { src })}
                  />
                  <label className="block">
                    <span className="mb-2 block text-xs font-medium text-neutral-600">
                      Description
                    </span>
                    <input
                      value={slide.alt}
                      onChange={(event) => updateSlide(index, { alt: event.target.value })}
                      className={inputClass}
                    />
                  </label>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addSlide}
            disabled={slides.length >= HERO_SLIDE_LIMIT}
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-neutral-200 px-4 py-2.5 text-sm font-medium text-neutral-800 hover:bg-neutral-50 disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-base">add</span>
            Add photo
          </button>
        </div>

        {error ? (
          <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
        ) : null}
        {saved ? (
          <p className="mt-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            Saved. The homepage hero will use these photos.
          </p>
        ) : null}

        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="rounded-full bg-neutral-950 px-8 py-3.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800 disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save hero"}
          </button>
        </div>
      </form>
    </div>
  );
}
