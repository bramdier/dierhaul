import { fetchDhlTracking } from "@/lib/dhl/tracking-client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const trackingNumber = searchParams.get("trackingNumber") ?? "";
  const originCountryCode = searchParams.get("originCountryCode") ?? undefined;
  const recipientPostalCode = searchParams.get("recipientPostalCode") ?? undefined;

  const result = await fetchDhlTracking(trackingNumber, {
    originCountryCode,
    recipientPostalCode,
  });

  const status =
    result.source === "error" && result.configured ? 502 : 200;

  return NextResponse.json(result, { status });
}
