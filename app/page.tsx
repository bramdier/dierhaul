import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/marketing/Hero";
import Modules from "@/components/marketing/Modules";
import HowItWorks from "@/components/marketing/HowItWorks";
import CTA from "@/components/marketing/CTA";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="overflow-x-hidden pt-24">
        <Hero />
        <Modules />
        <HowItWorks />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
