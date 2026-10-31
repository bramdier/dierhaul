import MarketingShell from "@/components/layout/MarketingShell";
import SolutionView from "@/components/marketing/SolutionView";
import { getSolution, solutions } from "@/lib/cargo-site";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return solutions.map((solution) => ({ slug: solution.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) return {};

  return {
    title: `${solution.title} | Dierhaul`,
    description: solution.summary,
  };
}

export default async function SolutionPage({ params }: Props) {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) notFound();

  return (
    <MarketingShell>
      <SolutionView solution={solution} />
    </MarketingShell>
  );
}
