import HomeNav from "@/components/layout/HomeNav";
import Hero from "@/components/marketing/Hero";
import Modules from "@/components/marketing/Modules";
import HowItWorks from "@/components/marketing/HowItWorks";
import CTA from "@/components/marketing/CTA";

export default function HomePage() {
  return (
    <>
      <main className="overflow-x-hidden">
        <div className="relative">
          <HomeNav />
          <Hero />
        </div>
        <Modules />
        <HowItWorks />
        <CTA />
      </main>
    </>
  );
}
