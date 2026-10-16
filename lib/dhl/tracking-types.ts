export type TrackingEvent = {
  timestamp?: string;
  location?: string;
  description?: string;
  statusCode?: string;
};

export type TrackingShipment = {
  id: string;
  status?: string;
  statusDetail?: string;
  estimatedDelivery?: string;
  origin?: string;
  destination?: string;
  service?: string;
  events: TrackingEvent[];
};

export type TrackingResponse = {
  configured: boolean;
  source: "dhl" | "unconfigured" | "error" | "not_found";
  message?: string;
  shipments?: TrackingShipment[];
};
