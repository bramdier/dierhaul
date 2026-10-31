import MarketingShell from "@/components/layout/MarketingShell";
import TrackTabs from "@/components/tracking/TrackTabs";
import { db } from "@/lib/db";
import { isMissingRelation } from "@/lib/db/missing-relation";
import { trackerConfig, type TrackerConfig } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

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

function fallbackConfig(): TrackerConfig {
  const now = new Date();
  return {
    id: 0,
    slug: "default",
    pageTitle: "Track your shipment",
    pageSubtitle:
      "Live status, milestones, and delivery estimates via DHL Shipment Tracking – Unified.",
    productName: "Shipment Tracking – Unified",
    logoUrl: null,
    labelTrackingNumber: "Tracking number",
    placeholderTrackingNumber: "e.g. 7777777770",
    showOriginField: true,
    labelOriginCountry: "Origin country (optional, ISO)",
    placeholderOriginCountry: "DE",
    showPostalField: true,
    labelPostalCode: "Recipient postal code (optional)",
    placeholderPostalCode: "10115",
    buttonLabel: "Track shipment",
    buttonLoadingLabel: "Tracking…",
    showStatusBadge: true,
    statusBadgeColor: "emerald",
    labelShipmentId: "Shipment",
    visibleFields: ["service", "estimatedDelivery", "origin", "destination"],
    fieldLabels: {},
    showEventHistory: true,
    labelEventHistory: "Event history",
    timelineDotColor: "bg-neutral-400",
    fallbackEventLabel: "Update",
    showFooter: true,
    footerText:
      "Tracking data is provided by DHL Shipment Tracking – Unified. Availability depends on carrier and product.",
    createdAt: now,
    updatedAt: now,
  };
}

async function getConfig() {
  const slug = "default";

  try {
    let [row] = await db
      .select()
      .from(trackerConfig)
      .where(eq(trackerConfig.slug, slug))
      .limit(1);

    if (!row) {
      [row] = await db.insert(trackerConfig).values({ slug }).returning();
    }

    return row;
  } catch (error) {
    if (isMissingRelation(error)) return fallbackConfig();
    throw error;
  }
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
