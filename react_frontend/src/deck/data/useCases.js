/**
 * Source of truth: attachments/svg_use_cases_prioritized.csv and Slide 10 ordering in
 * attachments/Klefki-SVG-Deck.pdf.
 *
 * The PDF defines the narrative phase ordering; this module preserves that ordering
 * (even if priority could suggest another ordering).
 */

// PUBLIC_INTERFACE
export function getUseCases() {
  /** Returns the list of SVG use cases with priority and narrative phase. */
  return [
    {
      useCase: "Digital Birth Certificate → Auto UID",
      priority: "CRITICAL",
      rationale: "Foundational - links CRVS to UID from birth",
      klefkiFit: "MOSIP + OpenCRVS + Klefki Issuer",
      phase: "Phase 1 (Months 1–4)"
    },
    {
      useCase: "Electronic Police Clearance",
      priority: "HIGH",
      rationale: "Proven in Vanuatu; seasonal worker demand",
      klefkiFit: "Klefki Issuer + Wallet (Vanuatu template)",
      phase: "Phase 1 (Months 1–4)"
    },
    {
      useCase: "Tourism & Travel Credentials",
      priority: "HIGH",
      rationale: "Tourism = 35% of economy; yachting leader",
      klefkiFit: "Klefki Wallet + ZKP selective disclosure",
      phase: "Phase 2 (Months 5–9)"
    },
    {
      useCase: "Education Certificates (Digital Diplomas)",
      priority: "HIGH",
      rationale: "Youth mobility; verified credentials reduce fraud",
      klefkiFit: "Klefki Issuer + blockchain verification",
      phase: "Phase 2 (Months 5–9)"
    },
    {
      useCase: "eKYC for Financial Services",
      priority: "MEDIUM",
      rationale: "Financial inclusion; 40% unbanked in Caribbean",
      klefkiFit: "Klefki Wallet + instant verification",
      phase: "Phase 2 (Months 5–9)"
    },
    {
      useCase: "Healthcare ID & Medical Records",
      priority: "MEDIUM",
      rationale: "Universal healthcare; reduce physical card burden",
      klefkiFit: "Klefki Wallet + privacy-preserving sharing",
      phase: "Phase 3 (Months 10–15)"
    },
    {
      useCase: "Work Permits (CSME Integration)",
      priority: "MEDIUM",
      rationale: "Regional mobility (OECS/CARICOM)",
      klefkiFit: "Klefki integration with CSME systems",
      phase: "Phase 3 (Months 10–15)"
    },
    {
      useCase: "Business Licenses & Permits",
      priority: "MEDIUM",
      rationale: "SME digitalization; reduce red tape",
      klefkiFit: "Klefki Issuer + streamlined approval",
      phase: "Phase 3 (Months 10–15)"
    },
    {
      useCase: "Land Registry & Property",
      priority: "LOW",
      rationale: "Property verification; fraud prevention",
      klefkiFit: "Blockchain anchoring + document registry",
      phase: "Appendix / Later"
    },
    {
      useCase: "Parametric Insurance (Disaster)",
      priority: "STRATEGIC",
      rationale: "Hurricane vulnerability; fast claims payout",
      klefkiFit: "Smart contracts + instant claim verification",
      phase: "Strategic"
    }
  ];
}

// PUBLIC_INTERFACE
export function getPriorityCounts() {
  /** Returns counts per priority for small distribution visuals. */
  const counts = { CRITICAL: 0, HIGH: 0, MEDIUM: 0, LOW: 0, STRATEGIC: 0 };
  for (const uc of getUseCases()) {
    if (counts[uc.priority] !== undefined) counts[uc.priority] += 1;
  }
  return counts;
}
