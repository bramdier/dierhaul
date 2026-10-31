"use client";

import DhlLogo from "@/components/brand/DhlLogo";
import type { TrackerContent } from "@/lib/tracker-content";
import { useState } from "react";

const UNAVAILABLE =
  "Live carrier lookup is not available on this site.";

export default function ShipmentTracker({ config }: { config: TrackerContent }) {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [originCountryCode, setOriginCountryCode] = useState("");
  const [recipientPostalCode, setRecipientPostalCode] = useState("");
  const [notice, setNotice] = useState<string | null>(null);

  function handleTrack(event: React.FormEvent) {
    event.preventDefault();
    setNotice(UNAVAILABLE);
  }

  const cardClass = "rounded-3xl border border-neutral-200/80 bg-white p-6 sm:p-8";

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center">
      <div className="mb-10 w-full max-w-2xl text-center">
        <div className="flex items-center justify-center gap-3">
          {config.logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={config.logoUrl} alt="Logo" className="h-8 w-auto" />
          ) : (
            <DhlLogo className="h-8 w-auto" />
          )}
        </div>
        <h2 className="font-display mt-6 text-4xl font-medium tracking-tight text-neutral-950 sm:text-5xl">
          {config.pageTitle}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-neutral-600 sm:text-lg">
          {config.pageSubtitle.replace(config.productName, "").trim()}{" "}
          <strong className="font-medium text-neutral-800">{config.productName}</strong>.
        </p>
      </div>

      <form onSubmit={handleTrack} className={`${cardClass} w-full max-w-2xl`}>
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-neutral-800">
            {config.labelTrackingNumber}
          </span>
          <input
            required
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            placeholder={config.placeholderTrackingNumber}
            className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm"
          />
        </label>

        {(config.showOriginField || config.showPostalField) && (
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {config.showOriginField && (
              <label className="block">
                <span className="mb-2 block text-xs font-medium text-neutral-600">
                  {config.labelOriginCountry}
                </span>
                <input
                  value={originCountryCode}
                  onChange={(e) => setOriginCountryCode(e.target.value)}
                  placeholder={config.placeholderOriginCountry}
                  maxLength={2}
                  className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm uppercase"
                />
              </label>
            )}
            {config.showPostalField && (
              <label className="block">
                <span className="mb-2 block text-xs font-medium text-neutral-600">
                  {config.labelPostalCode}
                </span>
                <input
                  value={recipientPostalCode}
                  onChange={(e) => setRecipientPostalCode(e.target.value)}
                  placeholder={config.placeholderPostalCode}
                  className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm"
                />
              </label>
            )}
          </div>
        )}

        <button
          type="submit"
          className="mt-6 w-full rounded-full bg-neutral-950 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800 sm:mx-auto sm:block sm:w-auto sm:px-8"
        >
          {config.buttonLabel}
        </button>
      </form>

      {notice ? (
        <p className="mt-6 w-full max-w-2xl text-center text-sm text-amber-800">
          {notice}
        </p>
      ) : null}

      {config.showFooter && (
        <p className="mt-8 max-w-2xl text-center text-xs leading-relaxed text-neutral-500">
          {config.footerText}
        </p>
      )}
    </div>
  );
}
