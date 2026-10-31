export function isMissingRelation(error: unknown): boolean {
  const seen = new Set<unknown>();
  let current: unknown = error;

  while (current && typeof current === "object" && !seen.has(current)) {
    seen.add(current);
    const record = current as {
      code?: unknown;
      routine?: unknown;
      message?: unknown;
      cause?: unknown;
    };

    if (record.code === "42P01" || record.routine === "parserOpenTable") {
      return true;
    }

    if (
      typeof record.message === "string" &&
      /relation ["'].+["'] does not exist/i.test(record.message)
    ) {
      return true;
    }

    current = record.cause;
  }

  return false;
}
