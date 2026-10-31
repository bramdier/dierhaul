import { Separator } from "@/components/ui/separator";
import { primaryNav, solutions } from "@/lib/cargo-site";
import { DEMO_EMAIL, DEMO_WHATSAPP } from "@/lib/module-content";
import Link from "next/link";

export default function SiteFooter() {
  const whatsappHref = `https://wa.me/${DEMO_WHATSAPP}`;

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-8 px-6 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-3">
            <p className="font-heading text-sm font-medium text-foreground">
              Dierhaul
            </p>
            <p className="text-sm text-muted-foreground">
              Cargo management for airlines, from booking to delivery.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-foreground">Solutions</p>
            {solutions.map((solution) => (
              <Link
                key={solution.slug}
                href={`/solutions/${solution.slug}`}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                {solution.title}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-foreground">Company</p>
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Home
            </Link>
            {primaryNav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/demo"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Demo / Contact
            </Link>
            <Link
              href="/login"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Login
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-foreground">Contact</p>
            <a
              href={`mailto:${DEMO_EMAIL}`}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              {DEMO_EMAIL}
            </a>
            <a
              href={whatsappHref}
              className="text-sm text-muted-foreground hover:text-foreground"
              rel="noopener noreferrer"
              target="_blank"
            >
              WhatsApp
            </a>
          </div>
        </div>
        <Separator />
        <p className="text-sm text-muted-foreground">
          If Dierhaul stores personal data of people in Indonesia, that
          handling follows Undang-Undang Nomor 27 Tahun 2022 (UU PDP). This
          site describes product intent. It is not a legal opinion or a
          certification.
        </p>
      </div>
    </footer>
  );
}
