import { fetchDhlRates } from "@/lib/dhl/rates-client";
import type { DhlRatesRequestBody } from "@/lib/dhl/types";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  let body: DhlRatesRequestBody;

  try {
    body = (await request.json()) as DhlRatesRequestBody;
  } catch {
    return NextResponse.json(
      { source: "error", configured: false, message: "Invalid JSON body." },
      { status: 400 }
    );
  }

  if (
    !body?.shipper?.countryCode ||
    !body?.receiver?.countryCode ||
    !body?.weightKg
  ) {
    return NextResponse.json(
      {
        source: "error",
        configured: false,
        message:
          "Required: shipper/receiver countryCode, cityName, postalCode, weightKg.",
      },
      { status: 400 }
    );
  }

  const result = await fetchDhlRates(body);
  const status =
    result.source === "error" && result.configured ? 502 : 200;

  return NextResponse.json(result, { status });
}
