import "server-only";

/** User-safe copy — never mention file paths or env var names in production. */
export function dhlNotConfiguredMessage(): string {
  if (process.env.NODE_ENV === "production") {
    return "Shipment tracking is temporarily unavailable. Please try again later.";
  }
  return "Add DHL_API_KEY to .env.local (Shipment Tracking – Unified subscription key).";
}
