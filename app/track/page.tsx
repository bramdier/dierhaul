import MarketingShell from "@/components/layout/MarketingShell";
import TrackTabs from "@/components/tracking/TrackTabs";
import { trackerContent } from "@/lib/tracker-content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Track an air waybill | Dierhaul",
  description:
    "Look up an airline air waybill number. Live carrier status is not available on this site.",
  alternates: {
    canonical: "https://dierhaul.my.id/track",
  },
  openGraph: {
    title: "Track an air waybill | Dierhaul",
    description:
      "Airline air waybill lookup. Live carrier status is not available on this site.",
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
      "Airline air waybill lookup. Live carrier status is not available on this site.",
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
    "Look up an airline air waybill number. Live carrier status is not available on this site.",
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

export default function TrackPage() {
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
              Check an airline air waybill number here. Express shipment numbers
              use a separate form and are not airline air waybills. Live carrier
              lookup is not available on this site.
            </p>
          </div>
          <TrackTabs config={trackerContent} />
        </div>
      </main>
    </MarketingShell>
  );
}
