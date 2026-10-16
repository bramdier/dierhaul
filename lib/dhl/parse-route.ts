/** Best-effort mapping from free-text "City, CC" fields to DHL address parts. */
export function parseLocationLabel(label: string): {
  cityName: string;
  countryCode: string;
  postalCode: string;
} {
  const trimmed = label.trim();
  const parts = trimmed.split(",").map((part) => part.trim());
  const countryCode =
    parts.length > 1 ? parts[parts.length - 1].slice(0, 2).toUpperCase() : "US";
  const cityName = parts.length > 1 ? parts.slice(0, -1).join(", ") : trimmed;

  return {
    cityName: cityName || "Unknown",
    countryCode: countryCode.length === 2 ? countryCode : "US",
    postalCode: "00000",
  };
}

export function tonnesToKg(tonnes: number) {
  return Math.max(0.1, tonnes * 1000);
}

export function volumeToCmDimensions(volumeM3: number) {
  const side = Math.cbrt(Math.max(volumeM3, 0.01)) * 100;
  const rounded = Math.round(side);
  return { lengthCm: rounded, widthCm: rounded, heightCm: rounded };
}
