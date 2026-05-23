import type { PricingInput, PricingResult } from "./types";

const CARGO_TYPE_MULTIPLIERS: Record<string, number> = {
  "General Cargo": 1.0,
  "Heavy Machinery": 1.45,
  "Hazardous Materials": 1.65,
  "Refrigerated Goods": 1.3,
  "Oversized Load": 1.85,
  "Containerized Freight": 1.15,
};

const URGENCY_MULTIPLIERS: Record<PricingInput["urgency"], number> = {
  standard: 1.0,
  express: 1.35,
  critical: 1.75,
};

export function calculatePricing(input: PricingInput): PricingResult {
  const weightFactor = input.cargoWeight * 125;
  const volumeFactor = input.cargoVolume * 85;
  const distanceFactor = input.distance * 2.4;

  const baseRate = Math.max(weightFactor, volumeFactor) + distanceFactor;

  const cargoMultiplier = CARGO_TYPE_MULTIPLIERS[input.cargoType] ?? 1.0;
  const urgencyMultiplier = URGENCY_MULTIPLIERS[input.urgency];

  const adjustedBase = baseRate * cargoMultiplier;

  const fuelSurcharge = adjustedBase * 0.18;
  const handlingFee = adjustedBase * 0.12;
  const insuranceFee = input.insurance ? adjustedBase * 0.08 : 0;
  const customsFee = input.customsClearance ? 450 + input.cargoWeight * 12 : 0;

  const subtotal =
    adjustedBase + fuelSurcharge + handlingFee + insuranceFee + customsFee;
  const totalEstimate = Math.round(subtotal * urgencyMultiplier);

  const riskFactors = [
    input.cargoWeight > 50 ? 15 : 0,
    input.distance > 2000 ? 12 : input.distance > 1000 ? 8 : 3,
    input.cargoType === "Hazardous Materials" ? 20 : 0,
    input.cargoType === "Oversized Load" ? 18 : 0,
    input.urgency === "critical" ? 10 : input.urgency === "express" ? 5 : 0,
    !input.insurance ? 8 : 0,
  ];
  const riskScore = Math.min(
    100,
    Math.round(riskFactors.reduce((a, b) => a + b, 10))
  );

  const breakdown = [
    { label: "Base Transport Rate", amount: Math.round(adjustedBase) },
    { label: "Fuel Surcharge (18%)", amount: Math.round(fuelSurcharge) },
    { label: "Handling & Loading", amount: Math.round(handlingFee) },
  ];

  if (insuranceFee > 0) {
    breakdown.push({ label: "Cargo Insurance", amount: Math.round(insuranceFee) });
  }
  if (customsFee > 0) {
    breakdown.push({ label: "Customs Clearance", amount: Math.round(customsFee) });
  }
  if (urgencyMultiplier > 1) {
    breakdown.push({
      label: `Urgency Premium (${Math.round((urgencyMultiplier - 1) * 100)}%)`,
      amount: Math.round(subtotal * (urgencyMultiplier - 1)),
    });
  }

  return {
    baseRate: Math.round(adjustedBase),
    fuelSurcharge: Math.round(fuelSurcharge),
    handlingFee: Math.round(handlingFee),
    insuranceFee: Math.round(insuranceFee),
    customsFee: Math.round(customsFee),
    urgencyMultiplier,
    totalEstimate,
    riskScore,
    breakdown,
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}
