import Link from "next/link";

const modules = [
  {
    id: "ctms",
    title: "Container Tracking Management System",
    abbr: "CTMS",
    icon: "inventory_2",
    description:
      "Real-time visibility across your container fleet. Track shipments from origin to destination with status updates, ETA predictions, and customs clearance monitoring.",
    features: [
      "Live container status tracking",
      "Multi-carrier integration",
      "Customs & port milestone alerts",
      "Route progress visualization",
    ],
    href: "/ctms",
    accent: "bg-primary text-white",
  },
  {
    id: "fleet",
    title: "Fleet Tracking Management System",
    abbr: "Fleet",
    icon: "local_shipping",
    description:
      "Monitor your entire vehicle fleet in real time. Track location, fuel levels, driver assignments, and cargo loads across heavy haul and specialized transport assets.",
    features: [
      "GPS vehicle tracking",
      "Driver & asset assignment",
      "Fuel & maintenance alerts",
      "Live cargo load monitoring",
    ],
    href: "/fleet",
    accent: "bg-surface-container-high text-primary",
  },
  {
    id: "calculator",
    title: "Cargo Pricing Calculator",
    abbr: "Pricing",
    icon: "calculate",
    description:
      "Instant freight cost estimates based on cargo weight, volume, distance, and urgency. Get transparent pricing breakdowns with risk scoring for informed decisions.",
    features: [
      "Multi-factor pricing engine",
      "Risk score assessment",
      "Insurance & customs add-ons",
      "Express & critical urgency tiers",
    ],
    href: "/calculator",
    accent: "bg-tertiary-container text-white",
  },
];

export default function Modules() {
  return (
    <section id="modules" className="bg-surface-container-low px-6 py-24">
      <div className="mx-auto max-w-screen-2xl">
        <div className="mb-16 text-center">
          <label className="mb-4 block text-xs font-bold uppercase tracking-[0.3em] text-primary">
            Platform Modules
          </label>
          <h2 className="font-headline text-4xl font-black text-primary sm:text-5xl">
            Three Systems. One Platform.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-secondary">
            Dierhaul unifies container tracking, fleet management, and cargo
            pricing into a single operational dashboard.
          </p>
          <div className="mx-auto mt-6 h-1 w-24 bg-tertiary" />
        </div>
        <div className="grid gap-8 lg:grid-cols-3">
          {modules.map((mod) => (
            <div
              key={mod.id}
              className="group flex flex-col border border-outline-variant/20 bg-white transition-colors hover:border-primary"
            >
              <div className={`p-6 ${mod.accent}`}>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-3xl">
                    {mod.icon}
                  </span>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-70">
                      {mod.abbr}
                    </p>
                    <h3 className="font-headline text-xl font-bold">{mod.title}</h3>
                  </div>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="mb-6 text-sm leading-relaxed text-on-surface-variant">
                  {mod.description}
                </p>
                <ul className="mb-8 space-y-2">
                  {mod.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-secondary"
                    >
                      <span className="material-symbols-outlined text-base text-on-tertiary-container">
                        check_circle
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href={mod.href}
                  className="mt-auto inline-flex items-center gap-2 font-headline text-sm font-bold uppercase tracking-widest text-primary transition-colors group-hover:text-on-tertiary-container"
                >
                  Open Module
                  <span className="material-symbols-outlined text-base">
                    arrow_forward
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
