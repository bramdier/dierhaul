import HomeNav from "@/components/layout/HomeNav";
import ShipmentTracker from "@/components/tracking/ShipmentTracker";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipment Tracking | Dierhaul",
  description:
    "Track DHL shipments with live status, milestones, and delivery estimates via Shipment Tracking – Unified.",
};

export default function TrackPage() {
  return (
    <main className="min-h-svh overflow-x-hidden bg-neutral-50">
      <div className="relative mx-auto max-w-screen-2xl px-6 pb-16 pt-28">
        <HomeNav />
        <ShipmentTracker />
      </div>
    </main>
  );
}
