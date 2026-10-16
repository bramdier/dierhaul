import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const variantClasses: Record<Variant, string> = {
  primary:
    "inline-flex items-center justify-center gap-2 rounded-full bg-neutral-950 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800",
  secondary:
    "inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-neutral-900 marketing-shadow-button transition-colors hover:bg-neutral-50",
  ghost:
    "inline-flex items-center gap-2 text-sm font-medium text-neutral-900 transition-colors hover:text-neutral-600",
};

export default function MarketingButton({
  href,
  variant = "primary",
  className = "",
  children,
}: {
  href: string;
  variant?: Variant;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`${variantClasses[variant]} ${className}`.trim()}
    >
      {children}
    </Link>
  );
}
