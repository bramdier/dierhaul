import MarketingShell from "@/components/layout/MarketingShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { aboutContent } from "@/lib/about-content";
import { DEMO_EMAIL, DEMO_WHATSAPP } from "@/lib/module-content";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us | Dierhaul",
  description:
    "The team behind Dierhaul’s airline cargo management platform, from booking to delivery.",
};

export default function AboutPage() {
  const emailHref = `mailto:${DEMO_EMAIL}?subject=${encodeURIComponent("Contact — Dierhaul")}`;
  const whatsappHref = `https://wa.me/${DEMO_WHATSAPP}?text=${encodeURIComponent("Hi, I'd like to connect regarding Dierhaul.")}`;

  return (
    <MarketingShell>
      <main className="px-6 py-12">
        <div className="mx-auto flex max-w-6xl flex-col gap-10">
          <section className="grid items-center gap-10 lg:grid-cols-2">
            <div className="flex flex-col gap-5">
              <Badge variant="secondary">About us</Badge>
              <h1 className="font-heading text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
                {aboutContent.firmHeading}
              </h1>
              <p className="max-w-xl text-base text-muted-foreground">
                {aboutContent.firmIntro}
              </p>
              <div className="flex flex-wrap gap-2">
                <Button nativeButton={false} render={<Link href="/demo" />}>
                  Request a demo
                </Button>
                <Button
                  nativeButton={false}
                  render={<Link href="/track" />}
                  variant="outline"
                >
                  Track an air waybill
                </Button>
              </div>
            </div>
            <div className="relative mx-auto aspect-[4/3] w-full max-w-md overflow-hidden rounded-xl bg-muted lg:max-w-none">
              <Image
                alt={aboutContent.image.alt}
                className="object-cover object-center"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                src={aboutContent.image.src}
              />
            </div>
          </section>

          <Card>
            <div className="grid items-center gap-8 lg:grid-cols-12">
              <div className="px-(--card-spacing) lg:col-span-4">
                <div className="relative mx-auto aspect-[4/5] w-full max-w-xs overflow-hidden rounded-xl bg-muted">
                  <Image
                    alt={aboutContent.founderImage.alt}
                    className="object-cover object-top"
                    fill
                    sizes="320px"
                    src={aboutContent.founderImage.src}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3 lg:col-span-8">
                <CardHeader>
                  <Badge variant="outline">Founder</Badge>
                  <CardTitle className="text-2xl">{aboutContent.name}</CardTitle>
                  <CardDescription>{aboutContent.role}</CardDescription>
                </CardHeader>
                <div className="flex flex-col gap-3 px-(--card-spacing) pb-(--card-spacing) text-sm text-muted-foreground">
                  <p>{aboutContent.tagline}</p>
                  <p>{aboutContent.bio}</p>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="grid items-center gap-8 lg:grid-cols-12">
              <div className="px-(--card-spacing) lg:col-span-4">
                <div className="relative mx-auto aspect-[4/5] w-full max-w-xs overflow-hidden rounded-xl bg-muted">
                  <Image
                    alt={aboutContent.ceo.image.alt}
                    className="object-cover object-top"
                    fill
                    sizes="320px"
                    src={aboutContent.ceo.image.src}
                  />
                </div>
              </div>
              <div className="lg:col-span-8">
                <CardHeader>
                  <Badge variant="outline">Operational</Badge>
                  <CardTitle className="text-2xl">{aboutContent.ceo.name}</CardTitle>
                  <CardDescription>{aboutContent.ceo.role}</CardDescription>
                </CardHeader>
                <p className="max-w-xl px-(--card-spacing) pb-(--card-spacing) text-sm text-muted-foreground">
                  {aboutContent.ceo.tagline}
                </p>
              </div>
            </div>
          </Card>

          <section className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <Badge variant="secondary">Capabilities</Badge>
              <h2 className="font-heading text-3xl font-medium tracking-tight text-foreground">
                Core capabilities
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {aboutContent.highlights.map((item) => (
                <Card key={item.title}>
                  <CardHeader>
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </section>

          <section className="grid gap-8 rounded-xl bg-primary p-8 text-primary-foreground lg:grid-cols-2">
            <div className="flex flex-col justify-center gap-4">
              <h2 className="font-heading text-2xl font-medium tracking-tight">
                Talk through an airline cargo operation.
              </h2>
              <p className="text-sm text-primary-foreground/80">
                Reach out for a demo of booking, acceptance, DGR, the e-AWB,
                and the manifest.
              </p>
              <div className="flex flex-wrap gap-2">
                <Button
                  nativeButton={false}
                  render={<a href={emailHref} />}
                  variant="secondary"
                >
                  Email
                </Button>
                <Button
                  nativeButton={false}
                  render={
                    <a
                      href={whatsappHref}
                      rel="noopener noreferrer"
                      target="_blank"
                    />
                  }
                  variant="secondary"
                >
                  WhatsApp
                </Button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </MarketingShell>
  );
}
