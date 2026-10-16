import PillBadge from "@/components/ui/PillBadge";
import MarketingButton from "@/components/ui/MarketingButton";
import HeroBackground from "@/components/marketing/HeroBackground";

export default function Hero() {
  return (
    <section className="relative flex min-h-svh items-center justify-center overflow-hidden">
      <HeroBackground />
      <div className="relative z-10 flex flex-col items-center px-6 pt-28 pb-28 text-center">
        <h1 className="font-display mt-6 max-w-4xl text-5xl leading-none font-medium tracking-tight text-white sm:text-7xl lg:text-8xl">
          Unified logistics operations for global cargo.
        </h1>
        <p className="mt-5 max-w-lg text-base leading-relaxed text-neutral-100 sm:text-lg">
          Track shipments in real time with DHL Shipment Tracking – Unified.
          Status, milestones, and delivery estimates in one place.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <MarketingButton href="/track" variant="secondary">
            Track shipment
          </MarketingButton>
          <MarketingButton
            href="/login"
            variant="ghost"
            className="!text-white hover:!text-neutral-200"
          >
            Get Started
          </MarketingButton>
        </div>
      </div>
      <a
        href="#modules"
        className="absolute bottom-8 left-1/2 z-10 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-neutral-900/70 px-4 py-2 text-[11px] font-medium tracking-[0.2em] text-white backdrop-blur-sm transition-colors hover:bg-neutral-900/85"
      >
        SCROLL
        <span aria-hidden="true">↓</span>
      </a>
    </section>
  );
}
