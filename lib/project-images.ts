import { projectContent, type ProjectItem } from "@/lib/project-content";

export const PROJECT_IMAGE_SLOTS = [
  { label: "Top wide image", shape: "Wide" },
  { label: "Upper left", shape: "Square" },
  { label: "Upper right", shape: "Square" },
  { label: "Lower left", shape: "Square" },
  { label: "Lower right", shape: "Square" },
  { label: "Bottom wide image", shape: "Wide" },
] as const;

const SLOT_RATIOS = ["wide", "square", "square", "square", "square", "wide"] as const;

export type ProjectImageSlot = {
  src: string;
  alt: string;
};

export type StoredProjectImages = Record<string, ProjectImageSlot[]>;

export type StoredProjectItem = {
  id: string;
  title: string;
  images: ProjectImageSlot[];
};

export type ProjectImagesDraft = StoredProjectItem[];

export type ProjectConfigSource = {
  images?: StoredProjectImages | null;
  items?: StoredProjectItem[] | null;
};

const NEW_PROJECT_COPY = {
  context: "A logistics project on Dierhaul.",
  outcome: "Visible progress for the team",
  developer: "Dierhaul Engineering",
  dateCreated: "2026",
};

export const DEFAULT_PROJECT_IMAGE: ProjectImageSlot = {
  src: "/images/project-placeholder.jpg",
  alt: "Project image",
};

export function defaultGallerySlots(): ProjectImageSlot[] {
  return PROJECT_IMAGE_SLOTS.map(() => ({ ...DEFAULT_PROJECT_IMAGE }));
}

export function defaultProjectSlots(_projectId?: string): ProjectImageSlot[] {
  return defaultGallerySlots();
}

export function createProjectId(title: string, existingIds: string[]) {
  const base =
    title
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 48) || "project";
  const taken = new Set(existingIds);
  let id = base;
  let suffix = 2;
  while (taken.has(id)) {
    id = `${base}-${suffix}`;
    suffix += 1;
  }
  return id;
}

function normalizeSlots(
  images: ProjectImageSlot[] | undefined,
  fallback: ProjectImageSlot[]
): ProjectImageSlot[] {
  return PROJECT_IMAGE_SLOTS.map((_, index) => {
    const slot = images?.[index];
    const base = fallback[index] ?? fallback[0];
    return {
      src: slot?.src?.trim() || base.src,
      alt: slot?.alt?.trim() || base.alt,
    };
  });
}

export function toProjectImagesDraft(
  source: ProjectConfigSource | null | undefined
): ProjectImagesDraft {
  if (source?.items && source.items.length > 0) {
    return source.items.map((item) => ({
      id: item.id,
      title: item.title,
      images: normalizeSlots(item.images, defaultProjectSlots(item.id)),
    }));
  }

  return projectContent.items.map((item) => ({
    id: item.id,
    title: item.title,
    images: normalizeSlots(source?.images?.[item.id], defaultProjectSlots(item.id)),
  }));
}

export function applyStoredProjects(
  source: ProjectConfigSource | null | undefined
): ProjectItem[] {
  return toProjectImagesDraft(source).map((item) => {
    const known = projectContent.items.find((entry) => entry.id === item.id);
    return {
      id: item.id,
      title: item.title,
      context: known?.context ?? NEW_PROJECT_COPY.context,
      outcome: known?.outcome ?? NEW_PROJECT_COPY.outcome,
      developer: known?.developer ?? NEW_PROJECT_COPY.developer,
      dateCreated: known?.dateCreated ?? NEW_PROJECT_COPY.dateCreated,
      highlighted: known?.highlighted,
      href: known?.href,
      cta: known?.cta,
      images: item.images.map((image, index) => ({
        src: image.src,
        alt: image.alt,
        ratio: known?.images[index]?.ratio ?? SLOT_RATIOS[index],
      })),
    };
  });
}
