import type { ReactNode } from "react";

export default function PillBadge({ children }: { children: ReactNode }) {
  return (
    <p className="inline-block rounded-full bg-white/90 px-3.5 py-1 text-xs font-medium text-neutral-800 shadow-sm backdrop-blur-sm">
      {children}
    </p>
  );
}
