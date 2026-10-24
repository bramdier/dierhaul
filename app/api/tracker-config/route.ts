import { getSession } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { trackerConfig, type TrackerConfig } from "@/lib/db/schema";
import {
  STATUS_BADGE_COLORS,
  TRACKER_FIELD_KEYS,
  type StatusBadgeColor,
  type TrackerFieldKey,
} from "@/lib/tracker-config-draft";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

const DEFAULT_SLUG = "default";

// GET /api/tracker-config?slug=default
// Returns the config row, creating a default one if it doesn't exist yet.
export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug") ?? DEFAULT_SLUG;

  let [row] = await db
    .select()
    .from(trackerConfig)
    .where(eq(trackerConfig.slug, slug))
    .limit(1);

  if (!row) {
    [row] = await db
      .insert(trackerConfig)
      .values({ slug })
      .returning();
  }

  return NextResponse.json(row);
}

const TEXT_FIELDS = [
  "pageTitle",
  "pageSubtitle",
  "productName",
  "labelTrackingNumber",
  "placeholderTrackingNumber",
  "labelOriginCountry",
  "placeholderOriginCountry",
  "labelPostalCode",
  "placeholderPostalCode",
  "buttonLabel",
  "buttonLoadingLabel",
  "labelShipmentId",
  "labelEventHistory",
  "fallbackEventLabel",
  "footerText",
] as const satisfies ReadonlyArray<keyof TrackerConfig>;

const REQUIRED_TEXT_FIELDS = new Set<string>([
  "pageTitle",
  "productName",
  "buttonLabel",
  "buttonLoadingLabel",
]);

const BOOL_FIELDS = [
  "showOriginField",
  "showPostalField",
  "showStatusBadge",
  "showEventHistory",
  "showFooter",
] as const satisfies ReadonlyArray<keyof TrackerConfig>;

type TrackerUpdate = Partial<
  Omit<TrackerConfig, "id" | "slug" | "createdAt" | "updatedAt">
>;

function readUpdates(body: Record<string, unknown>): TrackerUpdate | string {
  const updates: TrackerUpdate = {};

  for (const key of TEXT_FIELDS) {
    if (!(key in body)) continue;
    const value = body[key];
    if (typeof value !== "string") return `${key} must be a string.`;
    const trimmed = value.trim();
    if (!trimmed && REQUIRED_TEXT_FIELDS.has(key)) {
      return `${key} is required.`;
    }
    if (trimmed.length > 2000) return `${key} is too long.`;
    updates[key] = trimmed;
  }

  if ("logoUrl" in body) {
    const value = body.logoUrl;
    if (value !== null && typeof value !== "string") {
      return "logoUrl must be a string or null.";
    }
    const trimmed = typeof value === "string" ? value.trim() : "";
    if (trimmed.length > 2000) return "logoUrl is too long.";
    updates.logoUrl = trimmed || null;
  }

  if ("statusBadgeColor" in body) {
    const value = body.statusBadgeColor;
    if (typeof value !== "string" || !STATUS_BADGE_COLORS.includes(value as StatusBadgeColor)) {
      return `statusBadgeColor must be one of: ${STATUS_BADGE_COLORS.join(", ")}.`;
    }
    updates.statusBadgeColor = value;
  }

  if ("timelineDotColor" in body) {
    const value = body.timelineDotColor;
    if (typeof value !== "string" || !/^bg-[a-z0-9./:-]+$/i.test(value.trim())) {
      return "timelineDotColor must be a Tailwind background class such as bg-neutral-400.";
    }
    updates.timelineDotColor = value.trim();
  }

  for (const key of BOOL_FIELDS) {
    if (!(key in body)) continue;
    if (typeof body[key] !== "boolean") return `${key} must be true or false.`;
    updates[key] = body[key];
  }

  if ("visibleFields" in body) {
    const value = body.visibleFields;
    if (!Array.isArray(value)) return "visibleFields must be an array.";
    const fields: TrackerFieldKey[] = [];
    for (const item of value) {
      if (
        typeof item !== "string" ||
        !TRACKER_FIELD_KEYS.includes(item as TrackerFieldKey)
      ) {
        return `visibleFields entries must be one of: ${TRACKER_FIELD_KEYS.join(", ")}.`;
      }
      if (!fields.includes(item as TrackerFieldKey)) fields.push(item as TrackerFieldKey);
    }
    updates.visibleFields = fields;
  }

  if ("fieldLabels" in body) {
    const value = body.fieldLabels;
    if (!value || typeof value !== "object" || Array.isArray(value)) {
      return "fieldLabels must be an object.";
    }
    const labels: Record<string, string> = {};
    for (const key of TRACKER_FIELD_KEYS) {
      const label = (value as Record<string, unknown>)[key];
      if (label == null || label === "") continue;
      if (typeof label !== "string") return `fieldLabels.${key} must be a string.`;
      const trimmed = label.trim();
      if (!trimmed) continue;
      if (trimmed.length > 80) return `fieldLabels.${key} is too long.`;
      labels[key] = trimmed;
    }
    updates.fieldLabels = labels;
  }

  if (Object.keys(updates).length === 0) return "No valid fields to update.";
  return updates;
}

// PATCH /api/tracker-config?slug=default
// Body: tracker settings to save. Requires an admin session.
export async function PATCH(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const slug = req.nextUrl.searchParams.get("slug") ?? DEFAULT_SLUG;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ error: "Expected an object." }, { status: 400 });
  }

  const updates = readUpdates(body as Record<string, unknown>);
  if (typeof updates === "string") {
    return NextResponse.json({ error: updates }, { status: 400 });
  }

  const [row] = await db
    .update(trackerConfig)
    .set({ ...updates, updatedAt: new Date() })
    .where(eq(trackerConfig.slug, slug))
    .returning();

  if (!row) {
    return NextResponse.json({ error: "Config not found" }, { status: 404 });
  }

  return NextResponse.json(row);
}
