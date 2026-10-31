import MarketingShell from "@/components/layout/MarketingShell";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Security and compliance | Dierhaul",
  description:
    "How Dierhaul handles operational records, audit trails, and DGR records, including personal data under Indonesia’s UU PDP.",
};

const topics = [
  {
    title: "Operational records",
    description:
      "Booking, acceptance, the AWB, the manifest, and load-plan changes stay on the shipment file. Access is limited to the roles the airline authorizes: commercial, operations, and ground handling.",
  },
  {
    title: "Audit trail",
    description:
      "Acceptance and DGR decisions are recorded with who made them and when, so a later review can see why a shipment was accepted, rejected, or offloaded.",
  },
  {
    title: "DGR records",
    description:
      "The dangerous-goods check stays with the shipment: the DGR result and the shipper’s declaration reference are kept for the life of that shipment file, not in a separate notebook.",
  },
  {
    title: "Personal data and UU PDP",
    description:
      "An air waybill can hold names, phone numbers, and addresses of shippers, consignees, and users. When those people are in Indonesia, Undang-Undang Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP) applies. Dierhaul’s intent is to use that data to operate the shipment, limit who can open it, and keep it with the shipment file rather than for a separate purpose.",
  },
];

export default function SecurityPage() {
  return (
    <MarketingShell>
      <main className="px-6 py-12">
        <div className="mx-auto flex max-w-screen-2xl flex-col gap-10">
          <div className="flex max-w-3xl flex-col gap-3">
            <h1 className="font-heading text-4xl font-medium tracking-tight text-foreground">
              Security and compliance
            </h1>
            <p className="text-base text-muted-foreground">
              How shipment data, audit trails, and dangerous-goods records are
              meant to be kept.
            </p>
          </div>
          <Alert>
            <AlertTitle>Product intent, not a legal opinion</AlertTitle>
            <AlertDescription>
              This page describes how the product is meant to handle data. It
              is not a certification and it is not legal advice on UU PDP.
            </AlertDescription>
          </Alert>
          <div className="grid gap-4 md:grid-cols-2">
            {topics.map((topic) => (
              <Card key={topic.title}>
                <CardHeader>
                  <CardTitle>{topic.title}</CardTitle>
                  <CardDescription>{topic.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
          <Button nativeButton={false} render={<Link href="/demo" />}>
            Request a demo
          </Button>
        </div>
      </main>
    </MarketingShell>
  );
}
