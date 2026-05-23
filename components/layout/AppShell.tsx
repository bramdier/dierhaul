import Link from "next/link";

const appLinks = [
  { href: "/ctms", label: "CTMS", icon: "inventory_2" },
  { href: "/fleet", label: "Fleet", icon: "local_shipping" },
  { href: "/calculator", label: "Calculator", icon: "calculate" },
  { href: "/about", label: "About", icon: "person" },
];

export default function AppShell({
  children,
  title,
  subtitle,
  showHeader = true,
}: {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  showHeader?: boolean;
}) {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-outline-variant/15 bg-primary">
        <div className="mx-auto flex max-w-screen-2xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="font-headline text-xl font-black uppercase tracking-tighter text-white"
          >
            Dierhaul
          </Link>
          <nav className="flex gap-1 sm:gap-2">
            {appLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold uppercase tracking-wider text-white/70 transition-colors hover:bg-white/10 hover:text-white sm:px-4 sm:text-sm"
              >
                <span className="material-symbols-outlined text-base">
                  {link.icon}
                </span>
                <span className="hidden sm:inline">{link.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
      <div className="mx-auto max-w-screen-2xl px-6 py-8">
        {showHeader && title && (
          <div className="mb-8">
            <p className="mb-1 font-label text-[10px] font-bold uppercase tracking-[0.2em] text-on-tertiary-container">
              Dierhaul Platform
            </p>
            <h1 className="font-headline text-3xl font-extrabold text-primary sm:text-4xl">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-2 max-w-2xl text-secondary">{subtitle}</p>
            )}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
