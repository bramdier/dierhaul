import TrackerConfigForm from "@/components/admin/TrackerConfigForm";
import { db } from "@/lib/db";
import { trackerConfig } from "@/lib/db/schema";
import { toTrackerConfigDraft } from "@/lib/tracker-config-draft";
import { eq } from "drizzle-orm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tracker settings | Dierhaul",
};

async function getConfig() {
  const slug = "default";
  let [row] = await db
    .select()
    .from(trackerConfig)
    .where(eq(trackerConfig.slug, slug))
    .limit(1);

  if (!row) {
    [row] = await db.insert(trackerConfig).values({ slug }).returning();
  }

  return row;
}

export default async function AdminTrackerPage() {
  const config = await getConfig();
  return <TrackerConfigForm initial={toTrackerConfigDraft(config)} />;
}
