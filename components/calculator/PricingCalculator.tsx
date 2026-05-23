"use client";

import { useMemo, useState } from "react";
import { cargoTypes } from "@/lib/mock-data";
import { calculatePricing, formatCurrency } from "@/lib/pricing-engine";
import type { PricingInput } from "@/lib/types";

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
  const level =
    score >= 70 ? "High" : score >= 40 ? "Medium" : "Low";
  const color =
    score >= 70
      ? "bg-error-container text-error"
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

  const result = useMemo(() => calculatePricing(input), [input]);

  const update = <K extends keyof PricingInput>(
    key: K,
    value: PricingInput[K]
  ) => {
    setInput((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <div className="space-y-6 lg:col-span-3">
        <div className="rounded-xl border border-outline-variant/20 bg-white p-6">
          <h3 className="mb-6 font-headline text-lg font-bold text-primary">
            Cargo Details
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                Cargo Weight (tonnes)
              </span>
              <input
                className="w-full rounded-lg border border-outline-variant/30 px-3 py-2.5 text-sm"
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
              <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                Cargo Volume (m³)
              </span>
              <input
                className="w-full rounded-lg border border-outline-variant/30 px-3 py-2.5 text-sm"
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
              <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                Origin
              </span>
              <input
                className="w-full rounded-lg border border-outline-variant/30 px-3 py-2.5 text-sm"
                type="text"
                value={input.origin}
                onChange={(e) => update("origin", e.target.value)}
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                Destination
              </span>
              <input
                className="w-full rounded-lg border border-outline-variant/30 px-3 py-2.5 text-sm"
                type="text"
                value={input.destination}
                onChange={(e) => update("destination", e.target.value)}
              />
            </label>
            <label className="block sm:col-span-2">
              <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                Distance (km)
              </span>
              <input
                className="w-full rounded-lg border border-outline-variant/30 px-3 py-2.5 text-sm"
                min={0}
                type="number"
                value={input.distance}
                onChange={(e) =>
                  update("distance", parseFloat(e.target.value) || 0)
                }
              />
            </label>
            <label className="block sm:col-span-2">
              <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                Cargo Type
              </span>
              <select
                className="w-full rounded-lg border border-outline-variant/30 px-3 py-2.5 text-sm"
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

        <div className="rounded-xl border border-outline-variant/20 bg-white p-6">
          <h3 className="mb-6 font-headline text-lg font-bold text-primary">
            Service Options
          </h3>
          <div className="space-y-4">
            <div>
              <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                Urgency Level
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
                    onClick={() => update("urgency", option.value)}
                    className={`rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-wider ${
                      input.urgency === option.value
                        ? "signature-gradient text-white"
                        : "bg-surface-container text-secondary"
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
                className="h-4 w-4 rounded border-outline-variant"
                type="checkbox"
                onChange={(e) => update("insurance", e.target.checked)}
              />
              <span className="text-sm text-secondary">
                Include cargo insurance (+8% of base rate)
              </span>
            </label>
            <label className="flex cursor-pointer items-center gap-3">
              <input
                checked={input.customsClearance}
                className="h-4 w-4 rounded border-outline-variant"
                type="checkbox"
                onChange={(e) =>
                  update("customsClearance", e.target.checked)
                }
              />
              <span className="text-sm text-secondary">
                Include customs clearance processing
              </span>
            </label>
          </div>
        </div>
      </div>

      <div className="lg:col-span-2">
        <div className="sticky top-8 space-y-4">
          <div className="signature-gradient rounded-xl p-6 text-white">
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-70">
              Estimated Total
            </p>
            <p className="font-headline text-4xl font-black">
              {formatCurrency(result.totalEstimate)}
            </p>
            <div className="mt-3">
              <RiskBadge score={result.riskScore} />
            </div>
          </div>

          <div className="rounded-xl border border-outline-variant/20 bg-white p-6">
            <h3 className="mb-4 font-headline text-sm font-bold uppercase tracking-widest text-primary">
              Cost Breakdown
            </h3>
            <div className="space-y-3">
              {result.breakdown.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between border-b border-outline-variant/10 pb-2 text-sm"
                >
                  <span className="text-on-surface-variant">{item.label}</span>
                  <span className="font-bold text-primary">
                    {formatCurrency(item.amount)}
                  </span>
                </div>
              ))}
              <div className="flex items-center justify-between pt-2 text-base">
                <span className="font-bold text-primary">Total Estimate</span>
                <span className="font-headline text-xl font-black text-primary">
                  {formatCurrency(result.totalEstimate)}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-outline-variant/20 bg-surface-container-low p-4">
            <div className="flex items-start gap-2">
              <span className="material-symbols-outlined text-primary">
                info
              </span>
              <p className="text-xs leading-relaxed text-on-surface-variant">
                Estimates are based on cargo weight, volume, distance, cargo
                type multipliers, and selected service options. Final pricing may
                vary based on route conditions and equipment availability.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
