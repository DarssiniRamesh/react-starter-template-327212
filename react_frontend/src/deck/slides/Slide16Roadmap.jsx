import React from "react";
import SlideFrame from "../components/SlideFrame";
import "../deck.css";

function Phase({ title, bullets }) {
  return (
    <div className="sectionBlock">
      <p className="sectionBlockTitle" style={{ color: "var(--deck-klefki-blue)" }}>
        {title}
      </p>
      <ul className="bullets">
        {bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
    </div>
  );
}

// PUBLIC_INTERFACE
export default function Slide16Roadmap({ slideNumber, slideMeta }) {
  /** Slide 16: Implementation Roadmap for SVG. */
  return (
    <SlideFrame slideNumber={slideNumber} slideTitle={slideMeta.title} sectionLabel="Implementation">
      <div className="twoCol" style={{ textAlign: "left" }}>
        <div>
          <h2 className="slideTitle" style={{ fontSize: 34 }}>
            Implementation Roadmap for SVG
          </h2>
          <p className="slideSubTitle">Realistic timeline — 12-month deployment</p>

          <div style={{ marginTop: 14, display: "grid", gap: 10 }}>
            <Phase
              title="Months 1–3: Foundation Phase"
              bullets={[
                "Platform setup on Azure",
                "Integration with SVG MOSIP infrastructure",
                "Issuance portal configured for ministries",
                "Training for teams and staff",
                "Pilot: Digital Birth Certificate + Electronic Police Clearance"
              ]}
            />
            <Phase
              title="Months 4–6: Wallet Launch & Early Adopters"
              bullets={[
                "Wallet app launch + citizen onboarding",
                "Issuance begins: birth, police, education",
                "Early verifiers: 2–3 banks, 1–2 hospitals, key employers",
                "Measurement and iteration"
              ]}
            />
          </div>
        </div>

        <div style={{ display: "grid", gap: 10, alignContent: "start" }}>
          <Phase
            title="Months 7–9: Ecosystem Expansion"
            bullets={[
              "Additional ministries onboarded (health, education, tourism)",
              "Broader bank integration (eKYC)",
              "Tourism sector integration (hotels, cruise, yacht)",
              "Outer islands offline capability testing"
            ]}
          />
          <Phase
            title="Months 10–12: Scale & Optimization"
            bullets={[
              "Full government service digitization",
              "Private sector ecosystem growth",
              "Regional integration pilots (OECS)",
              "Advanced use cases (insurance, land registry)"
            ]}
          />

          <div className="sectionBlock solutionMode">
            <p className="sectionBlockTitle">Success Metrics</p>
            <ul className="bullets">
              <li>30% wallet adoption in 12 months</li>
              <li>10+ government services</li>
              <li>5+ private sector verifiers</li>
              <li>80%+ reduction in physical processing time</li>
              <li>50%+ cost savings in issuance & verification</li>
            </ul>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}
