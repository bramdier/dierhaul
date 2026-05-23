import AppShell from "@/components/layout/AppShell";
import PricingCalculator from "@/components/calculator/PricingCalculator";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing Calculator | Dierhaul",
  description:
    "Cargo logistics pricing calculator — instant freight cost estimates with risk scoring and transparent breakdowns.",
};

export default function CalculatorPage() {
  return (
    <AppShell
      title="Cargo Pricing Calculator"
      subtitle="Generate instant freight cost estimates based on cargo specifications, route distance, urgency level, and optional services."
    >
      <PricingCalculator />
    </AppShell>
  );
}
