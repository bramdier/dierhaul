import type { TrackerConfig } from "@/lib/db/schema";

export const TRACKER_FIELD_KEYS = [
  "service",
  "estimatedDelivery",
  "origin",
  "destination",
] as const;

export type TrackerFieldKey = (typeof TRACKER_FIELD_KEYS)[number];

export const STATUS_BADGE_COLORS = [
  "emerald",
  "blue",
  "amber",
  "red",
  "neutral",
] as const;

export type StatusBadgeColor = (typeof STATUS_BADGE_COLORS)[number];

export const FIELD_LABEL_DEFAULTS: Record<TrackerFieldKey, string> = {
  service: "Service",
  estimatedDelivery: "Estimated delivery",
  origin: "Origin",
  destination: "Destination",
};

export type TrackerConfigDraft = {
  pageTitle: string;
  pageSubtitle: string;
  productName: string;
  logoUrl: string;
  labelTrackingNumber: string;
  placeholderTrackingNumber: string;
  showOriginField: boolean;
  labelOriginCountry: string;
  placeholderOriginCountry: string;
  showPostalField: boolean;
  labelPostalCode: string;
  placeholderPostalCode: string;
  buttonLabel: string;
  buttonLoadingLabel: string;
  showStatusBadge: boolean;
  statusBadgeColor: StatusBadgeColor;
  labelShipmentId: string;
  visibleFields: TrackerFieldKey[];
  fieldLabels: Record<TrackerFieldKey, string>;
  showEventHistory: boolean;
  labelEventHistory: string;
  timelineDotColor: string;
  fallbackEventLabel: string;
  showFooter: boolean;
  footerText: string;
};

type DraftSource = {
  pageTitle: string;
  pageSubtitle: string;
  productName: string;
  logoUrl: string | null;
  labelTrackingNumber: string;
  placeholderTrackingNumber: string;
  showOriginField: boolean;
  labelOriginCountry: string;
  placeholderOriginCountry: string;
  showPostalField: boolean;
  labelPostalCode: string;
  placeholderPostalCode: string;
  buttonLabel: string;
  buttonLoadingLabel: string;
  showStatusBadge: boolean;
  statusBadgeColor: string;
  labelShipmentId: string;
  visibleFields: TrackerConfig["visibleFields"];
  fieldLabels: TrackerConfig["fieldLabels"] | null;
  showEventHistory: boolean;
  labelEventHistory: string;
  timelineDotColor: string;
  fallbackEventLabel: string;
  showFooter: boolean;
  footerText: string;
};

function isFieldKey(value: string): value is TrackerFieldKey {
  return (TRACKER_FIELD_KEYS as readonly string[]).includes(value);
}

function isBadgeColor(value: string): value is StatusBadgeColor {
  return (STATUS_BADGE_COLORS as readonly string[]).includes(value);
}

export function toTrackerConfigDraft(row: DraftSource): TrackerConfigDraft {
  const labels = row.fieldLabels ?? {};
  const visibleFields = Array.isArray(row.visibleFields)
    ? row.visibleFields.filter(isFieldKey)
    : [...TRACKER_FIELD_KEYS];

  return {
    pageTitle: row.pageTitle,
    pageSubtitle: row.pageSubtitle,
    productName: row.productName,
    logoUrl: row.logoUrl ?? "",
    labelTrackingNumber: row.labelTrackingNumber,
    placeholderTrackingNumber: row.placeholderTrackingNumber,
    showOriginField: row.showOriginField,
    labelOriginCountry: row.labelOriginCountry,
    placeholderOriginCountry: row.placeholderOriginCountry,
    showPostalField: row.showPostalField,
    labelPostalCode: row.labelPostalCode,
    placeholderPostalCode: row.placeholderPostalCode,
    buttonLabel: row.buttonLabel,
    buttonLoadingLabel: row.buttonLoadingLabel,
    showStatusBadge: row.showStatusBadge,
    statusBadgeColor: isBadgeColor(row.statusBadgeColor)
      ? row.statusBadgeColor
      : "emerald",
    labelShipmentId: row.labelShipmentId,
    visibleFields,
    fieldLabels: {
      service: labels.service ?? "",
      estimatedDelivery: labels.estimatedDelivery ?? "",
      origin: labels.origin ?? "",
      destination: labels.destination ?? "",
    },
    showEventHistory: row.showEventHistory,
    labelEventHistory: row.labelEventHistory,
    timelineDotColor: row.timelineDotColor,
    fallbackEventLabel: row.fallbackEventLabel,
    showFooter: row.showFooter,
    footerText: row.footerText,
  };
}
