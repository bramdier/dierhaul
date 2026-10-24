export type ProjectImage = {
  src: string;
  alt: string;
  /** "wide" = 1920×1080, "square" = 1080×1080 */
  ratio: "wide" | "square";
};

export type ProjectItem = {
  id: string;
  title: string;
  context: string;
  outcome: string;
  developer: string;
  dateCreated: string;
  highlighted?: boolean;
  href?: string;
  cta?: string;
  images: ProjectImage[];
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
      developer: "Dierhaul Engineering",
      dateCreated: "January 2024",
      highlighted: true,
      href: "/track",
      cta: "Try tracking",
      images: [
        { src: "/images/project-placeholder.jpg", alt: "Container yard operations", ratio: "wide" },
        { src: "/images/project-placeholder.jpg", alt: "Cold chain mega chiller", ratio: "square" },
        { src: "/images/project-placeholder.jpg", alt: "Logistics board meeting", ratio: "square" },
        { src: "/images/project-placeholder.jpg", alt: "Reach stacker at port", ratio: "square" },
        { src: "/images/project-placeholder.jpg", alt: "About Dierhaul operations", ratio: "square" },
        { src: "/images/project-placeholder.jpg", alt: "Dierhaul platform overview", ratio: "wide" },
      ],
    },
    {
      id: "container-tracking",
      title: "Container Tracking Management System",
      context:
        "Monitor container movements, status, and ETAs across ports and inland legs.",
      outcome: "One view of container location and milestone history",
      developer: "Dierhaul Engineering",
      dateCreated: "March 2024",
      images: [
        { src: "/images/project-placeholder.jpg", alt: "Container yard operations", ratio: "wide" },
        { src: "/images/project-placeholder.jpg", alt: "Reach stacker at port", ratio: "square" },
        { src: "/images/project-placeholder.jpg", alt: "Cold chain mega chiller", ratio: "square" },
        { src: "/images/project-placeholder.jpg", alt: "Logistics board meeting", ratio: "square" },
        { src: "/images/project-placeholder.jpg", alt: "About Dierhaul operations", ratio: "square" },
        { src: "/images/project-placeholder.jpg", alt: "Dierhaul platform overview", ratio: "wide" },
      ],
    },
    {
      id: "container-load-optimization",
      title: "Container Load Optimization Plan System",
      context:
        "Plan how cargo is loaded into containers so space and weight limits are used well.",
      outcome: "Clearer load plans before a container is sealed",
      developer: "Dierhaul Engineering",
      dateCreated: "May 2024",
      images: [
        { src: "/images/project-placeholder.jpg", alt: "Reach stacker at port", ratio: "wide" },
        { src: "/images/project-placeholder.jpg", alt: "Container yard operations", ratio: "square" },
        { src: "/images/project-placeholder.jpg", alt: "Logistics board meeting", ratio: "square" },
        { src: "/images/project-placeholder.jpg", alt: "Cold chain mega chiller", ratio: "square" },
        { src: "/images/project-placeholder.jpg", alt: "Dierhaul platform overview", ratio: "square" },
        { src: "/images/project-placeholder.jpg", alt: "About Dierhaul operations", ratio: "wide" },
      ],
    },
    {
      id: "erp-logistic-platform",
      title: "ERP Logistic Platform",
      context:
        "Connect orders, inventory, and logistics workflows in one operations platform.",
      outcome: "Shared data from booking through delivery",
      developer: "Dierhaul Engineering",
      dateCreated: "July 2024",
      images: [
        { src: "/images/project-placeholder.jpg", alt: "Logistics board meeting", ratio: "wide" },
        { src: "/images/project-placeholder.jpg", alt: "Container yard operations", ratio: "square" },
        { src: "/images/project-placeholder.jpg", alt: "Reach stacker at port", ratio: "square" },
        { src: "/images/project-placeholder.jpg", alt: "Cold chain mega chiller", ratio: "square" },
        { src: "/images/project-placeholder.jpg", alt: "About Dierhaul operations", ratio: "square" },
        { src: "/images/project-placeholder.jpg", alt: "Dierhaul platform overview", ratio: "wide" },
      ],
    },
    {
      id: "contract-management",
      title: "Contract Management System",
      context:
        "Keep logistics contracts, terms, and renewals in one place for the team.",
      outcome: "Faster lookup of rates, parties, and contract status",
      developer: "Dierhaul Engineering",
      dateCreated: "September 2024",
      images: [
        { src: "/images/project-placeholder.jpg", alt: "Logistics board meeting", ratio: "wide" },
        { src: "/images/project-placeholder.jpg", alt: "Cold chain mega chiller", ratio: "square" },
        { src: "/images/project-placeholder.jpg", alt: "Container yard operations", ratio: "square" },
        { src: "/images/project-placeholder.jpg", alt: "Reach stacker at port", ratio: "square" },
        { src: "/images/project-placeholder.jpg", alt: "Dierhaul platform overview", ratio: "square" },
        { src: "/images/project-placeholder.jpg", alt: "About Dierhaul operations", ratio: "wide" },
      ],
    },
    {
      id: "fleet-management",
      title: "Fleet Management System",
      context:
        "Track vehicles, drivers, and assignments for road and yard operations.",
      outcome: "Visibility into fleet status and utilization",
      developer: "Dierhaul Engineering",
      dateCreated: "November 2024",
      images: [
        { src: "/images/project-placeholder.jpg", alt: "Reach stacker at port", ratio: "wide" },
        { src: "/images/project-placeholder.jpg", alt: "Cold chain mega chiller", ratio: "square" },
        { src: "/images/project-placeholder.jpg", alt: "Logistics board meeting", ratio: "square" },
        { src: "/images/project-placeholder.jpg", alt: "Container yard operations", ratio: "square" },
        { src: "/images/project-placeholder.jpg", alt: "About Dierhaul operations", ratio: "square" },
        { src: "/images/project-placeholder.jpg", alt: "Dierhaul platform overview", ratio: "wide" },
      ],
    },
  ] satisfies ProjectItem[],
};
