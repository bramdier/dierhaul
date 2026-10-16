export type ProjectItem = {
  id: string;
  title: string;
  context: string;
  outcome: string;
  highlighted?: boolean;
  href?: string;
  cta?: string;
};

export const projectContent = {
  eyebrow: "Projects",
  title: "Built for real operations",
  subtitle:
    "Logistics systems on Dierhaul, led by live DHL shipment tracking.",
  items: [
    {
      id: "dhl-shipment-tracking",
      title: "DHL Shipment Tracking",
      context:
        "Live lookup for DHL Express, Freight, and eCommerce shipment IDs in one view.",
      outcome: "Live status, milestones, and delivery estimates",
      highlighted: true,
      href: "/track",
      cta: "Try tracking",
    },
    {
      id: "container-tracking",
      title: "Container Tracking Management System",
      context:
        "Monitor container movements, status, and ETAs across ports and inland legs.",
      outcome: "One view of container location and milestone history",
    },
    {
      id: "container-load-optimization",
      title: "Container Load Optimization Plan System",
      context:
        "Plan how cargo is loaded into containers so space and weight limits are used well.",
      outcome: "Clearer load plans before a container is sealed",
    },
    {
      id: "erp-logistic-platform",
      title: "ERP Logistic Platform",
      context:
        "Connect orders, inventory, and logistics workflows in one operations platform.",
      outcome: "Shared data from booking through delivery",
    },
    {
      id: "contract-management",
      title: "Contract Management System",
      context:
        "Keep logistics contracts, terms, and renewals in one place for the team.",
      outcome: "Faster lookup of rates, parties, and contract status",
    },
    {
      id: "fleet-management",
      title: "Fleet Management System",
      context:
        "Track vehicles, drivers, and assignments for road and yard operations.",
      outcome: "Visibility into fleet status and utilization",
    },
  ] satisfies ProjectItem[],
};
