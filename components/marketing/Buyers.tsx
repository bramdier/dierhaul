import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buyers } from "@/lib/cargo-site";

export default function Buyers() {
  return (
    <section id="buyers" className="px-6 py-16">
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-8">
        <div className="flex max-w-2xl flex-col gap-3">
          <h2 className="font-heading text-3xl font-medium tracking-tight text-foreground">
            Built for the people who run the flight
          </h2>
          <p className="text-muted-foreground">
            The same shipment file, in the words cargo commercial, cargo
            operations, and ground handling already use.
          </p>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {buyers.map((buyer) => (
            <Card key={buyer.title}>
              <CardHeader>
                <CardTitle>{buyer.title}</CardTitle>
                <CardDescription>{buyer.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
