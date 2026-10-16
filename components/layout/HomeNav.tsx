"use client";

import DierhaulLogo from "@/components/brand/DierhaulLogo";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/track", label: "Track" },
  { href: "/project", label: "Project" },
  { href: "/about", label: "About" },
];

function isLinkActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function navLinkClass(active: boolean) {
  return active
    ? "text-sm font-semibold text-neutral-950 transition-colors"
    : "text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-950";
}

function DesktopNavLink({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`relative px-1 py-1 ${navLinkClass(active)}`}
    >
      {active ? (
        <motion.span
          layoutId="home-nav-active"
          className="absolute inset-0 -z-10 rounded-full bg-neutral-100"
          transition={{ type: "spring", stiffness: 420, damping: 32 }}
        />
      ) : null}
      <span className="relative">{label}</span>
    </Link>
  );
}

export default function HomeNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="absolute inset-x-0 top-0 z-20 flex justify-center px-4 pt-5">
      <div className="w-full max-w-xl md:w-auto md:max-w-none">
        <nav className="marketing-shadow-float flex items-center gap-2 rounded-full bg-white py-1.5 pr-1.5 pl-4 md:gap-7 md:pl-5">
          <DierhaulLogo href="/" priority className="h-10 w-auto sm:h-11" />
          <div className="hidden items-center gap-6 md:flex">
            {links.map((link) => (
              <DesktopNavLink
                key={link.href}
                href={link.href}
                label={link.label}
                active={isLinkActive(pathname, link.href)}
              />
            ))}
          </div>
          <button
            type="button"
            className="ml-auto rounded-full px-3 py-2 text-sm font-medium text-neutral-700 md:hidden"
            aria-expanded={open}
            aria-controls="home-nav-menu"
            onClick={() => setOpen((value) => !value)}
          >
            Menu
          </button>
          <Link
            href="/login"
            className="rounded-full bg-neutral-950 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
          >
            Get Started
          </Link>
        </nav>
        {open ? (
          <motion.div
            id="home-nav-menu"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="marketing-shadow-float mt-2 flex flex-col rounded-3xl bg-white p-2 md:hidden"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-2xl px-4 py-2.5 transition-colors hover:bg-neutral-100 ${navLinkClass(isLinkActive(pathname, link.href))}`}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        ) : null}
      </div>
    </div>
  );
}
