export type ContainerStatus =
  | "in-transit"
  | "at-port"
  | "customs"
  | "delivered"
  | "delayed";

export type FleetStatus = "active" | "idle" | "maintenance" | "offline";

export interface Container {
  id: string;
  containerNumber: string;
  type: string;
  origin: string;
  destination: string;
  status: ContainerStatus;
  eta: string;
  weight: number;
  carrier: string;
  lastUpdate: string;
  progress: number;
}

export interface Vehicle {
  id: string;
  name: string;
  type: string;
  driver: string;
  location: string;
  coordinates: { lat: number; lng: number };
  status: FleetStatus;
  speed: number;
  fuel: number;
  cargo: string;
  lastPing: string;
}

export interface PricingInput {
  cargoWeight: number;
  cargoVolume: number;
  distance: number;
  origin: string;
  destination: string;
  cargoType: string;
  urgency: "standard" | "express" | "critical";
  insurance: boolean;
  customsClearance: boolean;
}

export interface PricingResult {
  baseRate: number;
  fuelSurcharge: number;
  handlingFee: number;
  insuranceFee: number;
  customsFee: number;
  urgencyMultiplier: number;
  totalEstimate: number;
  riskScore: number;
  breakdown: { label: string; amount: number }[];
}
