import MaterialSymbols from "@/components/layout/MaterialSymbols";
import PageTransition from "@/components/layout/PageTransition";
import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  variable: "--font-manrope",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
});

const siteTitle = "Dierhaul | One-Stop Logistics Platform";
const siteDescription =
  "Logistics platform with DHL Shipment Tracking – Unified for live status and delivery estimates.";

export const metadata: Metadata = {
  metadataBase: new URL("https://dierhaul.my.id"),
  title: siteTitle,
  description: siteDescription,
  icons: {
    icon: [{ url: "/images/logo-haul.png", type: "image/png" }],
    apple: [{ url: "/images/logo-haul.png", type: "image/png" }],
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: "/",
    siteName: "Dierhaul",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Dierhaul — One-Stop Logistics Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/images/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${inter.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="font-body antialiased">
        <MaterialSymbols />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
