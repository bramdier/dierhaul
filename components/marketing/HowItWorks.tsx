const stats = [
  { value: "24/7", label: "Self-serve tracking" },
  { value: "Multi", label: "DHL divisions supported" },
  { value: "Live", label: "Status updates" },
  { value: "EU", label: "Production API region" },
];

const steps = [
  {
    step: "01",
    title: "Enter tracking number",
    description:
      "Use the ID from your label or confirmation email. Optional country and postal code help narrow results.",
    icon: "pin",
  },
  {
    step: "02",
    title: "View status & ETA",
    description:
      "See the latest milestone, service provider, and estimated delivery when available from DHL.",
    icon: "schedule",
  },
  {
    step: "03",
    title: "Follow event history",
    description:
      "Review the full journey — timestamps and locations — so ops and customers stay aligned.",
    icon: "route",
  },
];

export default function HowItWorks() {
  return (
    <>
      <section className="border-y border-neutral-200/80 bg-white px-6 py-16">
        <div className="mx-auto grid max-w-screen-2xl grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-3xl font-medium tracking-tight text-neutral-950 md:text-4xl">
                {stat.value}
              </p>
              <p className="mt-2 text-sm font-medium text-neutral-600">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-neutral-50 px-6 py-24">
        <div className="mx-auto max-w-screen-2xl">
          <div className="mb-12 text-center">
            <h2 className="font-display text-3xl font-medium tracking-tight text-neutral-950 sm:text-4xl">
              How it works
            </h2>
            <p className="mt-3 text-neutral-600">
              Three steps from tracking number to full shipment visibility
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((item) => (
              <div
                key={item.step}
                className="rounded-3xl border border-neutral-200/80 bg-white p-8"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-neutral-400">
                    {item.step}
                  </span>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100">
                    <span className="material-symbols-outlined text-xl text-neutral-700">
                      {item.icon}
                    </span>
                  </span>
                </div>
                <h3 className="font-display mt-6 text-2xl font-medium tracking-tight text-neutral-950">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
