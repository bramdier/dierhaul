"use client";

import DhlLogo from "@/components/brand/DhlLogo";
import type { TrackerConfig } from "@/lib/db/schema";
import type { TrackingResponse } from "@/lib/dhl/tracking-types";
import { useState } from "react";

// Field keys that can appear in the result card detail grid
type FieldKey = "service" | "estimatedDelivery" | "origin" | "destination";

const FIELD_DEFAULTS: Record<FieldKey, string> = {
  service: "Service",
  estimatedDelivery: "Estimated delivery",
  origin: "Origin",
  destination: "Destination",
};

// Badge colour palette — only Tailwind classes that are statically known at build time
const BADGE_COLORS: Record<string, { bg: string; text: string }> = {
  emerald: { bg: "bg-emerald-50", text: "text-emerald-800" },
  blue:    { bg: "bg-blue-50",    text: "text-blue-800" },
  amber:   { bg: "bg-amber-50",   text: "text-amber-800" },
  red:     { bg: "bg-red-50",     text: "text-red-800" },
  neutral: { bg: "bg-neutral-100",text: "text-neutral-700" },
};

interface Props {
  config: TrackerConfig;
}

export default function ShipmentTracker({ config }: Props) {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [originCountryCode, setOriginCountryCode] = useState("");
  const [recipientPostalCode, setRecipientPostalCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TrackingResponse | null>(null);

  async function handleTrack(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setResult(null);

    const params = new URLSearchParams({ trackingNumber: trackingNumber.trim() });
    if (originCountryCode.trim()) {
      params.set("originCountryCode", originCountryCode.trim().toUpperCase());
    }
    if (recipientPostalCode.trim()) {
      params.set("recipientPostalCode", recipientPostalCode.trim());
    }

    try {
      const response = await fetch(`/api/track?${params.toString()}`);
      const data = (await response.json()) as TrackingResponse;
      setResult(data);
    } catch {
      setResult({
        configured: false,
        source: "error",
        message: "Could not reach the tracking service.",
      });
    } finally {
      setLoading(false);
    }
  }

  const cardClass = "rounded-3xl border border-neutral-200/80 bg-white p-6 sm:p-8";

  // Resolve badge colours, fall back to emerald
  const badge = BADGE_COLORS[config.statusBadgeColor] ?? BADGE_COLORS.emerald;

  // Cast visibleFields — DB returns it as jsonb (unknown[]) at runtime
  const visibleFields = (config.visibleFields ?? [
    "service",
    "estimatedDelivery",
    "origin",
    "destination",
  ]) as FieldKey[];

  // Merge DB label overrides on top of defaults
  const fieldLabels: Record<FieldKey, string> = {
    ...FIELD_DEFAULTS,
    ...(config.fieldLabels as Record<string, string>),
  };

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center">

      {/* ── Header ── */}
      <div className="mb-10 w-full max-w-2xl text-center">
        <div className="flex items-center justify-center gap-3">
          {config.logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={config.logoUrl} alt="Logo" className="h-8 w-auto" />
          ) : (
            <DhlLogo className="h-8 w-auto" />
          )}
        </div>
        <h1 className="font-display mt-6 text-4xl font-medium tracking-tight text-neutral-950 sm:text-5xl">
          {config.pageTitle}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-neutral-600 sm:text-lg">
          {config.pageSubtitle.replace(config.productName, "").trim()}{" "}
          <strong className="font-medium text-neutral-800">{config.productName}</strong>.
        </p>
      </div>

      {/* ── Search form ── */}
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
          disabled={loading}
          className="mt-6 w-full rounded-full bg-neutral-950 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800 disabled:opacity-60 sm:mx-auto sm:block sm:w-auto sm:px-8"
        >
          {loading ? config.buttonLoadingLabel : config.buttonLabel}
        </button>
      </form>

      {/* ── Status message ── */}
      {result?.message && (
        <p
          className={`mt-6 w-full max-w-2xl text-center text-sm ${
            result.source === "dhl" ? "text-neutral-600" : "text-amber-800"
          }`}
        >
          {result.message}
        </p>
      )}

      {/* ── Shipment result cards ── */}
      {result?.shipments?.map((shipment) => (
        <div key={shipment.id} className={`${cardClass} mt-8 w-full`}>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                {config.labelShipmentId}
              </p>
              <p className="mt-1 font-mono text-lg text-neutral-950">{shipment.id}</p>
            </div>
            {config.showStatusBadge && shipment.status && (
              <span className={`rounded-full px-3 py-1 text-sm font-medium ${badge.bg} ${badge.text}`}>
                {shipment.status}
                {shipment.statusDetail ? ` — ${shipment.statusDetail}` : ""}
              </span>
            )}
          </div>

          <dl className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
            {visibleFields.includes("service") && shipment.service && (
              <div>
                <dt className="text-neutral-500">{fieldLabels.service}</dt>
                <dd className="font-medium text-neutral-900">{shipment.service}</dd>
              </div>
            )}
            {visibleFields.includes("estimatedDelivery") && shipment.estimatedDelivery && (
              <div>
                <dt className="text-neutral-500">{fieldLabels.estimatedDelivery}</dt>
                <dd className="font-medium text-neutral-900">{shipment.estimatedDelivery}</dd>
              </div>
            )}
            {visibleFields.includes("origin") && shipment.origin && (
              <div>
                <dt className="text-neutral-500">{fieldLabels.origin}</dt>
                <dd className="font-medium text-neutral-900">{shipment.origin}</dd>
              </div>
            )}
            {visibleFields.includes("destination") && shipment.destination && (
              <div>
                <dt className="text-neutral-500">{fieldLabels.destination}</dt>
                <dd className="font-medium text-neutral-900">{shipment.destination}</dd>
              </div>
            )}
          </dl>

          {/* ── Event history timeline ── */}
          {config.showEventHistory && shipment.events.length > 0 && (
            <div className="mt-8">
              <h2 className="text-sm font-semibold text-neutral-950">
                {config.labelEventHistory}
              </h2>
              <ol className="mt-4 space-y-4 border-l border-neutral-200 pl-4">
                {shipment.events.map((event, index) => (
                  <li key={`${event.timestamp}-${index}`} className="relative">
                    <span
                      className={`absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full ${config.timelineDotColor}`}
                    />
                    <p className="text-sm font-medium text-neutral-900">
                      {event.description ?? event.statusCode ?? config.fallbackEventLabel}
                    </p>
                    {event.location && (
                      <p className="text-xs text-neutral-600">{event.location}</p>
                    )}
                    {event.timestamp && (
                      <p className="text-xs text-neutral-500">{event.timestamp}</p>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      ))}

      {/* ── Footer ── */}
      {config.showFooter && (
        <p className="mt-8 max-w-2xl text-center text-xs leading-relaxed text-neutral-500">
          {config.footerText}
        </p>
      )}
    </div>
  );
}
