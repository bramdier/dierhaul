export const siteTitle = "Dierhaul | Cargo management for airlines";

export const siteDescription =
  "Cargo management for airlines, from booking to delivery. For cargo commercial managers, cargo operations managers, and ground handling supervisors.";

export const headline = "We build cargo software\nAirlines run on it";

export type Solution = {
  slug: string;
  title: string;
  audience: string;
  summary: string;
  body: string;
  responsibilities: string[];
  terms: string[];
};

export const solutions: Solution[] = [
  {
    slug: "booking",
    title: "Booking",
    audience: "Cargo commercial managers",
    summary:
      "Reserve flight capacity and record the shipment the airline has agreed to carry.",
    body: "Booking is where a commercial commitment becomes the file the rest of the operation will use. The module holds the flight, the pieces and weight, and the reference that becomes the air waybill.",
    responsibilities: [
      "Record the flight, allotment, and requested pieces and weight",
      "Hold the booking the acceptance desk will check the freight against",
      "Keep the commercial reference that the AWB is issued from",
    ],
    terms: ["AWB", "allotment", "pieces", "weight"],
  },
  {
    slug: "acceptance",
    title: "Acceptance",
    audience: "Ground handling supervisors and cargo operations managers",
    summary:
      "Receive the freight, check it against the booking, and accept it into the warehouse.",
    body: "Acceptance is the point the shipment enters the airline’s custody. Supervisors confirm pieces and weight, match the freight to the booking, and record what was actually received.",
    responsibilities: [
      "Match received freight to the booking",
      "Record pieces and weight at acceptance",
      "Hand an accepted shipment to dangerous-goods check, build-up, and the manifest",
    ],
    terms: ["acceptance", "pieces", "weight", "AWB"],
  },
  {
    slug: "dangerous-goods",
    title: "Dangerous Goods",
    audience: "Ground handling supervisors",
    summary:
      "Check dangerous goods against the DGR and keep that record on the shipment file.",
    body: "Dangerous goods cannot travel on a verbal clearance. The module keeps the DGR check with the shipment: what was presented, whether it was accepted, and who recorded the decision.",
    responsibilities: [
      "Check the shipment against the DGR before it is built into a ULD",
      "Keep the acceptance decision and the shipper’s declaration reference on the file",
      "Leave a record operations can audit after the flight has gone",
    ],
    terms: ["DGR", "acceptance", "AWB"],
  },
  {
    slug: "e-awb",
    title: "e-AWB",
    audience: "Cargo commercial managers and cargo operations managers",
    summary:
      "Issue the electronic air waybill that acceptance, the manifest, and tracking follow.",
    body: "The electronic air waybill is the shipment’s contract-of-carriage data. Once it is issued, acceptance, build-up, the manifest, and later status messages all refer to the same AWB.",
    responsibilities: [
      "Issue the e-AWB from the booked and accepted shipment",
      "Carry shipper and consignee details the operation is allowed to hold",
      "Give the manifest and tracking one AWB to follow",
    ],
    terms: ["AWB", "e-AWB"],
  },
  {
    slug: "manifest",
    title: "Manifest and Load Planning",
    audience: "Cargo operations managers",
    summary:
      "Build ULDs, publish the flight manifest, plan the load, and record offloads.",
    body: "This module covers the ramp side of the flight. Ground teams build the ULD, operations publish the manifest from what was accepted, and load planning records what stays on the aircraft and what is offloaded.",
    responsibilities: [
      "Build the ULD to the accepted freight and the load plan",
      "Publish the flight manifest from shipments that are actually on hand",
      "Plan the load and record any offload before departure",
    ],
    terms: ["ULD", "manifest", "offload", "AWB"],
  },
  {
    slug: "tracking",
    title: "Tracking",
    audience: "Cargo operations managers",
    summary:
      "Follow the shipment from acceptance to delivery on FSU status messages, and on ONE Record later.",
    body: "Airline tracking is not a parcel-number lookup. Status comes from FSU messages — received, departed, arrived, received from flight, ready for delivery, and delivered — including offload discrepancies. ONE Record is the later way to share that same shipment data.",
    responsibilities: [
      "Look up a shipment by air waybill",
      "Read FSU status from acceptance through delivery",
      "Prepare the same shipment record for ONE Record",
    ],
    terms: ["AWB", "FSU", "ONE Record", "offload"],
  },
];

export const workflow = [
  {
    step: "01",
    title: "Booking",
    href: "/solutions/booking",
    description:
      "Reserve capacity and record the shipment the flight is expected to carry.",
  },
  {
    step: "02",
    title: "Acceptance",
    href: "/solutions/acceptance",
    description:
      "Receive the freight, confirm pieces and weight, and accept it onto the floor.",
  },
  {
    step: "03",
    title: "DGR",
    href: "/solutions/dangerous-goods",
    description:
      "Check dangerous goods against the DGR and keep the record with the shipment.",
  },
  {
    step: "04",
    title: "e-AWB",
    href: "/solutions/e-awb",
    description:
      "Issue the electronic air waybill the rest of the operation will follow.",
  },
  {
    step: "05",
    title: "ULD build-up",
    href: "/solutions/manifest",
    description: "Build the unit load device to the booking and the load plan.",
  },
  {
    step: "06",
    title: "Manifest",
    href: "/solutions/manifest",
    description: "Publish the flight manifest from what was actually accepted.",
  },
  {
    step: "07",
    title: "Load planning and offload",
    href: "/solutions/manifest",
    description:
      "Plan the load and record anything taken off before departure.",
  },
  {
    step: "08",
    title: "Tracking to delivery",
    href: "/solutions/tracking",
    description:
      "Follow the shipment on FSU status messages through delivery.",
  },
] as const;

export const buyers = [
  {
    title: "Cargo commercial managers",
    description:
      "Hold allotment and booking, then issue the AWB from the same commercial file.",
  },
  {
    title: "Cargo operations managers",
    description:
      "Run acceptance, the manifest, and load planning, including what is offloaded.",
  },
  {
    title: "Ground handling supervisors",
    description:
      "Accept freight, check DGR, and build ULDs to the plan the flight will carry.",
  },
] as const;

export const primaryNav = [
  { href: "/track", label: "Track" },
  { href: "/integrations", label: "Integrations" },
  { href: "/security", label: "Security" },
  { href: "/about", label: "About" },
] as const;

export function getSolution(slug: string) {
  return solutions.find((solution) => solution.slug === slug);
}

export const integrationStandards = [
  {
    title: "Cargo-XML",
    description:
      "The XML edition of IATA cargo messages, for airline and handler systems that have moved off plain-text Cargo-IMP.",
  },
  {
    title: "Cargo-IMP",
    description:
      "The legacy IATA cargo message format still used for bookings, waybills, and status between airlines, handlers, and partners.",
  },
  {
    title: "e-AWB",
    description:
      "The electronic air waybill, so the contract of carriage is data the operation can pass on instead of a paper pouch.",
  },
  {
    title: "ONE Record",
    description:
      "IATA’s data-sharing model for one shipment record. It is the later source for tracking, after FSU status messages.",
  },
] as const;
