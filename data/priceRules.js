// data/priceRules.js
//
// Simple estimated ranges for self-pay pricing.
// These are *examples*, not promises. Real prices vary by clinic and city.
// Later you can replace these with live API calls or CSV imports.

export const SERVICES = [
  {
    id: "adult-physical",
    label: "Adult yearly physical",
    category: "Routine visit"
  },
  {
    id: "kids-sick",
    label: "Child sick visit (cold/flu/ear)",
    category: "Pediatrics"
  },
  {
    id: "mri-knee",
    label: "MRI knee (non-contrast)",
    category: "Imaging / scans"
  },
  {
    id: "ct-abdomen",
    label: "CT abdomen & pelvis",
    category: "Imaging / scans"
  },
  {
    id: "xray-chest",
    label: "Chest X-ray",
    category: "Imaging / scans"
  },
  {
    id: "urgent-minor",
    label: "Urgent care – minor issue",
    category: "Urgent care"
  }
];

// Very simple rule engine: given a service and ZIP (optional),
// return typical ranges for 3 settings:
// 1) FQHC / community clinic
// 2) Self-pay clinic / urgent care
// 3) Telehealth
//
// NOTE: these are rough national ranges, calibrated to feel realistic.
// You should customize ranges and provider links as you gather real data.

export function estimatePrice(serviceId, zip) {
  // You could adjust slightly by region (first digit of ZIP) later.
  const region = zip ? zip.toString()[0] : null;

  const ranges = {
    "adult-physical": {
      fqhc: [0, 75],
      clinic: [90, 180],
      tele: [0, 60]
    },
    "kids-sick": {
      fqhc: [0, 40],
      clinic: [70, 140],
      tele: [0, 50]
    },
    "mri-knee": {
      fqhc: [250, 450],
      clinic: [350, 900],
      tele: null
    },
    "ct-abdomen": {
      fqhc: [300, 550],
      clinic: [450, 1200],
      tele: null
    },
    "xray-chest": {
      fqhc: [0, 90],
      clinic: [70, 220],
      tele: null
    },
    "urgent-minor": {
      fqhc: [0, 80],
      clinic: [120, 260],
      tele: [39, 89]
    }
  };

  const base = ranges[serviceId];
  if (!base) return null;

  // Tiny regional tweak: more expensive coasts vs middle
  const multiplier =
    region === "0" || region === "9" ? 1.2 : // Northeast / West coast
    region === "7" || region === "8" ? 1.1 : // some higher-cost areas
    1.0;

  const scale = range =>
    range
      ? [
          Math.round(range[0] * multiplier),
          Math.round(range[1] * multiplier)
        ]
      : null;

  const fqhc = scale(base.fqhc);
  const clinic = scale(base.clinic);
  const tele = scale(base.tele);

  return { fqhc, clinic, tele };
}

// Simple helper to pretty-print ranges like "$90–$180"
export function formatRange(range) {
  if (!range) return "N/A";
  const [low, high] = range;
  if (low === high) return `$${low}`;
  return `$${low}–$${high}`;
}
