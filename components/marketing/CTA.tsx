import Link from "next/link";

export default function CTA() {
  return (
    <section className="signature-gradient px-6 py-24">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="font-headline text-4xl font-extrabold text-white">
          Ready to Unify Your Logistics?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-fixed-dim">
          Start with container tracking, fleet monitoring, or instant cargo
          pricing — all powered by the Dierhaul platform.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/ctms"
            className="rounded-xl bg-white px-8 py-4 font-headline text-sm font-bold uppercase tracking-widest text-primary transition-colors hover:bg-tertiary-fixed"
          >
            Open CTMS
          </Link>
          <Link
            href="/fleet"
            className="rounded-xl border border-white/30 px-8 py-4 font-headline text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-white/10"
          >
            View Fleet
          </Link>
          <Link
            href="/calculator"
            className="rounded-xl border border-white/30 px-8 py-4 font-headline text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-white/10"
          >
            Get Quote
          </Link>
        </div>
      </div>
    </section>
  );
}
