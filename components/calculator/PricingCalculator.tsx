"use client";

import PillBadge from "@/components/ui/PillBadge";
import { cargoTypes } from "@/lib/mock-data";
import {
  parseLocationLabel,
  tonnesToKg,
  volumeToCmDimensions,
} from "@/lib/dhl/parse-route";
import type { DhlQuoteResponse } from "@/lib/dhl/types";
import { calculatePricing, formatCurrency } from "@/lib/pricing-engine";
import type { PricingInput } from "@/lib/types";
import { useMemo, useState } from "react";

const defaultInput: PricingInput = {
  cargoWeight: 24,
  cargoVolume: 40,
  distance: 1200,
  origin: "Shanghai, CN",
  destination: "Rotterdam, NL",
  cargoType: "Containerized Freight",
  urgency: "standard",
  insurance: true,
  customsClearance: true,
};

function RiskBadge({ score }: { score: number }) {
  const level = score >= 70 ? "High" : score >= 40 ? "Medium" : "Low";
  const color =
    score >= 70
      ? "bg-red-100 text-red-800"
      : score >= 40
        ? "bg-amber-100 text-amber-800"
        : "bg-green-100 text-green-800";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${color}`}>
      {level} Risk ({score}/100)
    </span>
  );
}

export default function PricingCalculator() {
  const [input, setInput] = useState<PricingInput>(defaultInput);
  const [dhlQuote, setDhlQuote] = useState<DhlQuoteResponse | null>(null);
  const [dhlLoading, setDhlLoading] = useState(false);

  const result = useMemo(() => calculatePricing(input), [input]);

  const update = <K extends keyof PricingInput>(
    key: K,
    value: PricingInput[K]
  ) => {
    setInput((prev) => ({ ...prev, [key]: value }));
  };

  async function fetchDhlQuote() {
    setDhlLoading(true);
    setDhlQuote(null);

    const shipper = parseLocationLabel(input.origin);
    const receiver = parseLocationLabel(input.destination);
    const dims = volumeToCmDimensions(input.cargoVolume);

    try {
      const response = await fetch("/api/quotes/dhl", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shipper,
          receiver,
          weightKg: tonnesToKg(input.cargoWeight),
          ...dims,
        }),
      });
      const data = (await response.json()) as DhlQuoteResponse;
      setDhlQuote(data);
    } catch {
      setDhlQuote({
        source: "error",
        configured: false,
        message: "Could not reach the quote service.",
      });
    } finally {
      setDhlLoading(false);
    }
  }

  const cardClass =
    "rounded-3xl border border-neutral-200/80 bg-white p-6";

  return (
    <div>
      <div className="mb-10 max-w-2xl">
        <PillBadge>Pricing calculator</PillBadge>
        <h1 className="font-display mt-6 text-4xl font-medium tracking-tight text-neutral-950 sm:text-5xl">
          Cargo pricing calculator
        </h1>
        <p className="mt-4 text-base leading-relaxed text-neutral-600 sm:text-lg">
          Instant freight estimates with transparent breakdowns, or fetch
          indicative DHL Express rates when API credentials are configured.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-5">
        <div className="space-y-6 lg:col-span-3">
          <div className={cardClass}>
            <h3 className="mb-6 text-lg font-semibold text-neutral-950">
              Cargo details
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1 block text-xs font-medium text-neutral-600">
                  Cargo weight (tonnes)
                </span>
                <input
                  className="w-full rounded-xl border border-neutral-200 px-3 py-2.5 text-sm"
                  min={0}
                  step={0.1}
                  type="number"
                  value={input.cargoWeight}
                  onChange={(e) =>
                    update("cargoWeight", parseFloat(e.target.value) || 0)
                  }
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-xs font-medium text-neutral-600">
                  Cargo volume (m³)
                </span>
                <input
                  className="w-full rounded-xl border border-neutral-200 px-3 py-2.5 text-sm"
                  min={0}
                  step={0.1}
                  type="number"
                  value={input.cargoVolume}
                  onChange={(e) =>
                    update("cargoVolume", parseFloat(e.target.value) || 0)
                  }
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-xs font-medium text-neutral-600">
                  Origin (City, CC)
                </span>
                <input
                  className="w-full rounded-xl border border-neutral-200 px-3 py-2.5 text-sm"
                  type="text"
                  value={input.origin}
                  onChange={(e) => update("origin", e.target.value)}
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-xs font-medium text-neutral-600">
                  Destination (City, CC)
                </span>
                <input
                  className="w-full rounded-xl border border-neutral-200 px-3 py-2.5 text-sm"
                  type="text"
                  value={input.destination}
                  onChange={(e) => update("destination", e.target.value)}
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="mb-1 block text-xs font-medium text-neutral-600">
                  Distance (km)
                </span>
                <input
                  className="w-full rounded-xl border border-neutral-200 px-3 py-2.5 text-sm"
                  min={0}
                  type="number"
                  value={input.distance}
                  onChange={(e) =>
                    update("distance", parseFloat(e.target.value) || 0)
                  }
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="mb-1 block text-xs font-medium text-neutral-600">
                  Cargo type
                </span>
                <select
                  className="w-full rounded-xl border border-neutral-200 px-3 py-2.5 text-sm"
                  value={input.cargoType}
                  onChange={(e) => update("cargoType", e.target.value)}
                >
                  {cargoTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          <div className={cardClass}>
            <h3 className="mb-6 text-lg font-semibold text-neutral-950">
              Service options
            </h3>
            <div className="space-y-4">
              <div>
                <span className="mb-2 block text-xs font-medium text-neutral-600">
                  Urgency level
                </span>
                <div className="flex flex-wrap gap-2">
                  {(
                    [
                      { value: "standard", label: "Standard" },
                      { value: "express", label: "Express (+35%)" },
                      { value: "critical", label: "Critical (+75%)" },
                    ] as const
                  ).map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => update("urgency", option.value)}
                      className={`rounded-full px-4 py-2 text-xs font-medium ${
                        input.urgency === option.value
                          ? "bg-neutral-950 text-white"
                          : "bg-neutral-100 text-neutral-700"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  checked={input.insurance}
                  className="h-4 w-4 rounded border-neutral-300"
                  type="checkbox"
                  onChange={(e) => update("insurance", e.target.checked)}
                />
                <span className="text-sm text-neutral-700">
                  Include cargo insurance (+8% of base rate)
                </span>
              </label>
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  checked={input.customsClearance}
                  className="h-4 w-4 rounded border-neutral-300"
                  type="checkbox"
                  onChange={(e) =>
                    update("customsClearance", e.target.checked)
                  }
                />
                <span className="text-sm text-neutral-700">
                  Include customs clearance processing
                </span>
              </label>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="sticky top-8 space-y-4">
            <div className="rounded-3xl bg-neutral-950 p-6 text-white">
              <p className="text-xs font-medium uppercase tracking-wider text-neutral-400">
                Local estimate
              </p>
              <p className="font-display mt-2 text-4xl font-medium">
                {formatCurrency(result.totalEstimate)}
              </p>
              <div className="mt-3">
                <RiskBadge score={result.riskScore} />
              </div>
            </div>

            <div className={cardClass}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-neutral-950">
                Cost breakdown
              </h3>
              <div className="space-y-3">
                {result.breakdown.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between border-b border-neutral-100 pb-2 text-sm"
                  >
                    <span className="text-neutral-600">{item.label}</span>
                    <span className="font-medium text-neutral-950">
                      {formatCurrency(item.amount)}
                    </span>
                  </div>
                ))}
                <div className="flex items-center justify-between pt-2 text-base">
                  <span className="font-semibold text-neutral-950">
                    Total estimate
                  </span>
                  <span className="font-display text-xl font-medium text-neutral-950">
                    {formatCurrency(result.totalEstimate)}
                  </span>
                </div>
              </div>
            </div>

            <div className={cardClass}>
              <h3 className="text-sm font-semibold text-neutral-950">
                DHL Express (MyDHL API)
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-neutral-600">
                Indicative carrier rates when credentials are set in{" "}
                <code className="rounded bg-neutral-100 px-1">.env.local</code>
                . Uses origin/destination labels and weight from this form.
              </p>
              <button
                type="button"
                disabled={dhlLoading}
                onClick={fetchDhlQuote}
                className="mt-4 w-full rounded-full bg-neutral-950 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800 disabled:opacity-60"
              >
                {dhlLoading ? "Fetching…" : "Fetch DHL Express rates"}
              </button>
              {dhlQuote?.message && (
                <p className="mt-3 text-xs text-neutral-600">{dhlQuote.message}</p>
              )}
              {dhlQuote?.products && dhlQuote.products.length > 0 && (
                <ul className="mt-4 space-y-3">
                  {dhlQuote.products.map((product) => (
                    <li
                      key={product.productCode}
                      className="rounded-2xl border border-neutral-100 bg-neutral-50 p-3 text-sm"
                    >
                      <p className="font-medium text-neutral-950">
                        {product.productName}
                      </p>
                      <p className="text-neutral-600">
                        {product.currency}{" "}
                        {product.totalPrice.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                        })}
                      </p>
                      {product.deliveryTime && (
                        <p className="mt-1 text-xs text-neutral-500">
                          ETA: {product.deliveryTime}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="rounded-3xl border border-neutral-200/80 bg-neutral-100 p-4">
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-neutral-700">
                  info
                </span>
                <p className="text-xs leading-relaxed text-neutral-600">
                  Local estimates use weight, volume, distance, and service
                  options. DHL quotes are indicative per DHL terms and may
                  exclude duties, taxes, and surcharges.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
