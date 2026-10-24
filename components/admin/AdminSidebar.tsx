"use client";

import DierhaulLogo from "@/components/brand/DierhaulLogo";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/admin/tracker", label: "Tracker settings" },
  { href: "/admin/project", label: "Project images" },
  { href: "/admin/images", label: "Image Pooling" },
];

export default function AdminSidebar({ email }: { email: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSignOut() {
    setError(null);
    setSigningOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
      router.refresh();
    } catch {
      setSigningOut(false);
      setError("Could not sign out.");
    }
  }

  return (
    <aside className="border-b border-neutral-200 bg-white lg:sticky lg:top-0 lg:flex lg:h-svh lg:flex-col lg:border-r lg:border-b-0">
      <div className="flex items-center justify-between gap-4 px-5 py-4 lg:block lg:px-4 lg:pt-6">
        <DierhaulLogo href="/" className="h-10 w-auto" />
        <div className="flex items-center gap-3 lg:mt-3 lg:block">
          <p className="truncate text-xs text-neutral-500">{email}</p>
          <button
            type="button"
            onClick={handleSignOut}
            disabled={signingOut}
            className="text-xs font-medium text-neutral-600 hover:text-neutral-950 disabled:opacity-60 lg:hidden"
          >
            {signingOut ? "Signing out…" : "Sign out"}
          </button>
        </div>
      </div>

      <nav className="flex gap-2 overflow-x-auto px-4 pb-4 lg:mt-6 lg:flex-1 lg:flex-col lg:overflow-visible lg:px-3">
        {links.map((link) => {
          const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`shrink-0 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-neutral-950 text-white"
                  : "text-neutral-700 hover:bg-neutral-100"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="hidden space-y-1 border-t border-neutral-200 px-3 py-4 lg:block">
        <Link
          href="/project"
          className="block rounded-xl px-3 py-2 text-sm text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-950"
        >
          View projects
        </Link>
        <Link
          href="/track"
          className="block rounded-xl px-3 py-2 text-sm text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-950"
        >
          View tracker
        </Link>
        <button
          type="button"
          onClick={handleSignOut}
          disabled={signingOut}
          className="block w-full rounded-xl px-3 py-2 text-left text-sm text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-950 disabled:opacity-60"
        >
          {signingOut ? "Signing out…" : "Sign out"}
        </button>
        {error ? <p className="px-3 text-xs text-red-700">{error}</p> : null}
      </div>
    </aside>
  );
}
