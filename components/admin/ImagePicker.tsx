"use client";

import { useId, useMemo, useState } from "react";

const inputClass =
  "w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition-shadow placeholder:text-neutral-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-500/20";

export default function ImagePicker({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { src: string; label: string }[];
  onChange: (src: string) => void;
}) {
  const listId = useId();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const selected = options.find((option) => option.src === value);
  const selectedLabel = selected?.label ?? value.split("/").pop() ?? "";

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return options;
    return options.filter((option) => option.label.toLowerCase().includes(needle));
  }, [options, query]);

  function choose(src: string) {
    onChange(src);
    setQuery("");
    setOpen(false);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setOpen(true);
      setActiveIndex((index) => Math.min(index + 1, Math.max(filtered.length - 1, 0)));
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setOpen(true);
      setActiveIndex((index) => Math.max(index - 1, 0));
      return;
    }
    if (event.key === "Enter") {
      event.preventDefault();
      const match = filtered[activeIndex];
      if (open && match) choose(match.src);
      return;
    }
    if (event.key === "Escape") {
      setOpen(false);
      setQuery("");
    }
  }

  return (
    <div className="relative">
      <label className="block">
        <span className="mb-2 block text-xs font-medium text-neutral-600">{label}</span>
        <input
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          value={open ? query : selectedLabel}
          placeholder="Type a file name"
          onFocus={() => {
            setOpen(true);
            setQuery("");
            setActiveIndex(0);
          }}
          onBlur={() => {
            window.setTimeout(() => {
              setOpen(false);
              setQuery("");
            }, 120);
          }}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
            setActiveIndex(0);
          }}
          onKeyDown={handleKeyDown}
          className={inputClass}
        />
      </label>
      {open ? (
        <ul
          id={listId}
          role="listbox"
          className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-xl border border-neutral-200 bg-white py-1 shadow-lg"
        >
          {filtered.length === 0 ? (
            <li className="px-4 py-2.5 text-sm text-neutral-500">No images match that name.</li>
          ) : (
            filtered.map((option, index) => (
              <li key={option.src} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={option.src === value}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => choose(option.src)}
                  className={`block w-full px-4 py-2.5 text-left text-sm ${
                    index === activeIndex
                      ? "bg-neutral-100 text-neutral-950"
                      : "text-neutral-700 hover:bg-neutral-50"
                  }`}
                >
                  {option.label}
                </button>
              </li>
            ))
          )}
        </ul>
      ) : null}
    </div>
  );
}
