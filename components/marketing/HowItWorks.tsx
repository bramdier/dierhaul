const stats = [
  { value: "1,247", label: "Containers Tracked" },
  { value: "186", label: "Fleet Vehicles" },
  { value: "98.7%", label: "On-Time Delivery" },
  { value: "42", label: "Global Ports" },
];

const steps = [
  {
    step: "01",
    title: "Track Containers",
    description:
      "Monitor every container from port to final delivery with real-time status, ETA updates, and customs milestones via CTMS.",
    icon: "inventory_2",
  },
  {
    step: "02",
    title: "Manage Fleet",
    description:
      "Keep your vehicles, drivers, and cargo loads visible on a live map. Get alerts for fuel, maintenance, and route deviations.",
    icon: "local_shipping",
  },
  {
    step: "03",
    title: "Calculate Pricing",
    description:
      "Generate instant freight quotes with transparent cost breakdowns, risk scores, and urgency-based pricing tiers.",
    icon: "calculate",
  },
];

export default function HowItWorks() {
  return (
    <>
      <section className="border-y border-outline-variant/15 bg-white px-6 py-16">
        <div className="mx-auto grid max-w-screen-2xl grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-headline text-3xl font-black text-primary md:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>
      <section className="border-b border-outline-variant/15 bg-white px-6 py-24">
        <div className="mx-auto max-w-screen-2xl">
          <div className="mb-12 text-center">
            <h2 className="font-headline text-3xl font-extrabold text-primary">
              How It Works
            </h2>
            <p className="mt-2 text-secondary">
              Three integrated workflows for complete logistics control
            </p>
          </div>
          <div className="grid md:grid-cols-3">
            {steps.map((item, i) => (
              <div
                key={item.step}
                className={`space-y-6 p-12 ${
                  i < steps.length - 1
                    ? "border-b border-outline-variant/15 md:border-r md:border-b-0"
                    : ""
                } ${i === 1 ? "bg-surface-container-low/30" : ""}`}
              >
                <div className="font-headline text-5xl font-black text-primary/10">
                  {item.step}
                </div>
                <h3 className="font-headline text-2xl font-bold text-primary">
                  {item.title}
                </h3>
                <p className="text-secondary">{item.description}</p>
                <span className="material-symbols-outlined text-3xl text-primary/40">
                  {item.icon}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
