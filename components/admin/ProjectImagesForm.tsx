"use client";

import ImagePicker from "@/components/admin/ImagePicker";
import {
  PROJECT_IMAGE_SLOTS,
  createProjectId,
  defaultGallerySlots,
  defaultProjectSlots,
  toProjectImagesDraft,
  type ProjectImagesDraft,
  type ProjectImageSlot,
  type StoredProjectItem,
} from "@/lib/project-images";
import { Reorder, useDragControls } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const inputClass =
  "w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition-shadow placeholder:text-neutral-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-500/20";

function Dialog({
  title,
  body,
  confirmLabel,
  danger = false,
  onCancel,
  onConfirm,
  children,
}: {
  title: string;
  body: string;
  confirmLabel: string;
  danger?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  children?: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/40 px-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-dialog-title"
        className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl"
      >
        <h2 id="project-dialog-title" className="text-lg font-semibold text-neutral-950">
          {title}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-neutral-600">{body}</p>
        {children}
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full px-4 py-2.5 text-sm font-medium text-neutral-600 hover:text-neutral-950"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`rounded-full px-5 py-2.5 text-sm font-medium text-white ${
              danger ? "bg-red-700 hover:bg-red-800" : "bg-neutral-950 hover:bg-neutral-800"
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

function ProjectRow({
  project,
  index,
  active,
  onSelect,
  onRename,
}: {
  project: StoredProjectItem;
  index: number;
  active: boolean;
  onSelect: () => void;
  onRename: (title: string) => void;
}) {
  const controls = useDragControls();
  const inputRef = useRef<HTMLInputElement>(null);
  const cancelRef = useRef(false);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(project.title);

  useEffect(() => {
    if (!editing) setDraft(project.title);
  }, [editing, project.title]);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  function commit() {
    if (cancelRef.current) {
      cancelRef.current = false;
      return;
    }
    const next = draft.trim();
    setEditing(false);
    if (!next || next.length > 80 || next === project.title) {
      setDraft(project.title);
      return;
    }
    onRename(next);
  }

  function cancel() {
    cancelRef.current = true;
    setDraft(project.title);
    setEditing(false);
  }

  return (
    <Reorder.Item
      value={project}
      dragListener={false}
      dragControls={controls}
      className={`flex items-center gap-1 rounded-xl px-2 py-2 text-sm ${
        active
          ? "bg-white font-medium text-neutral-950 shadow-sm ring-1 ring-neutral-200"
          : "text-neutral-600 hover:bg-white/70 hover:text-neutral-950"
      }`}
    >
      <button
        type="button"
        aria-label={`Drag ${project.title}`}
        className="cursor-grab rounded-lg px-1 py-1 text-neutral-400 hover:text-neutral-700 active:cursor-grabbing"
        onPointerDown={(event) => controls.start(event)}
      >
        <span className="material-symbols-outlined text-base">drag_indicator</span>
      </button>
      <span className="w-6 shrink-0 text-xs text-neutral-400">
        {String(index + 1).padStart(2, "0")}
      </span>
      {editing ? (
        <input
          ref={inputRef}
          value={draft}
          aria-label="Project name"
          onChange={(event) => setDraft(event.target.value)}
          onBlur={commit}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              event.currentTarget.blur();
            }
            if (event.key === "Escape") cancel();
          }}
          className="min-w-0 flex-1 rounded-lg border border-neutral-200 bg-white px-2 py-1 text-sm text-neutral-950 outline-none focus:border-orange-400"
        />
      ) : (
        <button
          type="button"
          onClick={onSelect}
          onDoubleClick={() => {
            setDraft(project.title);
            setEditing(true);
          }}
          className="min-w-0 flex-1 truncate py-1 text-left"
        >
          {project.title}
        </button>
      )}
    </Reorder.Item>
  );
}

