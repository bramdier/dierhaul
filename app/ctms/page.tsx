import AppShell from "@/components/layout/AppShell";
import ModuleShowcase from "@/components/modules/ModuleShowcase";
import { ctmsContent } from "@/lib/module-content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CTMS | Dierhaul Container Tracking",
  description:
    "Container Tracking Management System — monitor shipments, status, and ETAs in real time.",
};

export default function CTMSPage() {
  return (
    <AppShell showHeader={false}>
      <div className="mb-10">
        <p className="mb-1 font-label text-[10px] font-bold uppercase tracking-[0.2em] text-on-tertiary-container">
          Dierhaul Platform
        </p>
        <h1 className="font-headline text-3xl font-extrabold text-primary sm:text-4xl">
          {ctmsContent.title}
        </h1>
        <p className="mt-2 max-w-2xl text-secondary">{ctmsContent.subtitle}</p>
      </div>
      <ModuleShowcase content={ctmsContent} />
    </AppShell>
  );
}
