import { pgTable, serial, text, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";

// One row per tenant/brand. Use `slug` as the lookup key (e.g. "default").
export const trackerConfig = pgTable("tracker_config", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),

  // --- Branding ---
  pageTitle: text("page_title").notNull().default("Track your shipment"),
  pageSubtitle: text("page_subtitle").notNull().default(
    "Live status, milestones, and delivery estimates via DHL Shipment Tracking – Unified."
  ),
  productName: text("product_name").notNull().default("Shipment Tracking – Unified"),
  logoUrl: text("logo_url"), // null → use built-in DhlLogo

  // --- Form ---
  labelTrackingNumber: text("label_tracking_number").notNull().default("Tracking number"),
  placeholderTrackingNumber: text("placeholder_tracking_number").notNull().default("e.g. 7777777770"),
  showOriginField: boolean("show_origin_field").notNull().default(true),
  labelOriginCountry: text("label_origin_country").notNull().default("Origin country (optional, ISO)"),
  placeholderOriginCountry: text("placeholder_origin_country").notNull().default("DE"),
  showPostalField: boolean("show_postal_field").notNull().default(true),
  labelPostalCode: text("label_postal_code").notNull().default("Recipient postal code (optional)"),
  placeholderPostalCode: text("placeholder_postal_code").notNull().default("10115"),
  buttonLabel: text("button_label").notNull().default("Track shipment"),
  buttonLoadingLabel: text("button_loading_label").notNull().default("Tracking…"),

  // --- Result card ---
  showStatusBadge: boolean("show_status_badge").notNull().default(true),
  statusBadgeColor: text("status_badge_color").notNull().default("emerald"),
  labelShipmentId: text("label_shipment_id").notNull().default("Shipment"),
  // Array of field keys to show: ["service","estimatedDelivery","origin","destination"]
  visibleFields: jsonb("visible_fields")
    .$type<("service" | "estimatedDelivery" | "origin" | "destination")[]>()
    .notNull()
    .default(["service", "estimatedDelivery", "origin", "destination"]),
  // Override display labels: { service: "Service", estimatedDelivery: "Est. delivery", ... }
  fieldLabels: jsonb("field_labels")
    .$type<Record<string, string>>()
    .notNull()
    .default({}),

  // --- Timeline ---
  showEventHistory: boolean("show_event_history").notNull().default(true),
  labelEventHistory: text("label_event_history").notNull().default("Event history"),
  timelineDotColor: text("timeline_dot_color").notNull().default("bg-neutral-400"),
  fallbackEventLabel: text("fallback_event_label").notNull().default("Update"),

  // --- Footer ---
  showFooter: boolean("show_footer").notNull().default(true),
  footerText: text("footer_text").notNull().default(
    "Tracking data is provided by DHL Shipment Tracking – Unified. Availability depends on carrier and product."
  ),

  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type TrackerConfig = typeof trackerConfig.$inferSelect;
export type NewTrackerConfig = typeof trackerConfig.$inferInsert;

// Image overrides plus the ordered project list for /project.
// `items` is null until the admin saves the list; until then the built-in projects are used.
export const projectConfig = pgTable("project_config", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  images: jsonb("images")
    .$type<Record<string, { src: string; alt: string }[]>>()
    .notNull()
    .default({}),
  items: jsonb("items").$type<
    { id: string; title: string; images: { src: string; alt: string }[] }[] | null
  >(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type ProjectConfig = typeof projectConfig.$inferSelect;
export type NewProjectConfig = typeof projectConfig.$inferInsert;
