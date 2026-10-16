import LoginForm from "@/components/auth/LoginForm";
import DierhaulLogo from "@/components/brand/DierhaulLogo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in | Dierhaul",
  description: "Sign in to the Dierhaul logistics platform.",
};

export default function LoginPage() {
  return (
    <main className="grid min-h-svh lg:grid-cols-2">
      <div className="relative flex flex-col overflow-hidden bg-gradient-to-br from-orange-200 via-orange-100 to-amber-50 p-8 sm:p-10 lg:p-12">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.5),transparent_50%)]"
          aria-hidden
        />
        <div className="relative z-10 flex flex-1 flex-col items-start justify-start pt-2">
          <DierhaulLogo
            href="/"
            priority
            className="h-28 w-auto drop-shadow-[0_2px_16px_rgba(0,0,0,0.12)] sm:h-36 lg:h-40"
          />
        </div>
        <div className="relative z-10 max-w-md pb-4 text-left">
          <p className="text-sm font-medium text-neutral-700">You can easily</p>
          <p className="mt-2 text-3xl font-bold leading-tight tracking-tight text-neutral-950 sm:text-4xl">
            Get access to your hub for clarity and logistics operations.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center px-6 py-12 sm:px-10 lg:px-16">
        <LoginForm />
      </div>
    </main>
  );
}
