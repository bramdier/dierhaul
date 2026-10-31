import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { solutions, type Solution } from "@/lib/cargo-site";
import Link from "next/link";

export default function SolutionView({ solution }: { solution: Solution }) {
  const others = solutions.filter((item) => item.slug !== solution.slug);

  return (
    <main className="px-6 py-12">
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-10">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink render={<Link href="/" />}>Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <span className="text-muted-foreground">Solutions</span>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{solution.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex max-w-3xl flex-col gap-4">
          <Badge variant="secondary">{solution.audience}</Badge>
          <h1 className="font-heading text-4xl font-medium tracking-tight text-foreground">
            {solution.title}
          </h1>
          <p className="text-base text-muted-foreground">{solution.summary}</p>
          <p className="text-base text-foreground">{solution.body}</p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>What this step does</CardTitle>
              <CardDescription>
                The work this module is responsible for.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="flex flex-col gap-2 text-sm text-foreground">
                {solution.responsibilities.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Terms this step uses</CardTitle>
              <CardDescription>
                Language the operation already uses for this work.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {solution.terms.map((term) => (
                  <Badge key={term} variant="outline">
                    {term}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {solution.slug === "tracking" ? (
          <Card>
            <CardHeader>
              <CardTitle>Where status comes from</CardTitle>
              <CardDescription>
                Airline status is read from FSU messages. ONE Record is the
                later source. The air waybill lookup on Track does not call a
                parcel carrier.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button nativeButton={false} render={<Link href="/track" />}>
                Look up an air waybill
              </Button>
            </CardContent>
          </Card>
        ) : null}

        <div className="flex flex-wrap gap-2">
          <Button nativeButton={false} render={<Link href="/demo" />}>
            Request a demo
          </Button>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="font-heading text-2xl font-medium tracking-tight text-foreground">
            Other modules
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {others.map((item) => (
              <Card key={item.slug}>
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.summary}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    nativeButton={false}
                    render={<Link href={`/solutions/${item.slug}`} />}
                    variant="link"
                  >
                    View {item.title}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
