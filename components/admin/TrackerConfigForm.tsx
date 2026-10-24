"use client";

import {
  FIELD_LABEL_DEFAULTS,
  STATUS_BADGE_COLORS,
  TRACKER_FIELD_KEYS,
  toTrackerConfigDraft,
  type TrackerConfigDraft,
  type TrackerFieldKey,
} from "@/lib/tracker-config-draft";
import { useState } from "react";

const inputClass =
  "w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition-shadow placeholder:text-neutral-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-500/20";

function TextField({
  id,
  label,
  value,
  onChange,
  hint,
  multiline = false,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  multiline?: boolean;
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="mb-2 block text-sm font-medium text-neutral-800">{label}</span>
      {multiline ? (
        <textarea
          id={id}
          value={value}
          rows={3}
          onChange={(event) => onChange(event.target.value)}
          className={inputClass}
        />
      ) : (
        <input
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={inputClass}
        />
      )}
      {hint ? <span className="mt-2 block text-xs text-neutral-500">{hint}</span> : null}
    </label>
  );
}

function Toggle({
  id,
  label,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label htmlFor={id} className="flex items-center gap-3 text-sm text-neutral-800">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="size-4 accent-neutral-950"
      />
      {label}
    </label>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-neutral-200/80 bg-white p-6 sm:p-8">
      <h2 className="text-lg font-semibold tracking-tight text-neutral-950">{title}</h2>
      <div className="mt-6 space-y-5">{children}</div>
    </section>
  );
}

