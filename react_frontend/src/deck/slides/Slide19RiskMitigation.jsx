import React from "react";
import SlideFrame from "../components/SlideFrame";
import "../deck.css";

const risks = [
  { risk: "Low citizen adoption", mitigation: "Start with high-value use cases; carrier partnerships; community engagement" },
  { risk: "Technical integration challenges", mitigation: "Proven MOSIP compatibility; phased rollout; expert support" },
  { risk: "Private sector resistance", mitigation: "Early verifier partnerships; demonstrate savings; API ease-of-use; workshops" },
  { risk: "Connectivity issues (outer islands)", mitigation: "Offline QR verification; periodic sync model" },
  { risk: "Cybersecurity threats", mitigation: "Azure-hosted security; audits; W3C standards; cryptographic protection" },
  { risk: "Budget overruns", mitigation: "Fixed-scope initial phase; open-source foundation; cloud cost management" },
  { risk: "Vendor lock-in concerns", mitigation: "Open standards; interoperable with Inji; blockchain-agnostic; API-first" },
  { risk: "Regulatory gaps", mitigation: "Policy support from day 1; legal assessment; regional harmonization" }
];

// PUBLIC_INTERFACE
export default function Slide19RiskMitigation({ slideNumber, slideMeta }) {
  /** Slide 19: Risk mitigation. */
  return (
    <SlideFrame slideNumber={slideNumber} slideTitle={slideMeta.title} sectionLabel="Risk Management">
      <div style={{ height: "100%", textAlign: "left" }}>
        <h2 className="slideTitle" style={{ fontSize: 34 }}>
          Risk Mitigation & Success Factors
        </h2>
        <p className="slideSubTitle">How we ensure this works</p>

        <div style={{ marginTop: 14 }} className="sectionBlock">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, fontWeight: 900, color: "var(--deck-navy)" }}>
            <div>Risk</div>
            <div>Mitigation Strategy</div>
          </div>
          <div style={{ marginTop: 10, display: "grid", gap: 8 }}>
            {risks.map((r) => (
              <div key={r.risk} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div style={{ background: "rgba(239,68,68,0.08)", borderRadius: 12, padding: 10, border: "1px solid rgba(239,68,68,0.14)" }}>
                  {r.risk}
                </div>
                <div style={{ background: "rgba(16,185,129,0.10)", borderRadius: 12, padding: 10, border: "1px solid rgba(16,185,129,0.14)" }}>
                  {r.mitigation}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 14 }} className="sectionBlock solutionMode">
          <p className="sectionBlockTitle">Critical Success Factors</p>
          <ul className="bullets">
            <li>Strong government champion</li>
            <li>Citizen-centric design and quick wins in first 90 days</li>
            <li>Private sector buy-in to create network effects</li>
            <li>Regional collaboration (OECS/CARICOM alignment)</li>
            <li>Transparent progress reporting and iterative scaling</li>
          </ul>
        </div>
      </div>
    </SlideFrame>
  );
}
