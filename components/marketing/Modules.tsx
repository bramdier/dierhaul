import DhlLogo from "@/components/brand/DhlLogo";
import Link from "next/link";
import PillBadge from "@/components/ui/PillBadge";

const trackingModule = {
  title: "Shipment Tracking – Unified",
  abbr: "Tracking",
  description:
    "Look up DHL shipments across Express, Freight, eCommerce, and more. See current status, event history, and estimated delivery in one view.",
  features: [
    "Live status and milestones",
    "Origin and destination details",
    "Estimated time of delivery",
    "Powered by DHL Unified API",
  ],
  href: "/track",
};

export default function Modules() {
  return (
    <section id="modules" className="bg-neutral-50 px-6 py-24">
      <div className="mx-auto max-w-screen-2xl">
        <div className="mb-16 text-center">
          <PillBadge>Platform module</PillBadge>
          <h2 className="font-display mt-6 text-4xl font-medium tracking-tight text-neutral-950 sm:text-5xl">
            Shipment tracking, unified.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-600">
            One tracking experience for DHL Group services — built for teams
            and customers who need clarity on every move.
          </p>
        </div>
        <div className="mx-auto max-w-xl">
          <div className="group flex flex-col rounded-3xl border border-neutral-200/80 bg-white p-8 transition-shadow hover:shadow-[0_8px_30px_rgba(15,23,42,0.12)]">
            <div className="flex items-center gap-4">
              <div>
                <p className="text-xs font-medium text-neutral-500">
                  {trackingModule.abbr}
                </p>
                <h3 className="font-display mt-1 text-xl font-medium tracking-tight text-neutral-950">
                  {trackingModule.title}
                </h3>
              </div>
            </div>
            <p className="mt-6 flex-1 text-sm leading-relaxed text-neutral-600">
              {trackingModule.description}
            </p>
            <ul className="mt-6 space-y-2">
              {trackingModule.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-2 text-sm text-neutral-700"
                >
                  <span className="material-symbols-outlined text-base text-emerald-700">
                    check_circle
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
            <Link
              href={trackingModule.href}
              className="mt-8 inline-flex items-center text-sm font-medium text-neutral-950 transition-colors group-hover:text-neutral-600"
            >
              Open tracking
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
