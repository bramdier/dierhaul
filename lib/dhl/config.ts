import "server-only";

const DEFAULT_TEST_BASE = "https://express.api.dhl.com/mydhlapi/test";

export function getDhlConfig() {
  const apiKey = process.env.DHL_API_KEY;
  const apiSecret = process.env.DHL_API_SECRET;
  const accountNumber = process.env.DHL_ACCOUNT_NUMBER;
  const baseUrl = (
    process.env.DHL_API_BASE_URL ?? DEFAULT_TEST_BASE
  ).replace(/\/$/, "");

  return {
    apiKey,
    apiSecret,
    accountNumber,
    baseUrl,
    isConfigured: Boolean(apiKey && apiSecret && accountNumber),
  };
}

export function getDhlAuthHeader(apiKey: string, apiSecret: string) {
  const token = Buffer.from(`${apiKey}:${apiSecret}`).toString("base64");
  return `Basic ${token}`;
}
