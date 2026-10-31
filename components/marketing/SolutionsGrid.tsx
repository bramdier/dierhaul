import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { solutions } from "@/lib/cargo-site";
import Link from "next/link";

export default function SolutionsGrid() {
  return (
    <section id="solutions" className="px-6 py-16">
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-8">
        <div className="flex max-w-2xl flex-col gap-3">
          <h2 className="font-heading text-3xl font-medium tracking-tight text-foreground">
            Modules for the cargo operation
          </h2>
          <p className="text-muted-foreground">
            Booking, acceptance, dangerous goods, e-AWB, manifest and load
            planning, and tracking. Tracking is one module, not the product.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {solutions.map((solution) => (
            <Card key={solution.slug}>
              <CardHeader>
                <CardTitle>{solution.title}</CardTitle>
                <CardDescription>{solution.summary}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button
                  nativeButton={false}
                  render={<Link href={`/solutions/${solution.slug}`} />}
                  variant="link"
                >
                  View {solution.title}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
