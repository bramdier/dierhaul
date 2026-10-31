import MarketingShell from "@/components/layout/MarketingShell";
import Buyers from "@/components/marketing/Buyers";
import CTA from "@/components/marketing/CTA";
import Hero from "@/components/marketing/Hero";
import SolutionsGrid from "@/components/marketing/SolutionsGrid";
import WorkflowStrip from "@/components/marketing/WorkflowStrip";

export default function HomePage() {
  return (
    <MarketingShell>
      <main>
        <Hero />
        <Buyers />
        <WorkflowStrip />
        <SolutionsGrid />
        <CTA />
      </main>
    </MarketingShell>
  );
}
