export type TrackerContent = {
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
  showFooter: boolean;
  footerText: string;
};

export const trackerContent: TrackerContent = {
  pageTitle: "Track your shipment",
  pageSubtitle:
    "Live status, milestones, and delivery estimates via DHL Shipment Tracking – Unified.",
  productName: "Shipment Tracking – Unified",
  logoUrl: null,
  labelTrackingNumber: "Tracking number",
  placeholderTrackingNumber: "e.g. 7777777770",
  showOriginField: true,
  labelOriginCountry: "Origin country (optional, ISO)",
  placeholderOriginCountry: "DE",
  showPostalField: true,
  labelPostalCode: "Recipient postal code (optional)",
  placeholderPostalCode: "10115",
  buttonLabel: "Track shipment",
  showFooter: true,
  footerText:
    "Tracking data is provided by DHL Shipment Tracking – Unified. Availability depends on carrier and product.",
};
