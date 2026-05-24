import Link from "next/link";

const heroVideo = {
  webm: "/video/hero_dierhaul_2.webm",
  mp4: "/video/hero_dierhaul_1.mp4",
};

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* Full-bleed video background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          className="h-full w-full object-cover"
          loop
          muted
          playsInline
        >
          <source src={heroVideo.webm} type="video/webm" />
          <source src={heroVideo.mp4} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/75 to-primary/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-primary/20" />
      </div>

      {/* Content overlay */}
      <div className="relative z-10 mx-auto w-full max-w-screen-2xl px-6 py-32 lg:px-12">
        <div className="max-w-3xl space-y-8">
          <span className="inline-block rounded bg-white/10 px-3 py-1 font-label text-[10px] font-bold uppercase tracking-[0.2em] text-on-tertiary-container backdrop-blur-sm">
            One-Stop Logistics Platform
          </span>
          <h1 className="font-headline text-5xl font-extrabold leading-[1.05] tracking-tight text-white lg:text-7xl">
            Unified Logistics Operations for Global Cargo
          </h1>
          <p className="max-w-2xl text-xl font-light text-primary-fixed-dim lg:text-2xl">
            Track containers, monitor fleet assets, and calculate cargo pricing
            — all in one integrated platform built for modern logistics teams.
          </p>
          <p className="max-w-xl border-l-4 border-on-tertiary-container py-2 pl-6 italic text-white/70">
            CTMS, Fleet Tracking, and Pricing Calculator — eliminate siloed
            tools and standardize your entire supply chain workflow.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Link
              href="/ctms"
              className="rounded-xl bg-white px-8 py-4 font-headline text-sm font-bold uppercase tracking-widest text-primary shadow-xl transition-transform hover:scale-[1.02] hover:bg-tertiary-fixed"
            >
              Launch Platform
            </Link>
            <Link
              href="/#modules"
              className="rounded-xl border border-white/30 bg-white/10 px-8 py-4 font-headline text-sm font-bold uppercase tracking-widest text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              Explore Modules
            </Link>
          </div>
        </div>
      </div>

      {/* Telemetry badge */}
      <div className="absolute right-6 bottom-8 z-10 hidden rounded-lg bg-primary/80 p-6 font-headline text-xs tracking-tighter text-white backdrop-blur-md sm:block lg:right-12">
        <p className="mb-2 opacity-60">LIVE TELEMETRY v4.0</p>
        <p className="text-lg font-bold uppercase">Containers Tracked: 1,247</p>
      </div>
    </section>
  );
}