export default function ProjectImagesForm({
  initial,
  library,
}: {
  initial: ProjectImagesDraft;
  library: { src: string; label: string }[];
}) {
  const [projects, setProjects] = useState(initial);
  const [selectedId, setSelectedId] = useState(initial[0]?.id ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState("");
  const [addError, setAddError] = useState<string | null>(null);
  const [deleteStep, setDeleteStep] = useState<0 | 1 | 2>(0);

  const selected = projects.find((project) => project.id === selectedId) ?? projects[0];

  function markDirty() {
    setSaved(false);
  }

  function updateSlot(index: number, patch: Partial<ProjectImageSlot>) {
    if (!selected) return;
    markDirty();
    setProjects((current) =>
      current.map((project) =>
        project.id === selected.id
          ? {
              ...project,
              images: project.images.map((image, imageIndex) =>
                imageIndex === index ? { ...image, ...patch } : image
              ),
            }
          : project
      )
    );
  }

  function resetSelected() {
    if (!selected) return;
    markDirty();
    const images = defaultProjectSlots(selected.id);
    setProjects((current) =>
      current.map((project) =>
        project.id === selected.id ? { ...project, images } : project
      )
    );
  }

  function addProject() {
    const title = newName.trim();
    if (!title || title.length > 80) {
      setAddError("Enter a project name up to 80 characters.");
      return;
    }
    const project = {
      id: createProjectId(title, projects.map((item) => item.id)),
      title,
      images: defaultGallerySlots(),
    };
    setProjects((current) => [...current, project]);
    setSelectedId(project.id);
    setNewName("");
    setAddError(null);
    setAdding(false);
    markDirty();
  }

  function renameProject(id: string, title: string) {
    markDirty();
    setProjects((current) =>
      current.map((project) => (project.id === id ? { ...project, title } : project))
    );
  }

  function removeSelected() {
    if (!selected || projects.length <= 1) return;
    const index = projects.findIndex((project) => project.id === selected.id);
    const next = projects.filter((project) => project.id !== selected.id);
    setProjects(next);
    setSelectedId(next[Math.max(0, index - 1)].id);
    setDeleteStep(0);
    markDirty();
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setSaved(false);
    setSaving(true);

    try {
      const response = await fetch("/api/project-images", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projects }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(typeof data.error === "string" ? data.error : "Could not save images.");
        return;
      }
      setProjects(toProjectImagesDraft(data));
      setSaved(true);
    } catch {
      setError("Could not reach the server. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-6xl">
      <h1 className="text-xl font-semibold tracking-tight text-neutral-950">Project images</h1>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-600">
        Drag a project to change its order, and double-click its name to rename it. The first
        project is the featured card on the public page. Changes are kept when you save.
      </p>

      {adding ? (
        <Dialog
          title="Add project"
          body="Name the project. It starts with the default gallery, which you can change after adding it."
          confirmLabel="Add"
          onCancel={() => {
            setAdding(false);
            setAddError(null);
          }}
          onConfirm={addProject}
        >
          <label className="mt-4 block">
            <span className="mb-2 block text-sm font-medium text-neutral-800">Project name</span>
            <input
              autoFocus
              value={newName}
              onChange={(event) => setNewName(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  addProject();
                }
                if (event.key === "Escape") {
                  setAdding(false);
                  setAddError(null);
                }
              }}
              placeholder="Project name"
              className={inputClass}
            />
            {addError ? <span className="mt-2 block text-sm text-red-700">{addError}</span> : null}
          </label>
        </Dialog>
      ) : null}

      {deleteStep === 1 && selected ? (
        <Dialog
          title={`Delete ${selected.title}?`}
          body="This takes the project off the list. You can still go back."
          confirmLabel="Continue"
          onCancel={() => setDeleteStep(0)}
          onConfirm={() => setDeleteStep(2)}
        />
      ) : null}
      {deleteStep === 2 && selected ? (
        <Dialog
          title="Delete permanently?"
          body={`${selected.title} will be removed from the public project page when you save.`}
          confirmLabel="Delete project"
          danger
          onCancel={() => setDeleteStep(0)}
          onConfirm={removeSelected}
        />
      ) : null}

      <form onSubmit={handleSubmit} className="mt-8 grid gap-6 lg:grid-cols-[16rem_minmax(0,1fr)]">
        <div>
          <Reorder.Group
            axis="y"
            values={projects}
            onReorder={(next) => {
              markDirty();
              setProjects(next);
            }}
            className="flex flex-col gap-2"
          >
            {projects.map((project, index) => (
              <ProjectRow
                key={project.id}
                project={project}
                index={index}
                active={project.id === selected?.id}
                onSelect={() => setSelectedId(project.id)}
                onRename={(title) => renameProject(project.id, title)}
              />
            ))}
          </Reorder.Group>
          <button
            type="button"
            aria-label="Add project"
            onClick={() => {
              setNewName("");
              setAddError(null);
              setAdding(true);
            }}
            className="mt-3 flex h-10 w-10 items-center justify-center rounded-full bg-neutral-950 text-white hover:bg-neutral-800"
          >
            <span className="material-symbols-outlined text-xl">add</span>
          </button>
        </div>

        {selected ? (
          <div className="rounded-3xl border border-neutral-200/80 bg-white p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-lg font-semibold tracking-tight text-neutral-950">
                {selected.title}
              </h2>
              <button
                type="button"
                onClick={resetSelected}
                className="text-sm font-medium text-neutral-600 hover:text-neutral-950"
              >
                Reset images
              </button>
            </div>

            <div className="mt-6 space-y-6">
              {selected.images.map((image, index) => {
                const slot = PROJECT_IMAGE_SLOTS[index];
                return (
                  <div
                    key={`${selected.id}-${index}`}
                    className="grid gap-4 border-t border-neutral-100 pt-6 first:border-t-0 first:pt-0 sm:grid-cols-[9rem_minmax(0,1fr)]"
                  >
                    <div
                      className={`relative overflow-hidden rounded-xl bg-neutral-100 ${
                        slot.shape === "Wide" ? "aspect-video" : "aspect-square"
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={image.src} alt="" className="h-full w-full object-cover" />
                    </div>
                    <div className="space-y-3">
                      <p className="text-sm font-medium text-neutral-800">
                        {slot.label}
                        <span className="ml-2 text-xs font-normal text-neutral-500">
                          {slot.shape}
                        </span>
                      </p>
                      <ImagePicker
                        label="Site image"
                        value={image.src}
                        options={library}
                        onChange={(src) => updateSlot(index, { src })}
                      />
                      <label className="block">
                        <span className="mb-2 block text-xs font-medium text-neutral-600">
                          Description
                        </span>
                        <input
                          value={image.alt}
                          onChange={(event) => updateSlot(index, { alt: event.target.value })}
                          className={inputClass}
                        />
                      </label>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}

        <div className="lg:col-start-2">
          {error ? (
            <p className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
          ) : null}
          {saved ? (
            <p className="mb-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
              Saved. The project page will use this list.
            </p>
          ) : null}
          <div className="flex flex-wrap justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                if (projects.length <= 1) {
                  setError("Keep at least one project.");
                  return;
                }
                setError(null);
                setDeleteStep(1);
              }}
              disabled={saving || projects.length <= 1}
              className="rounded-full border border-red-200 px-5 py-3.5 text-sm font-medium text-red-700 transition-colors hover:bg-red-50 disabled:opacity-50"
            >
              Delete project
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-full bg-neutral-950 px-8 py-3.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800 disabled:opacity-60"
            >
              {saving ? "Saving…" : "Save images"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
