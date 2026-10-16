import type { ReactNode } from "react";

export default function OutlineBadge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block rounded-full border border-neutral-300 bg-white px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-neutral-800">
      {children}
    </span>
  );
}
