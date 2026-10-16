export type DhlAddressInput = {
  postalCode: string;
  cityName: string;
  countryCode: string;
  addressLine1?: string;
};

export type DhlRatesRequestBody = {
  shipper: DhlAddressInput;
  receiver: DhlAddressInput;
  weightKg: number;
  lengthCm?: number;
  widthCm?: number;
  heightCm?: number;
  plannedShippingDate?: string;
};

export type DhlQuoteProduct = {
  productCode: string;
  productName: string;
  totalPrice: number;
  currency: string;
  deliveryTime?: string;
};

export type DhlQuoteResponse = {
  source: "dhl" | "unconfigured" | "error";
  configured: boolean;
  message?: string;
  products?: DhlQuoteProduct[];
};
