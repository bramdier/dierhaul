import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto flex max-w-4xl flex-col items-start gap-4 rounded-xl bg-primary px-8 py-12 text-primary-foreground">
        <h2 className="font-heading text-3xl font-medium tracking-tight sm:text-4xl">
          See it on your flights
        </h2>
        <p className="max-w-2xl text-primary-foreground/80">
          Request a demo of booking through delivery: acceptance, DGR, the
          e-AWB, the manifest, load planning, and tracking.
        </p>
        <Button
          nativeButton={false}
          render={<Link href="/demo" />}
          variant="secondary"
        >
          Request a demo
        </Button>
      </div>
    </section>
  );
}
