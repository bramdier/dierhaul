import MarketingShell from "@/components/layout/MarketingShell";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { integrationStandards } from "@/lib/cargo-site";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Integrations | Dierhaul",
  description:
    "Cargo-XML, Cargo-IMP, e-AWB, and ONE Record for airline IT teams. Standards Dierhaul is built to exchange. A live cargo-message connection is not in this environment.",
};

export default function IntegrationsPage() {
  return (
    <MarketingShell>
      <main className="px-6 py-12">
        <div className="mx-auto flex max-w-screen-2xl flex-col gap-10">
          <div className="flex max-w-3xl flex-col gap-3">
            <h1 className="font-heading text-4xl font-medium tracking-tight text-foreground">
              Integrations
            </h1>
            <p className="text-base text-muted-foreground">
              For airline IT. Dierhaul is built to exchange Cargo-XML,
              Cargo-IMP, e-AWB, and ONE Record with the systems that already
              run the cargo operation.
            </p>
          </div>

          <Alert>
            <AlertTitle>What is connected today</AlertTitle>
            <AlertDescription>
              A live Cargo-IMP, Cargo-XML, or ONE Record connection is not in
              this environment. The only live lookup is DHL Express, on the
              Track page, and it does not trace airline air waybills.
            </AlertDescription>
          </Alert>

          <div className="grid gap-4 md:grid-cols-2">
            {integrationStandards.map((standard) => (
              <Card key={standard.title}>
                <CardHeader>
                  <CardTitle>{standard.title}</CardTitle>
                  <CardDescription>{standard.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          <Accordion>
            <AccordionItem value="messages">
              <AccordionTrigger>
                Which messages does airline IT need to plan for?
              </AccordionTrigger>
              <AccordionContent>
                Cargo-IMP and Cargo-XML carry the booking, the waybill, and
                status between the airline, the handler, and partners. e-AWB
                is the electronic air waybill itself. ONE Record is the later
                model for sharing one shipment record instead of another copy
                of the message.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="tracking">
              <AccordionTrigger>
                Where does tracking status come from?
              </AccordionTrigger>
              <AccordionContent>
                Airline status comes from FSU messages now, and from ONE
                Record later. It does not come from a parcel carrier API.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="live">
              <AccordionTrigger>What can we connect in a demo?</AccordionTrigger>
              <AccordionContent>
                The demo walks the operation from booking to delivery and the
                standards above. It does not turn on a production Cargo-IMP
                feed. Ask for that scope when you request a demo.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Button nativeButton={false} render={<Link href="/demo" />}>
            Request a demo
          </Button>
        </div>
      </main>
    </MarketingShell>
  );
}
