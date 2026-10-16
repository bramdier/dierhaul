import MarketingButton from "@/components/ui/MarketingButton";

export default function CTA() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-4xl rounded-3xl bg-neutral-950 px-8 py-16 text-center sm:px-12">
        <h2 className="font-display text-4xl font-medium tracking-tight text-white sm:text-5xl">
          Ready to track your next shipment?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-300">
          Use DHL Shipment Tracking – Unified on Dierhaul for live status and
          delivery estimates.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <MarketingButton href="/track" variant="secondary">
            Track shipment
          </MarketingButton>
          <MarketingButton
            href="/login"
            variant="ghost"
            className="rounded-full border border-white/25 px-6 py-2.5 !text-white hover:!bg-white/10 hover:!text-white"
          >
            Sign in
          </MarketingButton>
        </div>
      </div>
    </section>
  );
}
