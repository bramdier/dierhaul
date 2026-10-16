"use client";

import DierhaulLogo from "@/components/brand/DierhaulLogo";
import Link from "next/link";
import { useState } from "react";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex w-full max-w-md flex-col items-center text-center lg:items-stretch lg:text-left">
      <DierhaulLogo href={null} className="mb-8 h-16 w-auto sm:h-20 lg:hidden" />
      <h1 className="text-3xl font-bold tracking-tight text-neutral-950 sm:text-4xl">
        Sign in
      </h1>
      <form
        className="mt-8 space-y-5"
        onSubmit={(event) => event.preventDefault()}
      >
        <div>
          <label
            htmlFor="login-email"
            className="mb-2 block text-sm font-medium text-neutral-800"
          >
            Your email
          </label>
          <input
            id="login-email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 outline-none ring-orange-500/0 transition-shadow placeholder:text-neutral-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-500/20"
          />
        </div>
        <div>
          <label
            htmlFor="login-password"
            className="mb-2 block text-sm font-medium text-neutral-800"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="••••••••"
              className="w-full rounded-xl border border-neutral-200 bg-white py-3 pr-12 pl-4 text-sm text-neutral-900 outline-none transition-shadow placeholder:text-neutral-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-500/20"
            />
            <button
              type="button"
              className="absolute top-1/2 right-3 -translate-y-1/2 text-neutral-500 hover:text-neutral-800"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((value) => !value)}
            >
              <span className="material-symbols-outlined text-xl">
                {showPassword ? "visibility_off" : "visibility"}
              </span>
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="w-full rounded-full bg-neutral-950 py-3.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
        >
          Sign in
        </button>
      </form>

      <div className="my-8 flex items-center gap-4">
        <div className="h-px flex-1 bg-neutral-200" />
        <span className="text-xs text-neutral-500">or continue with</span>
        <div className="h-px flex-1 bg-neutral-200" />
      </div>

      <div className="flex justify-center gap-3">
        {["G", "⌘", "A"].map((label) => (
          <button
            key={label}
            type="button"
            className="flex h-12 w-12 items-center justify-center rounded-xl border border-neutral-200 bg-white text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-50"
            aria-label="Social sign-in (demo)"
          >
            {label}
          </button>
        ))}
      </div>

      <p className="mt-10 text-center text-sm text-neutral-600">
        Need an trial account?{" "}
        <Link
          href="/login"
          className="font-medium text-neutral-950 underline-offset-2 hover:underline"
        >
          Register
        </Link>
      </p>
    </div>
  );
}
