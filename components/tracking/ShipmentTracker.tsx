"use client";

import DhlLogo from "@/components/brand/DhlLogo";
import type { TrackingResponse } from "@/lib/dhl/tracking-types";
import { useState } from "react";

export default function ShipmentTracker() {
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

  const cardClass =
    "rounded-3xl border border-neutral-200/80 bg-white p-6 sm:p-8";

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center">
      <div className="mb-10 w-full max-w-2xl text-center">
        <div className="flex items-center justify-center gap-3">
          <DhlLogo className="h-8 w-auto" />
        </div>
        <h1 className="font-display mt-6 text-4xl font-medium tracking-tight text-neutral-950 sm:text-5xl">
          Track your shipment
        </h1>
        <p className="mt-4 text-base leading-relaxed text-neutral-600 sm:text-lg">
          Live status, milestones, and delivery estimates via DHL{" "}
          <strong className="font-medium text-neutral-800">
            Shipment Tracking – Unified
          </strong>
          .
        </p>
      </div>

      <form onSubmit={handleTrack} className={`${cardClass} w-full max-w-2xl`}>
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-neutral-800">
            Tracking number
          </span>
          <input
            required
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            placeholder="e.g. 7777777770"
            className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm"
          />
        </label>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-xs font-medium text-neutral-600">
              Origin country (optional, ISO)
            </span>
            <input
              value={originCountryCode}
              onChange={(e) => setOriginCountryCode(e.target.value)}
              placeholder="DE"
              maxLength={2}
              className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm uppercase"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-xs font-medium text-neutral-600">
              Recipient postal code (optional)
            </span>
            <input
              value={recipientPostalCode}
              onChange={(e) => setRecipientPostalCode(e.target.value)}
              placeholder="10115"
              className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm"
            />
          </label>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-full bg-neutral-950 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800 disabled:opacity-60 sm:mx-auto sm:block sm:w-auto sm:px-8"
        >
          {loading ? "Tracking…" : "Track shipment"}
        </button>
      </form>

      {result?.message && (
        <p
          className={`mt-6 w-full max-w-2xl text-center text-sm ${
            result.source === "dhl" ? "text-neutral-600" : "text-amber-800"
          }`}
        >
          {result.message}
        </p>
      )}

      {result?.shipments?.map((shipment) => (
        <div key={shipment.id} className={`${cardClass} mt-8 w-full`}>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                Shipment
              </p>
              <p className="mt-1 font-mono text-lg text-neutral-950">{shipment.id}</p>
            </div>
            {shipment.status && (
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-800">
                {shipment.status}
                {shipment.statusDetail ? ` — ${shipment.statusDetail}` : ""}
              </span>
            )}
          </div>
          <dl className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
            {shipment.service && (
              <div>
                <dt className="text-neutral-500">Service</dt>
                <dd className="font-medium text-neutral-900">{shipment.service}</dd>
              </div>
            )}
            {shipment.estimatedDelivery && (
              <div>
                <dt className="text-neutral-500">Estimated delivery</dt>
                <dd className="font-medium text-neutral-900">
                  {shipment.estimatedDelivery}
                </dd>
              </div>
            )}
            {shipment.origin && (
              <div>
                <dt className="text-neutral-500">Origin</dt>
                <dd className="font-medium text-neutral-900">{shipment.origin}</dd>
              </div>
            )}
            {shipment.destination && (
              <div>
                <dt className="text-neutral-500">Destination</dt>
                <dd className="font-medium text-neutral-900">
                  {shipment.destination}
                </dd>
              </div>
            )}
          </dl>
          {shipment.events.length > 0 && (
            <div className="mt-8">
              <h2 className="text-sm font-semibold text-neutral-950">Event history</h2>
              <ol className="mt-4 space-y-4 border-l border-neutral-200 pl-4">
                {shipment.events.map((event, index) => (
                  <li key={`${event.timestamp}-${index}`} className="relative">
                    <span className="absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full bg-neutral-400" />
                    <p className="text-sm font-medium text-neutral-900">
                      {event.description ?? event.statusCode ?? "Update"}
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

      <p className="mt-8 max-w-2xl text-center text-xs leading-relaxed text-neutral-500">
        Tracking data is provided by DHL Shipment Tracking – Unified. Availability
        depends on carrier and product.
      </p>
    </div>
  );
}
