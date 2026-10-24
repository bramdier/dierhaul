import { mkdir, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

export type ImageLibraryItem = {
  src: string;
  label: string;
};

const IMAGE_NAME = /\.(jpe?g|png|webp|gif)$/i;
const MAX_BYTES = 8 * 1024 * 1024;

export class ImagePoolError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

function imagesRoot() {
  return path.join(process.cwd(), "public", "images");
}

function poolDirectory() {
  return path.join(imagesRoot(), "pool");
}

function withUniqueLabels(items: ImageLibraryItem[]) {
  const counts = new Map<string, number>();
  for (const item of items) {
    counts.set(item.label, (counts.get(item.label) ?? 0) + 1);
  }
  return items.map((item) => {
    if ((counts.get(item.label) ?? 0) < 2) return item;
    return { ...item, label: item.src.replace(/^\/images\//, "") };
  });
}

async function readImageDir(dir: string, prefix: string) {
  const items: ImageLibraryItem[] = [];
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return items;
  }

  for (const entry of entries) {
    if (entry.name.startsWith(".")) continue;
    if (entry.isDirectory()) {
      items.push(...(await readImageDir(path.join(dir, entry.name), `${prefix}${entry.name}/`)));
      continue;
    }
    if (!IMAGE_NAME.test(entry.name)) continue;
    items.push({
      src: `/images/${prefix}${entry.name}`,
      label: entry.name,
    });
  }

  return items;
}

export async function listImageLibrary(): Promise<ImageLibraryItem[]> {
  const items = await readImageDir(imagesRoot(), "");
  items.sort((a, b) => a.label.localeCompare(b.label));
  return withUniqueLabels(items);
}

export async function listPooledImages(): Promise<ImageLibraryItem[]> {
  await mkdir(poolDirectory(), { recursive: true });
  const items = await readImageDir(poolDirectory(), "pool/");
  items.sort((a, b) => a.label.localeCompare(b.label));
  return items;
}

export function pooledFileBase(name: string) {
  const base = name.trim().replace(/\.[a-z0-9]+$/i, "").replace(/\s+/g, "-");
  if (!/^[A-Za-z0-9][A-Za-z0-9_-]{0,80}$/.test(base)) return null;
  return base;
}

function imageExtension(bytes: Buffer) {
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return "jpg";
  }
  if (
    bytes.length >= 8 &&
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47
  ) {
    return "png";
  }
  const head = bytes.subarray(0, 6).toString("ascii");
  if (head === "GIF89a" || head === "GIF87a") return "gif";
  if (
    bytes.length >= 12 &&
    bytes.subarray(0, 4).toString("ascii") === "RIFF" &&
    bytes.subarray(8, 12).toString("ascii") === "WEBP"
  ) {
    return "webp";
  }
  return null;
}

export async function savePooledImage(name: string, bytes: Buffer) {
  if (bytes.length === 0 || bytes.length > MAX_BYTES) {
    throw new ImagePoolError("Image must be 8 MB or smaller.", 400);
  }

  const base = pooledFileBase(name);
  if (!base) {
    throw new ImagePoolError(
      "Use letters, numbers, dashes, or underscores for the file name.",
      400
    );
  }

  const extension = imageExtension(bytes);
  if (!extension) {
    throw new ImagePoolError("Upload a JPG, PNG, GIF, or WebP image.", 400);
  }

  const dir = poolDirectory();
  await mkdir(dir, { recursive: true });
  const filename = `${base}.${extension}`;
  const target = path.resolve(dir, filename);
  if (!target.startsWith(`${path.resolve(dir)}${path.sep}`)) {
    throw new ImagePoolError("Invalid file name.", 400);
  }

  try {
    await writeFile(target, bytes, { flag: "wx" });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "EEXIST") {
      throw new ImagePoolError("A file with that name already exists.", 409);
    }
    throw error;
  }

  return { src: `/images/pool/${filename}`, label: filename };
}
