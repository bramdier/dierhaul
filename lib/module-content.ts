export interface ModuleSlide {
  src: string;
  alt: string;
  caption: string;
}

export interface ModuleContent {
  title: string;
  subtitle: string;
  slides: ModuleSlide[];
  detailTitle: string;
  detailDescription: string;
  explanationTitle: string;
  explanationParagraphs: string[];
  highlights: { icon: string; title: string; description: string }[];
  demoSubject: string;
  demoMessage: string;
}

export const ctmsContent: ModuleContent = {
  title: "Container Tracking Management System",
  subtitle:
    "End-to-end visibility for every container across ports, carriers, and customs checkpoints.",
  slides: [
    {
      src: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=1200&q=80",
      alt: "Shipping containers stacked at a global port terminal",
      caption: "Global port operations with live container visibility",
    },
    {
      src: "https://images.unsplash.com/photo-1682562031271-94c870a5bc53?q=80",
      alt: "Container yard with organized freight units",
      caption: "Yard-level tracking across inbound and outbound flows",
    },
    {
      src: "https://images.unsplash.com/photo-1494412519320-aa613dfb7738?q=80",
      alt: "Cargo ship loaded with containers at sea",
      caption: "In-transit monitoring from departure to final delivery",
    },
  ],
  detailTitle: "Full Container Lifecycle Tracking",
  detailDescription:
    "CTMS gives logistics teams a single view of container status — from booking and port gate-in, through vessel transit and customs clearance, to final delivery. Every milestone is captured with timestamps, carrier data, and ETA predictions so your team can act before delays escalate.",
  explanationTitle: "Why CTMS Matters for Your Operations",
  explanationParagraphs: [
    "Managing containers across multiple carriers and ports often means juggling spreadsheets, email threads, and disconnected systems. CTMS consolidates that workflow into one platform built for operational clarity.",
    "Operations teams gain real-time alerts for delays, customs holds, and port congestion. Finance and planning teams get accurate ETAs for inventory and cash-flow forecasting. Everyone works from the same source of truth.",
  ],
  highlights: [
    {
      icon: "inventory_2",
      title: "Multi-Carrier Integration",
      description:
        "Track containers from Maersk, MSC, COSCO, and other major lines in one unified dashboard.",
    },
    {
      icon: "schedule",
      title: "ETA & Milestone Alerts",
      description:
        "Automated notifications when shipments hit key milestones or deviate from planned schedules.",
    },
    {
      icon: "gavel",
      title: "Customs & Compliance",
      description:
        "Monitor customs clearance status and documentation requirements before cargo gets held.",
    },
    {
      icon: "analytics",
      title: "Performance Analytics",
      description:
        "Analyze on-time delivery rates, carrier performance, and route efficiency over time.",
    },
  ],
  demoSubject: "Book a Demo — CTMS",
  demoMessage:
    "Hi, I would like to book a demo for the Dierhaul Container Tracking Management System (CTMS).",
};

export const fleetContent: ModuleContent = {
  title: "Fleet Tracking Management System",
  subtitle:
    "Real-time GPS visibility, driver management, and cargo monitoring for your entire vehicle fleet.",
  slides: [
    {
      src: "https://images.unsplash.com/photo-1695222833131-54ee679ae8e5?q=80",
      alt: "Heavy haul truck on an open highway",
      caption: "Live GPS tracking for heavy haul and long-haul assets",
    },
    {
      src: "https://images.unsplash.com/photo-1709687854491-c6f8df59606f?q=80",
      alt: "Fleet vehicles in a logistics depot yard",
      caption: "Centralized fleet overview across depots and routes",
    },
    {
      src: "https://images.unsplash.com/photo-1579616043939-95d87a6e8512?q=80",
      alt: "Logistics control room with monitoring screens",
      caption: "Control tower view for dispatch and operations teams",
    },
  ],
  detailTitle: "Complete Fleet Visibility in Real Time",
  detailDescription:
    "Fleet Tracking Management System monitors every vehicle in your network — location, speed, fuel levels, driver assignments, and cargo loads. Dispatch teams see live positions on the map, receive alerts for route deviations or low fuel, and coordinate maintenance before breakdowns disrupt deliveries.",
  explanationTitle: "Why Fleet Tracking Transforms Logistics",
  explanationParagraphs: [
    "Without unified fleet tracking, dispatchers rely on phone calls and manual check-ins to know where assets are. That creates blind spots, delayed responses, and higher operational risk — especially for heavy haul and specialized cargo.",
    "Dierhaul Fleet Tracking connects your vehicles, drivers, and cargo into one operational layer. Reduce idle time, improve route efficiency, and give customers accurate delivery updates backed by live telemetry data.",
  ],
  highlights: [
    {
      icon: "gps_fixed",
      title: "Live GPS Tracking",
      description:
        "Pinpoint vehicle locations with continuous GPS updates and historical route playback.",
    },
    {
      icon: "local_shipping",
      title: "Asset & Driver Management",
      description:
        "Assign drivers to vehicles, track cargo loads, and manage fleet availability from one screen.",
    },
    {
      icon: "local_gas_station",
      title: "Fuel & Maintenance Alerts",
      description:
        "Get notified before fuel runs low or scheduled maintenance is due to prevent downtime.",
    },
    {
      icon: "notifications_active",
      title: "Route Deviation Alerts",
      description:
        "Instant alerts when vehicles leave planned routes or exceed speed and safety thresholds.",
    },
  ],
  demoSubject: "Book a Demo — Fleet Tracking",
  demoMessage:
    "Hi, I would like to book a demo for the Dierhaul Fleet Tracking Management System.",
};

export const DEMO_EMAIL = "abrahamsiregar99@gmail.com";
export const DEMO_WHATSAPP = "6282274583689";
