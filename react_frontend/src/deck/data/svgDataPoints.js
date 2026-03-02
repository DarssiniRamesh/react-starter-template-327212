/**
 * Source of truth: attachments/svg_data_points.csv (copied into JS to avoid runtime file I/O).
 *
 * This module provides typed accessors for SVG-at-a-glance values, and helpers to extract
 * numeric values for visuals.
 */

/** Normalize values like "$1.07 billion USD" -> { numeric: 1.07, unit: "billion USD" } */
function parseFirstNumber(value) {
  const match = String(value).match(/-?\d+(\.\d+)?/);
  if (!match) return null;
  return Number(match[0]);
}

// PUBLIC_INTERFACE
export function getSvgDataPoints() {
  /** Returns all SVG data points as a {category, value} array. */
  return [
    { category: "Population", value: "~100,000 citizens" },
    { category: "GDP (2023)", value: "$1.07 billion USD" },
    { category: "GDP per Capita", value: "$9,386 USD" },
    { category: "Geographic Size", value: "390 sq km (32 islands)" },
    { category: "Economic Sectors", value: "Tourism (35%), Agriculture, Services" },
    { category: "Digital Transform Budget", value: "$81 million (going paperless)" },
    { category: "CARDTP Funding", value: "$30 million World Bank IDA" },
    { category: "Project Timeline", value: "June 2020 - June 2026" },
    { category: "Digital Projects Active", value: "49 active projects" },
    { category: "Tourism Growth", value: "83% growth (2022-2023)" },
    { category: "Mobile Penetration", value: "131.6% (Caribbean avg)" },
    { category: "Digital Payment Adoption", value: "68% made digital payment in 12 months" },
    { category: "Key Challenge", value: "Small state, limited tech resources" },
    { category: "MOSIP Status", value: "Pilot planned Q1 2024 with MOSIP + OpenCRVS" }
  ];
}

// PUBLIC_INTERFACE
export function getSvgDataPointValue(category) {
  /** Returns the string value for a category (or null if not found). */
  const found = getSvgDataPoints().find((d) => d.category === category);
  return found ? found.value : null;
}

// PUBLIC_INTERFACE
export function getInvestmentNumbers() {
  /**
   * Returns numeric investment amounts used on Slide 2/infographics.
   * Contract:
   * - Output is always numbers in millions USD.
   * - Values are sourced from CSV strings.
   */
  const digital = getSvgDataPointValue("Digital Transform Budget"); // "$81 million ..."
  const cardtp = getSvgDataPointValue("CARDTP Funding"); // "$30 million ..."
  const digitalM = parseFirstNumber(digital);
  const cardtpM = parseFirstNumber(cardtp);
  return {
    digitalTransformMillions: digitalM ?? 81,
    cardtpMillions: cardtpM ?? 30,
    totalMillions: (digitalM ?? 81) + (cardtpM ?? 30)
  };
}
