import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="industrial-grid relative flex min-h-[800px] items-center px-6 lg:px-12">
      <div className="mx-auto grid max-w-screen-2xl items-center gap-12 lg:grid-cols-12">
        <div className="space-y-8 lg:col-span-7">
          <span className="inline-block rounded bg-primary-container px-3 py-1 font-label text-[10px] font-bold uppercase tracking-[0.2em] text-on-primary-container">
            One-Stop Logistics Platform
          </span>
          <h1 className="font-headline text-5xl font-extrabold leading-[1.05] tracking-tight text-primary lg:text-7xl">
            Unified Logistics Operations for Global Cargo
          </h1>
          <p className="max-w-2xl text-xl font-light text-secondary lg:text-2xl">
            Track containers, monitor fleet assets, and calculate cargo pricing
            — all in one integrated platform built for modern logistics teams.
          </p>
          <p className="max-w-xl border-l-4 border-tertiary-container py-2 pl-6 italic text-on-surface-variant">
            CTMS, Fleet Tracking, and Pricing Calculator — eliminate siloed tools
            and standardize your entire supply chain workflow.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Link
              href="/ctms"
              className="signature-gradient rounded-xl px-8 py-4 font-headline text-sm font-bold uppercase tracking-widest text-white shadow-xl shadow-primary/20 transition-transform hover:scale-[1.02]"
            >
              Launch Platform
            </Link>
            <Link
              href="/#modules"
              className="rounded-xl bg-surface-container-highest px-8 py-4 font-headline text-sm font-bold uppercase tracking-widest text-primary transition-colors hover:bg-surface-dim"
            >
              Explore Modules
            </Link>
          </div>
        </div>
        <div className="relative lg:col-span-5">
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-outline-variant/20 bg-surface-container-lowest shadow-2xl">
            <Image
              alt="Heavy logistics operations"
              className="object-cover opacity-90 grayscale transition-all duration-700 hover:grayscale-0"
              fill
              priority
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuARioHeaWqIIr6O5m8hB2chZ7BmSGDNnsnLvPSKiXxBEVQCSJpO5FPtvzcHewNO5UMAYfmQl7Iloh5Z23_I21jvDMZq-PGGA1T42RljwUQZPwRaHsUkhc9boTjeYfVs4OisJg6pkY2uc4BmFxv_Y3a8lDP__54RPfW1IR9VWH1CJ6QhF-T4KlbYO5hVXhGCYMzcooerTxgoH5yVk01RxjgIbsueW8R-iHF-LcJ3dBy_zkbwxM7MyMtVp8lF4079Cn1j5oTdGukipp7Z"
            />
            <div className="absolute right-6 bottom-6 rounded-lg bg-primary p-6 font-headline text-xs tracking-tighter text-white">
              <p className="mb-2 opacity-60">LIVE TELEMETRY v4.0</p>
              <p className="text-lg font-bold uppercase">
                Containers Tracked: 1,247
              </p>
            </div>
          </div>
          <div className="absolute -top-12 -right-12 -z-10 h-64 w-64 border-t border-r border-outline-variant/30" />
        </div>
      </div>
    </section>
  );
}
