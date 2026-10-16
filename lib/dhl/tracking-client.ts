import "server-only";

import { dhlNotConfiguredMessage } from "./env-messages";
import type { TrackingEvent, TrackingResponse, TrackingShipment } from "./tracking-types";

const DEFAULT_TRACKING_BASE = "https://api-eu.dhl.com";

function getTrackingConfig() {
  const apiKey = process.env.DHL_API_KEY;
  const baseUrl = (process.env.DHL_TRACKING_BASE_URL ?? DEFAULT_TRACKING_BASE).replace(
    /\/$/,
    ""
  );
  return { apiKey, baseUrl, isConfigured: Boolean(apiKey) };
}

function formatAddress(address: unknown): string | undefined {
  if (!address || typeof address !== "object") return undefined;
  const a = address as {
    addressLocality?: string;
    postalCode?: string;
    countryCode?: string;
  };
  return [a.addressLocality, a.postalCode, a.countryCode].filter(Boolean).join(", ");
}

function normalizeShipments(payload: unknown): TrackingShipment[] {
  if (!payload || typeof payload !== "object") return [];
  const root = payload as {
    shipments?: Array<{
      id?: string;
      status?: { statusCode?: string; description?: string; timestamp?: string };
      estimatedTimeOfDelivery?: string;
      service?: string;
      origin?: { address?: unknown };
      destination?: { address?: unknown };
      events?: Array<{
        timestamp?: string;
        location?: { address?: { addressLocality?: string; countryCode?: string } };
        description?: string;
        statusCode?: string;
      }>;
    }>;
  };

  if (!Array.isArray(root.shipments)) return [];

  return root.shipments.map((shipment) => {
    const events: TrackingEvent[] = (shipment.events ?? []).map((event) => ({
      timestamp: event.timestamp,
      description: event.description,
      statusCode: event.statusCode,
      location: event.location?.address
        ? [event.location.address.addressLocality, event.location.address.countryCode]
            .filter(Boolean)
            .join(", ")
        : undefined,
    }));

    return {
      id: shipment.id ?? "unknown",
      status: shipment.status?.statusCode,
      statusDetail: shipment.status?.description,
      estimatedDelivery: shipment.estimatedTimeOfDelivery,
      origin: formatAddress(shipment.origin?.address),
      destination: formatAddress(shipment.destination?.address),
      service: shipment.service,
      events,
    };
  });
}

export async function fetchDhlTracking(
  trackingNumber: string,
  options?: { originCountryCode?: string; recipientPostalCode?: string }
): Promise<TrackingResponse> {
  const config = getTrackingConfig();
  const trimmed = trackingNumber.trim();

  if (!trimmed) {
    return {
      configured: config.isConfigured,
      source: "error",
      message: "Enter a tracking number.",
    };
  }

  if (!config.isConfigured) {
    return {
      configured: false,
      source: "unconfigured",
      message: dhlNotConfiguredMessage(),
    };
  }

  const params = new URLSearchParams({ trackingNumber: trimmed });
  if (options?.originCountryCode) {
    params.set("originCountryCode", options.originCountryCode);
  }
  if (options?.recipientPostalCode) {
    params.set("recipientPostalCode", options.recipientPostalCode);
  }

  try {
    const response = await fetch(
      `${config.baseUrl}/track/shipments?${params.toString()}`,
      {
        headers: {
          Accept: "application/json",
          "DHL-API-Key": config.apiKey!,
        },
        cache: "no-store",
      }
    );

    const data: unknown = await response.json().catch(() => null);

    if (response.status === 404) {
      return {
        configured: true,
        source: "not_found",
        message: "No shipment found for that tracking number.",
      };
    }

    if (!response.ok) {
      const detail =
        data && typeof data === "object" && "detail" in data
          ? String((data as { detail: string }).detail)
          : response.statusText;
      return {
        configured: true,
        source: "error",
        message: `DHL tracking error (${response.status}): ${detail}`,
      };
    }

    const shipments = normalizeShipments(data);

    if (shipments.length === 0) {
      return {
        configured: true,
        source: "not_found",
        message: "No shipment data returned for that tracking number.",
      };
    }

    return {
      configured: true,
      source: "dhl",
      shipments,
    };
  } catch (error) {
    return {
      configured: true,
      source: "error",
      message:
        error instanceof Error ? error.message : "Failed to reach DHL tracking API.",
    };
  }
}
