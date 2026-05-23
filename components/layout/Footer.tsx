import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-outline-variant/20 bg-surface-container-low px-6 py-12">
      <div className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-8 md:grid-cols-4">
        <div className="space-y-4">
          <div className="font-headline text-lg font-bold uppercase tracking-widest text-primary">
            Dierhaul
          </div>
          <p className="max-w-xs text-xs tracking-wide text-on-surface-variant">
            One-stop logistics platform for container tracking, fleet management,
            and cargo pricing. Precision engineering for global freight
            operations.
          </p>
        </div>
        <div>
          <h5 className="mb-4 font-headline text-xs font-bold uppercase tracking-widest text-primary">
            Platform
          </h5>
          <ul className="space-y-2">
            <li>
              <Link
                href="/ctms"
                className="text-xs tracking-wide text-on-surface-variant transition-all hover:text-primary hover:underline"
              >
                Container Tracking (CTMS)
              </Link>
            </li>
            <li>
              <Link
                href="/fleet"
                className="text-xs tracking-wide text-on-surface-variant transition-all hover:text-primary hover:underline"
              >
                Fleet Management
              </Link>
            </li>
            <li>
              <Link
                href="/calculator"
                className="text-xs tracking-wide text-on-surface-variant transition-all hover:text-primary hover:underline"
              >
                Pricing Calculator
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="mb-4 font-headline text-xs font-bold uppercase tracking-widest text-primary">
            Company
          </h5>
          <ul className="space-y-2">
            <li>
              <Link
                href="/about"
                className="text-xs tracking-wide text-on-surface-variant transition-all hover:text-primary hover:underline"
              >
                About Us
              </Link>
            </li>
            <li>
              <span className="text-xs tracking-wide text-on-surface-variant">
                Privacy Policy
              </span>
            </li>
            <li>
              <span className="text-xs tracking-wide text-on-surface-variant">
                Terms of Service
              </span>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="mb-4 font-headline text-xs font-bold uppercase tracking-widest text-primary">
            Newsletter
          </h5>
          <div className="flex gap-2">
            <input
              className="w-full rounded border border-outline-variant/30 bg-white px-3 py-2 text-xs"
              placeholder="Email"
              type="email"
            />
            <button className="bg-primary px-4 py-2 text-[10px] font-bold uppercase tracking-tighter text-white">
              Join
            </button>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-screen-2xl border-t border-outline-variant/20 pt-8">
        <p className="text-xs tracking-wide text-on-surface-variant">
          © 2026 Dierhaul Logistics Systems. One-Stop Solution for Global
          Logistics.
        </p>
      </div>
    </footer>
  );
}