export default function TrackerConfigForm({
  initial,
}: {
  initial: TrackerConfigDraft;
}) {
  const [draft, setDraft] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  function setField<K extends keyof TrackerConfigDraft>(key: K, value: TrackerConfigDraft[K]) {
    setSaved(false);
    setDraft((current) => ({ ...current, [key]: value }));
  }

  function toggleVisibleField(key: TrackerFieldKey, checked: boolean) {
    setSaved(false);
    setDraft((current) => {
      const visibleFields = checked
        ? [...current.visibleFields, key]
        : current.visibleFields.filter((field) => field !== key);
      return { ...current, visibleFields };
    });
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setSaved(false);
    setSaving(true);

    try {
      const response = await fetch("/api/tracker-config", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(typeof data.error === "string" ? data.error : "Could not save settings.");
        return;
      }
      setDraft(toTrackerConfigDraft(data));
      setSaved(true);
    } catch {
      setError("Could not reach the server. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-3xl">
      <h1 className="text-xl font-semibold tracking-tight text-neutral-950">
        Tracker settings
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-neutral-600">
        These labels and options appear on the public shipment tracker.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <Section title="Branding">
          <TextField
            id="page-title"
            label="Page title"
            value={draft.pageTitle}
            onChange={(value) => setField("pageTitle", value)}
          />
          <TextField
            id="page-subtitle"
            label="Subtitle"
            value={draft.pageSubtitle}
            onChange={(value) => setField("pageSubtitle", value)}
            multiline
          />
          <TextField
            id="product-name"
            label="Product name"
            value={draft.productName}
            onChange={(value) => setField("productName", value)}
            hint="Shown in bold at the end of the subtitle."
          />
          <TextField
            id="logo-url"
            label="Logo URL"
            value={draft.logoUrl}
            onChange={(value) => setField("logoUrl", value)}
            hint="Leave blank to use the built-in DHL logo."
          />
        </Section>

        <Section title="Search form">
          <div className="grid gap-5 sm:grid-cols-2">
            <TextField
              id="label-tracking"
              label="Tracking number label"
              value={draft.labelTrackingNumber}
              onChange={(value) => setField("labelTrackingNumber", value)}
            />
            <TextField
              id="placeholder-tracking"
              label="Tracking number placeholder"
              value={draft.placeholderTrackingNumber}
              onChange={(value) => setField("placeholderTrackingNumber", value)}
            />
          </div>
          <Toggle
            id="show-origin"
            label="Show origin country field"
            checked={draft.showOriginField}
            onChange={(checked) => setField("showOriginField", checked)}
          />
          {draft.showOriginField ? (
            <div className="grid gap-5 sm:grid-cols-2">
              <TextField
                id="label-origin"
                label="Origin country label"
                value={draft.labelOriginCountry}
                onChange={(value) => setField("labelOriginCountry", value)}
              />
              <TextField
                id="placeholder-origin"
                label="Origin country placeholder"
                value={draft.placeholderOriginCountry}
                onChange={(value) => setField("placeholderOriginCountry", value)}
              />
            </div>
          ) : null}
          <Toggle
            id="show-postal"
            label="Show recipient postal code field"
            checked={draft.showPostalField}
            onChange={(checked) => setField("showPostalField", checked)}
          />
          {draft.showPostalField ? (
            <div className="grid gap-5 sm:grid-cols-2">
              <TextField
                id="label-postal"
                label="Postal code label"
                value={draft.labelPostalCode}
                onChange={(value) => setField("labelPostalCode", value)}
              />
              <TextField
                id="placeholder-postal"
                label="Postal code placeholder"
                value={draft.placeholderPostalCode}
                onChange={(value) => setField("placeholderPostalCode", value)}
              />
            </div>
          ) : null}
          <div className="grid gap-5 sm:grid-cols-2">
            <TextField
              id="button-label"
              label="Button label"
              value={draft.buttonLabel}
              onChange={(value) => setField("buttonLabel", value)}
            />
            <TextField
              id="button-loading"
              label="Button label while tracking"
              value={draft.buttonLoadingLabel}
              onChange={(value) => setField("buttonLoadingLabel", value)}
            />
          </div>
        </Section>

        <Section title="Result card">
          <Toggle
            id="show-status"
            label="Show status badge"
            checked={draft.showStatusBadge}
            onChange={(checked) => setField("showStatusBadge", checked)}
          />
          <label htmlFor="badge-color" className="block">
            <span className="mb-2 block text-sm font-medium text-neutral-800">
              Status badge color
            </span>
            <select
              id="badge-color"
              value={draft.statusBadgeColor}
              onChange={(event) =>
                setField(
                  "statusBadgeColor",
                  event.target.value as TrackerConfigDraft["statusBadgeColor"]
                )
              }
              className={inputClass}
            >
              {STATUS_BADGE_COLORS.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>
          </label>
          <TextField
            id="label-shipment"
            label="Shipment id label"
            value={draft.labelShipmentId}
            onChange={(value) => setField("labelShipmentId", value)}
          />
          <fieldset>
            <legend className="mb-3 text-sm font-medium text-neutral-800">
              Fields to show
            </legend>
            <div className="grid gap-3 sm:grid-cols-2">
              {TRACKER_FIELD_KEYS.map((key) => (
                <Toggle
                  key={key}
                  id={`visible-${key}`}
                  label={FIELD_LABEL_DEFAULTS[key]}
                  checked={draft.visibleFields.includes(key)}
                  onChange={(checked) => toggleVisibleField(key, checked)}
                />
              ))}
            </div>
          </fieldset>
          <div className="grid gap-5 sm:grid-cols-2">
            {TRACKER_FIELD_KEYS.map((key) => (
              <TextField
                key={key}
                id={`label-${key}`}
                label={`${FIELD_LABEL_DEFAULTS[key]} label`}
                value={draft.fieldLabels[key]}
                onChange={(value) =>
                  setField("fieldLabels", { ...draft.fieldLabels, [key]: value })
                }
                hint="Blank uses the default label."
              />
            ))}
          </div>
        </Section>

        <Section title="Event history">
          <Toggle
            id="show-events"
            label="Show event history"
            checked={draft.showEventHistory}
            onChange={(checked) => setField("showEventHistory", checked)}
          />
          <TextField
            id="label-events"
            label="Section heading"
            value={draft.labelEventHistory}
            onChange={(value) => setField("labelEventHistory", value)}
          />
          <TextField
            id="dot-color"
            label="Timeline dot color"
            value={draft.timelineDotColor}
            onChange={(value) => setField("timelineDotColor", value)}
            hint="Tailwind background class, for example bg-neutral-400."
          />
          <TextField
            id="fallback-event"
            label="Fallback event label"
            value={draft.fallbackEventLabel}
            onChange={(value) => setField("fallbackEventLabel", value)}
            hint="Used when an event has no description."
          />
        </Section>

        <Section title="Footer">
          <Toggle
            id="show-footer"
            label="Show footer"
            checked={draft.showFooter}
            onChange={(checked) => setField("showFooter", checked)}
          />
          <TextField
            id="footer-text"
            label="Footer text"
            value={draft.footerText}
            onChange={(value) => setField("footerText", value)}
            multiline
          />
        </Section>

        {error ? (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
        ) : null}
        {saved ? (
          <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            Saved. The public tracker will use these settings.
          </p>
        ) : null}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="rounded-full bg-neutral-950 px-8 py-3.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800 disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save settings"}
          </button>
        </div>
      </form>
    </div>
  );
}
