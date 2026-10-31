import MarketingShell from "@/components/layout/MarketingShell";
import DemoForm from "@/components/marketing/DemoForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DEMO_EMAIL } from "@/lib/module-content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Demo / Contact | Dierhaul",
  description:
    "Request a demo of Dierhaul for airline cargo, from booking to delivery.",
};

export default function DemoPage() {
  return (
    <MarketingShell>
      <main className="px-6 py-12">
        <div className="mx-auto grid max-w-screen-2xl gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,28rem)]">
          <div className="flex flex-col gap-4">
            <h1 className="font-heading text-4xl font-medium tracking-tight text-foreground">
              Request a demo
            </h1>
            <p className="max-w-xl text-base text-muted-foreground">
              For cargo commercial managers, cargo operations managers, and
              ground handling supervisors. Tell us which part of the operation
              you want to walk through, from booking to delivery.
            </p>
            <p className="text-sm text-muted-foreground">
              Or email {DEMO_EMAIL} directly.
            </p>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Demo request</CardTitle>
              <CardDescription>
                This opens your email app. The form does not store the message.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DemoForm />
            </CardContent>
          </Card>
        </div>
      </main>
    </MarketingShell>
  );
}
