import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { workflow } from "@/lib/cargo-site";
import Link from "next/link";

export default function WorkflowStrip() {
  return (
    <section id="workflow" className="bg-muted/40 px-6 py-16">
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-8">
        <div className="flex max-w-2xl flex-col gap-3">
          <h2 className="font-heading text-3xl font-medium tracking-tight text-foreground">
            From booking to delivery
          </h2>
          <p className="text-muted-foreground">
            Eight steps. Each one opens the module that owns it.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {workflow.map((item) => (
            <Card key={item.step}>
              <CardHeader>
                <Badge variant="outline">{item.step}</Badge>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button
                  nativeButton={false}
                  render={<Link href={item.href} />}
                  variant="link"
                >
                  Open step
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
