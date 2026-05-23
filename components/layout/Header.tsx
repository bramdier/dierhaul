import Link from "next/link";

const navLinks = [
  { href: "/#modules", label: "Products" },
  { href: "/about", label: "About Us" },
];

export default function Header() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-outline-variant/15 bg-white/80 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex max-w-screen-2xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-headline text-2xl font-black uppercase tracking-tighter text-primary"
        >
          Dierhaul
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-headline text-sm font-bold uppercase tracking-tight text-secondary transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <Link
          href="/calculator"
          className="signature-gradient rounded-lg px-6 py-2.5 font-headline text-sm font-bold uppercase tracking-wider text-white transition-all duration-300 active:scale-95"
        >
          Get Quote
        </Link>
      </div>
    </nav>
  );
}
