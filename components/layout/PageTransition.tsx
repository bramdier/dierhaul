"use client";

import { usePathname } from "next/navigation";
import { useRef } from "react";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const initialPathname = useRef(pathname);
  const animate = pathname !== initialPathname.current;

  return (
    <div
      key={pathname}
      className={animate ? "page-enter min-h-svh" : "min-h-svh"}
    >
      {children}
    </div>
  );
}
