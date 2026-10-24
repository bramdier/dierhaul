import HomeNav from "@/components/layout/HomeNav";
import ShipmentTracker from "@/components/tracking/ShipmentTracker";
import { db } from "@/lib/db";
import { trackerConfig } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DHL Shipment Tracking — Live Status & Delivery Estimates | Dierhaul",
  description:
    "Track your DHL package in real time. Get live status updates, full event history, and estimated delivery dates via DHL Shipment Tracking Unified.",
  keywords: [
    "DHL tracking",
    "track DHL shipment",
    "DHL parcel tracking",
    "DHL live status",
    "DHL delivery estimate",
    "track DHL package",
    "DHL Shipment Tracking Unified",
  ],
  alternates: {
    canonical: "https://dierhaul.my.id/track",
  },
  openGraph: {
    title: "DHL Shipment Tracking — Live Status | Dierhaul",
    description:
      "Track your DHL package in real time. Live status, event history, and estimated delivery dates.",
    url: "https://dierhaul.my.id/track",
    siteName: "Dierhaul",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "DHL Shipment Tracking — Dierhaul",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DHL Shipment Tracking — Live Status | Dierhaul",
    description:
      "Track your DHL package in real time. Live status, event history, and estimated delivery dates.",
    images: ["/images/og-image.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "DHL Shipment Tracker",
  url: "https://dierhaul.my.id/track",
  applicationCategory: "LogisticsApplication",
  operatingSystem: "All",
  description:
    "Track DHL shipments in real time. Get live status updates, event history, and estimated delivery dates via DHL Shipment Tracking Unified.",
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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-svh overflow-x-hidden bg-neutral-50">
        <div className="relative mx-auto max-w-screen-2xl px-6 pb-16 pt-28">
          <HomeNav />
          <ShipmentTracker config={config} />
        </div>
      </main>
    </>
  );
}
