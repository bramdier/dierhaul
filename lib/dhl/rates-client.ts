import "server-only";

import { getDhlAuthHeader, getDhlConfig } from "./config";
import type {
  DhlQuoteProduct,
  DhlQuoteResponse,
  DhlRatesRequestBody,
} from "./types";

function normalizeProducts(payload: unknown): DhlQuoteProduct[] {
  if (!payload || typeof payload !== "object") return [];

  const root = payload as {
    products?: Array<{
      productCode?: string;
      productName?: string;
      totalPrice?: Array<{ price?: number; priceCurrency?: string }>;
      deliveryCapabilities?: { estimatedDeliveryDateAndTime?: string };
    }>;
  };

  if (!Array.isArray(root.products)) return [];

  const products: DhlQuoteProduct[] = [];

  for (const product of root.products) {
    const priceBlock = product.totalPrice?.[0];
    const price = priceBlock?.price;
    if (product.productCode == null || price == null) continue;

    products.push({
      productCode: product.productCode,
      productName: product.productName ?? product.productCode,
      totalPrice: price,
      currency: priceBlock?.priceCurrency ?? "USD",
      deliveryTime: product.deliveryCapabilities?.estimatedDeliveryDateAndTime,
    });
  }

  return products;
}

export async function fetchDhlRates(
  body: DhlRatesRequestBody
): Promise<DhlQuoteResponse> {
  const config = getDhlConfig();

  if (!config.isConfigured) {
    return {
      source: "unconfigured",
      configured: false,
      message:
        "DHL credentials are not set. Add DHL_API_KEY, DHL_API_SECRET, and DHL_ACCOUNT_NUMBER to .env.local.",
    };
  }

  const plannedShippingDateAndTime =
    body.plannedShippingDate ?? new Date().toISOString();

  const isCustomsDeclarable =
    body.shipper.countryCode.toUpperCase() !==
    body.receiver.countryCode.toUpperCase();

  const length = body.lengthCm ?? 40;
  const width = body.widthCm ?? 30;
  const height = body.heightCm ?? 30;

  const dhlPayload = {
    customerDetails: {
      shipperDetails: {
        postalCode: body.shipper.postalCode,
        cityName: body.shipper.cityName,
        countryCode: body.shipper.countryCode,
        addressLine1: body.shipper.addressLine1 ?? "",
      },
      receiverDetails: {
        postalCode: body.receiver.postalCode,
        cityName: body.receiver.cityName,
        countryCode: body.receiver.countryCode,
        addressLine1: body.receiver.addressLine1 ?? "",
      },
    },
    accounts: [
      {
        typeCode: "shipper",
        number: config.accountNumber,
      },
    ],
    productCode: "",
    plannedShippingDateAndTime,
    unitOfMeasurement: "metric",
    isCustomsDeclarable,
    packages: [
      {
        weight: body.weightKg,
        dimensions: { length, width, height },
      },
    ],
  };

  try {
    const response = await fetch(`${config.baseUrl}/rates`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: getDhlAuthHeader(config.apiKey!, config.apiSecret!),
      },
      body: JSON.stringify(dhlPayload),
      cache: "no-store",
    });

    const data: unknown = await response.json().catch(() => null);

    if (!response.ok) {
      const detail =
        data && typeof data === "object" && "detail" in data
          ? String((data as { detail: string }).detail)
          : response.statusText;
      return {
        source: "error",
        configured: true,
        message: `DHL API error (${response.status}): ${detail}`,
      };
    }

    const products = normalizeProducts(data);

    return {
      source: "dhl",
      configured: true,
      products,
      message:
        products.length === 0
          ? "DHL returned no products for this lane. Check addresses and account setup."
          : undefined,
    };
  } catch (error) {
    return {
      source: "error",
      configured: true,
      message:
        error instanceof Error ? error.message : "Failed to reach DHL API.",
    };
  }
}
