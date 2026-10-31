import MarketingShell from "@/components/layout/MarketingShell";
import TrackTabs from "@/components/tracking/TrackTabs";
import { db } from "@/lib/db";
import { trackerConfig } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Track an air waybill | Dierhaul",
  description:
    "Look up an airline air waybill. Live airline status depends on FSU messages and, later, ONE Record. DHL Express lookup is a separate supporting tab.",
  alternates: {
    canonical: "https://dierhaul.my.id/track",
  },
  openGraph: {
    title: "Track an air waybill | Dierhaul",
    description:
      "Airline air waybill lookup. Status comes from FSU messages and, later, ONE Record.",
    url: "https://dierhaul.my.id/track",
    siteName: "Dierhaul",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Dierhaul — cargo management for airlines",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Track an air waybill | Dierhaul",
    description:
      "Airline air waybill lookup. Status comes from FSU messages and, later, ONE Record.",
    images: ["/images/og-image.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Dierhaul air waybill tracking",
  url: "https://dierhaul.my.id/track",
  applicationCategory: "BusinessApplication",
  operatingSystem: "All",
  description:
    "Look up an airline air waybill. Live status depends on FSU messages and, later, ONE Record.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  provider: {
    "@type": "Organization",
    name: "Dierhaul",
    url: "https://dierhaul.my.id",
  },
};

async function getConfig() {
  const slug = "default";
  let [row] = await db
    .select()
    .from(trackerConfig)
    .where(eq(trackerConfig.slug, slug))
    .limit(1);

  if (!row) {
    [row] = await db.insert(trackerConfig).values({ slug }).returning();
  }

  return row;
}

export default async function TrackPage() {
  const config = await getConfig();

  return (
    <MarketingShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="px-6 py-12">
        <div className="mx-auto flex max-w-3xl flex-col gap-8">
          <div className="flex flex-col gap-3">
            <h1 className="font-heading text-4xl font-medium tracking-tight text-foreground">
              Track an air waybill
            </h1>
            <p className="text-base text-muted-foreground">
              Airline status comes from FSU messages and, later, ONE Record.
              Express shipments use a separate DHL lookup and are not airline
              air waybills.
            </p>
          </div>
          <TrackTabs config={config} />
        </div>
      </main>
    </MarketingShell>
  );
}
