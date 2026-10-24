"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const inputClass =
  "w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition-shadow placeholder:text-neutral-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-500/20";

export default function ImagePoolManager({
  images,
}: {
  images: { src: string; label: string }[];
}) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileInputKey, setFileInputKey] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);

  function handleFile(next: File | null) {
    setFile(next);
    setSaved(null);
    setPreview((current) => {
      if (current) URL.revokeObjectURL(current);
      return next ? URL.createObjectURL(next) : null;
    });
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setSaved(null);

    if (!file) {
      setError("Choose an image to upload.");
      return;
    }

    const body = new FormData();
    body.set("name", name);
    body.set("file", file);
    setUploading(true);

    try {
      const response = await fetch("/api/image-pool", { method: "POST", body });
      const data = await response.json();
      if (!response.ok) {
        setError(typeof data.error === "string" ? data.error : "Could not upload the image.");
        return;
      }
      setSaved(typeof data.label === "string" ? data.label : name);
      setName("");
      handleFile(null);
      setFileInputKey((key) => key + 1);
      router.refresh();
    } catch {
      setError("Could not reach the server. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-5xl">
      <h1 className="text-xl font-semibold tracking-tight text-neutral-950">Image Pooling</h1>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-600">
        Upload an image and give it a file name. It is then available when you choose a site
        image for a project.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 rounded-3xl border border-neutral-200/80 bg-white p-6 sm:p-8"
      >
        <div className="grid gap-5 sm:grid-cols-[9rem_minmax(0,1fr)]">
          <div className="relative aspect-square overflow-hidden rounded-xl bg-neutral-100">
            {preview ? (
              // Local preview of the file chosen in this form.
              // eslint-disable-next-line @next/next/no-img-element
              <img src={preview} alt="" className="h-full w-full object-cover" />
            ) : (
              <span className="flex h-full items-center justify-center px-3 text-center text-xs text-neutral-400">
                Preview
              </span>
            )}
          </div>
          <div className="space-y-4">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-neutral-800">File name</span>
              <input
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="container-yard"
                className={inputClass}
              />
              <span className="mt-2 block text-xs text-neutral-500">
                Letters, numbers, dashes, or underscores. The image type is added for you.
              </span>
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-neutral-800">Image</span>
              <input
                key={fileInputKey}
                required
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={(event) => handleFile(event.target.files?.[0] ?? null)}
                className="block w-full text-sm text-neutral-700 file:mr-4 file:rounded-full file:border-0 file:bg-neutral-950 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white"
              />
            </label>
          </div>
        </div>

        {error ? (
          <p className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
        ) : null}
        {saved ? (
          <p className="mt-5 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            Saved as {saved}.
          </p>
        ) : null}

        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            disabled={uploading}
            className="rounded-full bg-neutral-950 px-8 py-3.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800 disabled:opacity-60"
          >
            {uploading ? "Uploading…" : "Upload image"}
          </button>
        </div>
      </form>

      <section className="mt-8">
        <h2 className="text-lg font-semibold tracking-tight text-neutral-950">Pooled images</h2>
        {images.length === 0 ? (
          <p className="mt-3 text-sm text-neutral-600">No images in the pool yet.</p>
        ) : (
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {images.map((image) => (
              <li
                key={image.src}
                className="overflow-hidden rounded-2xl border border-neutral-200/80 bg-white"
              >
                <div className="relative aspect-video bg-neutral-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={image.src} alt="" className="h-full w-full object-cover" />
                </div>
                <p className="truncate px-4 py-3 text-sm font-medium text-neutral-800">
                  {image.label}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
